import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import { queryUserList } from '@action/UserAction';
import { 
	Query, 
	TextInput, 
	SelectInput, 
	CardTitle,
	TableColumn,
	CustomizedTable,
	ButtonGroup,
	Dialog,
	modal,
	AsyncComponent,
} from 'widget';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const selectData = [{"id":"1","name":"有效"},{"id":"0","name":"无效"}];

class BasePage extends Component {

	state = {
		queryValue: {}
	}

	setValue = (key, value) => {
		this.setState({
			[key]: value
		});
	}
	handleComponent = (text, record, index) => {
	    return (
	      <span>
	        <a href="javascript:;">详情</a>
	        <span className="ant-divider" />
	        <a href="javascript:;" onClick={() => modal.open('edit', '用户编辑', <UserEdit {...record}/>)} >编辑</a>
	      </span>
	    );
  	}
  	componentDidMount() {
  		let { queryUserList, dispatch } = this.props;
  		dispatch(queryUserList());
  	}
	render() {
		return (
			<div className="page-container">
				<Query
			        id={'query'}  
			        queryMethod={(data)=>{message.info(JSON.stringify(data))}}
			        resetMethod={(data)=>{message.info(JSON.stringify(data))}}
			        onChange={value => this.setValue('queryValue', value)}
			    >
			        <TextInput 
			           name={'username'} 
			           label={'用户名'}
			           placeholder={'请输入用户名'}
			        />
			        <TextInput 
			           name={'rolename'} 
			           label={'角色名称'}
			           placeholder={'请输入角色名称'}
			        />
			        <SelectInput 
			            name={'islock'}
			            label={'是否锁定'}
			            data={selectData}
			            placeholder={'请选择账户状态'}
			            allowClear={true}
          			/>
			    </Query>
			    <Card 
			    	title={<CardTitle type="bars" title="用户列表"/>}
			    	style={{ marginTop: '20px'}}
			    >
			    	<Dialog id="add"  width={650}></Dialog>
			    	<Dialog id="edit" width={650}></Dialog>
			    	<ButtonGroup>
			    		<Button icon="user-add" onClick={() => {
			    			modal.open('add', '用户新增', <UserAdd/>);
			    		}}>新增</Button>
			    		<Button>批量删除</Button>
			    	</ButtonGroup>
			    	<CustomizedTable
			    		loading={this.props.loading}
              			bordered={true} 
              			dataSource={this.props.userList}
              			checkbox={true}
              			expandedRowRender={record => <ExpandedRow {...record}/>}
			    	>
						<TableColumn id={'username'} title={'用户名'}/>
			            <TableColumn id={'state'} title={'状态'}/>
			            <TableColumn id={'address'} title={'地址'}/>
			            <TableColumn id={'email'} title={'邮箱'} />
			            <TableColumn id={'ctrl'} title={'操作'} render={this.handleComponent}/>
			    	</CustomizedTable>
			    </Card>
			</div>
		);
	}
}
//展开行
const ExpandedRow = (record) => {
	return (
		<p style={{textAlign: 'left'}}>
			<span style={{marginRight: '8px', fontWeight: 700}}>备注:</span>
			{record.note}
		</p>
	);
}
//异步组件，延迟加载
const UserAdd = (props) => (
    <AsyncComponent load={() => import('./UserAdd')}>
        {(UserAdd) => <UserAdd {...props}/>}
    </AsyncComponent>
);
const UserEdit = (props) => (
    <AsyncComponent load={() => import('./UserEdit')}>
        {(UserEdit) => <UserEdit {...props}/>}
    </AsyncComponent>
);
const mapStateToProps = (state, ownProps) => {
  let { user } = state.toObject();
  return {
    userList: user.get('userList'),
    loading: user.get('loading'),
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    queryUserList,
    dispatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BasePage);