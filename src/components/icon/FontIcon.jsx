import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './fontsjs/iconfont';
import './icon.less';
export default class FontIcon extends PureComponent {

	static propTypes = {
		type: PropTypes.string.isRequired,
		style: PropTypes.object,
	}
	render() {
		return (
			<i className="font-icon">
				<svg 
					className="icon" 
					aria-hidden="true"
					style={this.props.style}
					dangerouslySetInnerHTML={{__html: `<use xlink:href=${'#icon-' + this.props.type} />` }} 
				/>
				
			</i>
		);
	}
}