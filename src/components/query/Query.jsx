import React, { PureComponent } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { CardTitle } from 'widget';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';
import warning from 'fbjs/lib/warning';
import './query.less';

const LG_WIDGET_NUM = 4;
const XL_WIDGET_NUM = 6;

let queryCardIds = {};

export default class Query extends PureComponent {

	constructor(props) {
		super(props);
		this.event =  new  EventEmitter();
		this.event.setMaxListeners(0);
		this.propsName = {};
	}
	static defaultProps = {
		onChange: null,
	}
	static propTypes = {
		id: PropTypes.string.isRequired,//组件唯一标识
		queryMethod: PropTypes.func,//点击查询按钮调用方法
		resetMethod: PropTypes.func,//点击重置按钮调用方法
		onChange: PropTypes.func,//输入框值变化时调用方法
	}
	state = {
		queryValue: {},
	}
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	componentWillUnmount() {
		let { id } = this.props;
		this.event.removeAllListeners();
		this.event = null;
		queryCardIds[id] = null;
	}
	componentWillMount() {
		let { id } = this.props;
		if(queryCardIds[id]){
			warning(!queryCardIds[id], `id='${id}' QueryCard component already exist`);
		}
		queryCardIds[id] = `__${id}`;
	}
	render() {
		const len = React.Children.count(this.props.children);
		const classname = len + 1 > LG_WIDGET_NUM ? "querycard-child-marg" : "querycard-child";
		const isWarp = 24 % (len + 1) === 0;
		let { id, queryMethod, resetMethod } = this.props;
		return (
			<Card key={id} title={<CardTitle type="search" title="查询条件"/>}>
				<Row gutter={24}>
				    { 
				    	React.Children.map(this.props.children, (child) => {
				    		const Child = React.cloneElement(child, {event: this.event});
				    		if(this.propsName[child.props.name] === null){
				    			console.error("child component's name is repeat");
				    		}
				    		this.propsName[child.props.name] = null;
				    		this.event.on(child.props.name, (value) => {
				    			let changeValue = null;
			    				if(value) {
			    					changeValue = {
									    ...this.state.queryValue,
									    [child.props.name]: value,
									};
			    				}else{
			    					delete this.state.queryValue[child.props.name];
			    					changeValue = this.state.queryValue;
			    				}
			    				this.setState({ queryValue: changeValue }, () => {
			    					this.props.onChange && this.props.onChange(this.state.queryValue);
			    				});
						    });
					    	return (
					    		<Col 
					    			key={child.props.name}
					    			className={classname} 
					    			xs={24} 
					    			sm={12} 
					    			lg={24 / LG_WIDGET_NUM}
					    			xl={24 / XL_WIDGET_NUM}
					    		>
					    		   {Child}
					    		</Col>
					    	)
					    })
					}
					<Col className={classname} 
						 style={{marginBottom: 0}}
						 xs={24} 
						 sm={(len+1) % 2 === 0 ? 12 : 24} 
						 lg={isWarp ? 24 / LG_WIDGET_NUM : 24}
						 xl={isWarp ? 24 / XL_WIDGET_NUM: 24}
					>
      			<Button 
      				icon="sync" 
      				type="primary" 
      				style={{marginRight: '20px'}}
      				onClick={()=>{ queryMethod && queryMethod(this.state.queryValue)}}
      			>
      			查询
      			</Button>
      			<Button 
      				icon="export"
      				onClick={
      					() => {
      						Object.keys(this.propsName).forEach((key) => {
      							this.event.emit(`${key}_reset`);
      						});
      						this.setState({
      							queryValue: {}
      						}, () => {
      							resetMethod && resetMethod(this.state.queryValue);
      						});
      				 	}}
      			>
      			重置
      			</Button>
	        </Col>
        </Row>
			</Card>
		);
	}
}
