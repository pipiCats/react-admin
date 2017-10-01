import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*
@description{Table列}
@props {
	title: 列头显示文字(string|ReactNode),
	dataIndex: 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法,
	render: 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，
		@return里面可以设置表格行/列合并(Function(text, record, index) {})
}
*/
export default class TableColumn extends Component {

	static propTypes = {
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		id: PropTypes.string.isRequired,
		render: PropTypes.func,
		filterDropdown: PropTypes.bool,
		filterIcon: PropTypes.string,
		sorter: PropTypes.func,
	}
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	render() {
		return null;
	}
}
