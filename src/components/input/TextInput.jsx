import React, { Component } from 'react';
import { Row, Input } from 'antd';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';
import './input.less';

export default class TextInput extends Component {

	static defaultProps= {
		label: '',
		labelWidth: 70,
	}
	static propTypes= {
	    label: PropTypes.string,
	    name: PropTypes.string.isRequired,
	    labelWidth: PropTypes.number,
	}
	state = {
		value: '',
	}
	onChange = (e) => {
		let { name, event } = this.props;
		let value = e.target.value;
		this.setState({value});
		if(event && event instanceof EventEmitter){
			//触发监听
			event.emit(name, value);
		}
	}
	componentDidMount() {
		let { name, event } = this.props;
		event && event.on(`${name}_reset`,()=>{
			if(event instanceof EventEmitter){
				this.setState({value: ''}, () => {
					event.emit(name, this.state.value);
				});
				
			}
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.value !== nextState.value;
	}
	render() {
		let { label, value, event, onChange, labelWidth, ...restProps } = this.props;
		return (
			<Row gutter={12}>
				<div className="admin-input-container clearfix">
					<label 
						className="admin-input-label" 
						style={{width: labelWidth+'px'}}>{ label }
					</label>
					<div 
						className="admin-input-warpper"
						style={{marginLeft: labelWidth+'px'}}
					>
						<Input 
							{ ...restProps } 
							value={this.state.value}
							onChange={(e)=>{
								onChange && onChange(e);
								this.onChange(e);
						}}/>
					</div>
				</div>
			</Row>
		);
	}
}