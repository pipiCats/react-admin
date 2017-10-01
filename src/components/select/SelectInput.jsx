import React, { PureComponent } from 'react';
import { Row, Select } from 'antd';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';
import './select.less';
const Option = Select.Option;

export default class SelectInput extends PureComponent {

	static defaultProps= {
		label: '',
		data: [],
		transform: { key: "id", value: "name"},
		labelWidth: 70,
		left: 7,
	}
	static propTypes= {
	    label: PropTypes.string,
	    data: PropTypes.array,
	    transform: PropTypes.object,
	    name: PropTypes.string.isRequired,
	    labelWidth: PropTypes.number,
	    value: PropTypes.oneOfType([
	    	PropTypes.number,
	    	PropTypes.string,
	    ]),
	}
	state = {
		value: this.props.value !== undefined ?  String(this.props.value) : void 0,
	}
	componentDidMount() {
		let { name, event } = this.props;
		if(event && event instanceof EventEmitter) {
			event.on(`${name}_reset`,()=>{
				this.setState({value: void 0}, () => {
					event.emit(name, this.state.value);
				});
			});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.value !== nextState.value;
	}
	onChange = (value) => {
		let { name, event } = this.props;
		this.setState({value});
		if(event && event instanceof EventEmitter){
			//触发监听
			event.emit(name, value);
		}
	}
	render() {
		let { label, data, transform, event, onChange, labelWidth, left, value, ...restProps } = this.props;
		labelWidth = label ? labelWidth : 0;
		left = label ? left : 0;
		return (
			<Row gutter={12}>
				<div className="admin-input-container clearfix">
					<label 
						className="admin-input-label" 
						style={{width: labelWidth+'px'}}
					>
						{ label }
					</label>
					<div 
						className="admin-input-warpper"
						style={{marginLeft: labelWidth+'px', left: left+'px'}}
					>
						<Select 
							style={{width: '100%'}} 
							onChange={(value)=>{
								onChange && onChange(value);
								this.onChange(value);
							}}
							value={this.state.value}
							{...restProps}
						>
						 {
						 	data.length === 0 ? null : 
							data.map(item => {
						 		return (
						 			<Option 
						 				key={item[transform['key']]}
						 				value={item[transform['key']]}
						 				disabled={item['item']|| false}
						 			>
						 			{item[transform['value']]}
						 			</Option>
						 		);
						 	})
						 } 
						</Select>
					</div>
				</div>
			</Row>
		);
	}
}