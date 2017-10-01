import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './card.less';

export default class CardTitle extends PureComponent{
	
	static propTypes = {
		type: PropTypes.string.isRequired,
		title: PropTypes.string, 
	} 
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	render() {
		return (
			<label>
				<Icon 
					className="card-title"
					type={this.props.type}
				/>
				<span>{this.props.title || ''}</span>
			</label>
		);
	}
}