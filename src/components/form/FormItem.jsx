import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class FormItem extends Component {

	static defaultProps = {
		formType: 'input',
		hidden: false,
		span: 1,
		label: '',
		disabled: false,
	}
	static propsTypes = {
		name: PropTypes.string.isRequired,
		formType: PropTypes.oneOf(['input', 'select', 'number','textarea']),
		span: PropTypes.number,
		rules: PropTypes.object,
		label: PropTypes.string.isRequired,
		hidden: PropTypes.bool,
		disabled: PropTypes.bool,
	}
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	render() {
		return null;
	}
}