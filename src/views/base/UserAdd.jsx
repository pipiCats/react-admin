import React, { Component } from 'react';
import { FormItem, CustomizedForm } from 'widget';

const selectData = [{"id":"1","name":"有效"},{"id":"0","name":"无效"}];

export default class UserAdd extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	render() {
		return (
			<CustomizedForm
				span={2}
				colseModalId={'add'}
				hideRequiredMark={false}
			>	
				<FormItem name={'username'} label={'用户名'} rules={[{required: true}]}/>
				<FormItem name={'state'} label={'状态'} formType={'select'} data={selectData} rules={[{required: true}]}/>
				<FormItem name={'email'} label={'邮箱'} rules={[{required: true, type: 'email'}]}/>
				<FormItem name={'address'} label={'地址'} rules={[{required: true}]}/>
				<FormItem name={'note'} span={2} formType={'textarea'} label={'备注'}/>
			</CustomizedForm>
		)
	}
}
	
