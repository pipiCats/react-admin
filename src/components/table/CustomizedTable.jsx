import React, { Component } from 'react';
import { Table, Input, Button, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import warning from 'fbjs/lib/warning';
import { EventEmitter } from 'events';
import { List } from 'immutable';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
/*
@description{简单表格}
@props {
	size: 正常或迷你类型，default or small,
	dataSource: 表格数据源,
	checkbox:是否显示checkbox,
}
*/
export default class CustomizedTable extends Component {
	constructor(props) {
		super(props);
		this.event =  new  EventEmitter();
	}
	static defaultProps = {
		size: 'middle',
		dataSource: List(),
		checkbox: false,
		textAlign: 'center',
		loading: false,
		pageSize: 5,
		total: 0,
		getSelectRows: null,
		expandedRowRender: null,
	}
	static propTypes = {
		size: PropTypes.string,
		loading: PropTypes.bool,
		dataSource: PropTypes.instanceOf(List),
		checkbox: PropTypes.bool,
		pageSize: PropTypes.number,
		getSelectRows: PropTypes.func,
		textAlign: PropTypes.oneOf(['left', 'center', 'right']),
		onChange: PropTypes.func,
		total: PropTypes.number,
		expandedRowRender: PropTypes.func,
	}
	state = {
		rowSelection: null,
		columns: List(),
		filterDropdownVisible: {},
    	data: this.props.dataSource,
    	searchText: {},
    	filtered: {},
    	filterIcon: {},
    	showSearchInput: '',
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.dataSource,
		});
	}
	setFilterDropdownVisible = (dataIndex, visible) => {
		return {...this.state.filterDropdownVisible, [dataIndex]: visible};
	}
	//设置自定义筛选图标
	setFilterIcon = (dataIndex, icon, filtered) => {
		return (
			<Icon type={typeof icon === 'undefined' ? 'filter' : icon} style={{ color: filtered ? '#fd5e51' : '#aaa' }} />
		)
	}
	onInputChange = (e) => {
    	this.setState({ 
    		searchText: {...this.state.searchText, [this.state.showSearchInput]: e.target.value }
    	},() => {
    		let { showSearchInput, searchText } = this.state;
    		this[`${showSearchInput}SearchInput`].refs.input.value = searchText[showSearchInput];  		
    	});
  	}
  	shouldComponentUpdate(nextProps, nextState) {
  		let { showSearchInput, filterDropdownVisible, filtered } = nextState;
  		const visible = filterDropdownVisible[showSearchInput];
  		const filter  = filtered[showSearchInput];
  		const isFilterEqual  = this.state.filtered[showSearchInput] === filter;
  		const isVisibleEqual = this.state.filterDropdownVisible[showSearchInput] === visible;
  		if(showSearchInput && !isVisibleEqual || !isFilterEqual){
  			nextState.columns = this.mergeColumns(showSearchInput, visible, filter, nextState.columns);
  			return true;
  		}else{
  			return this.props.loading !== nextProps.loading || !shallowEqualImmutable(this.state, nextState);  
  		}
  	}
  	mergeColumns = (columnName, visible, filter, columns) => {
  		let filterIcon = this.state.filterIcon[columnName];
		return columns.map(column => {
			return column.key === columnName ? {
		            ...column,
		            filterDropdownVisible: visible,
		            filterIcon: this.setFilterIcon(columnName, filterIcon, filter),
		        } : column;
		});
  	}
  	componentWillMount() {
  		this.renderChildrenList();
  	}
  	componentWillUpdate(nextProps, nextState) {
  		console.log("table update")
  	}
  	renderChildrenList = () => {
  		let {children, checkbox  } = this.props;
		let len = React.Children.count(children);
		if(len === 0){
			warning(false,`Subcomponents must be needed`);
		}
		React.Children.forEach(children,(child) => {
			let props = child.props;
			let { filterDropdown, id, filterIcon, ...restProps } = props;
			let column = {
				...restProps,
				dataIndex: id,
				key: id,
			};
			if(!!filterDropdown){
				column['filterDropdown'] = DropDown(this, props);
				column['filterDropdownVisible'] = this.state.filterDropdownVisible[id];
				this.state.filterIcon[id] = filterIcon;
				column['filterIcon'] = this.setFilterIcon(id, filterIcon, false); 
				column['onFilterDropdownVisibleChange'] = (visible) => {
			        this.setState({
			          showSearchInput: id,
			          filterDropdownVisible: this.setFilterDropdownVisible(id, visible),
			        }, () => this[`${id}SearchInput`].focus());
			      };
			}
			this.state.columns = this.state.columns.push(column);
		});
		if(typeof checkbox !== 'undefined' && checkbox){
			this.event.on('selectRows', (value) => {
				this.props.getSelectRows && this.props.getSelectRows(value);
			});
			this.state.rowSelection = {
				onChange: (selectedRowKeys, selectedRows) => this.event.emit('selectRows', selectedRows),
			}
		}
  	}
	onSearch = (dataIndex) => {
		const { searchText } = this.state;
	    const reg = new RegExp(searchText[dataIndex], 'gi');
	    this.setState({
	      filterDropdownVisible: this.setFilterDropdownVisible(dataIndex, false),
	      filtered: {[dataIndex]: !!searchText[dataIndex] },
	      data: this.props.dataSource.map((record) => {
	        const match = record[dataIndex].match(reg);
	        if (!match) {
	          return null;
	        }
	        return {
	          ...record,
	          [dataIndex]: (
	            <span>
	              {record[dataIndex].split(reg).map((text, i) => (
	                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
	              ))}
	            </span>
	          ),
	        };
	      }).filter(record => !!record),
	    });
	}
	render() {
		return (
			<Row>
				<Table 
					rowSelection={this.state.rowSelection}
					dataSource = {this.state.data.toArray()}
					columns={this.state.columns.toArray()} 
					bordered={this.props.bordered}
					loading={this.props.loading}
					expandedRowRender={this.props.expandedRowRender}
					pagination={{
						pageSize: this.props.pageSize,
						total: this.props.total,
						onChange: (page, pageSize) => {
							if(page * pageSize > this.state.data.size){
								this.props.onChange && this.props.onChange(page, pageSize);
							}
						},
					}}
				>
				</Table>
				{ this.props.textAlign !== 'left' && (
					<style type="text/css">
						{`
							.ant-table .ant-table-thead th { text-align: ${this.props.textAlign}; }
							.ant-table .ant-table-tbody td { text-align: ${this.props.textAlign}; }
						`}
					</style>
				)}
			</Row>
		);
	}
}
const DropDown = (ctx, ownProps) => {
	return (
		<div className="custom-filter-dropdown">
	          <Input
	            ref={ele => ctx[`${ownProps.id}SearchInput`] = ele}
	            placeholder={`请输入${ownProps.title}`}
	            value={ctx.state.searchText[`${ownProps.id}`]}
	            onChange={ctx.onInputChange}
	            onPressEnter={ctx.onSearch}
	          />
	          <Button type="primary" onClick={()=>ctx.onSearch(ownProps.id)}>搜索</Button>
	    </div>
	);
}
