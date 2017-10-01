import React, { PureComponent } from 'react';
import { Icon, Layout } from 'antd';
import screenfull from 'screenfull';
import PropTypes from 'prop-types';
import './header.less';
//antd Header Component
const { Header } = Layout;
export default class CustomHeader extends PureComponent {
	
	static PropTypes = {
		toggle: PropTypes.func.isRequired,
		collapsed: PropTypes.bool.isRequired,
	}

	fullScreen = () => {
		screenfull.enabled ? screenfull.request(): null;
	}

	render() {
		return (
			<Header className="custom-header">
				<Icon
                	className="trigger"
              		type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              		onClick={this.props.toggle}
            	/>
            	{this.props.children}
			</Header>
		);
	}
}