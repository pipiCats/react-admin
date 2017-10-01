
import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, message, InputNumber } from 'antd';
import { SelectInput, modal } from 'widget';
import PropTypes from 'prop-types';
import warning from 'fbjs/lib/warning';
import shallowEqual from 'fbjs/lib/shallowEqual';
import './form.less';

export default Form.create()(class CustomizedForm extends Component {

	static defaultProps = {
		hideRequiredMark: true,
		data: null,
		span: 3,
	}
	static propsTypes = { 
		data: PropTypes.object,
		onSubmit: PropTypes.func,
		span: PropTypes.oneOf([1, 2, 3, 4]),
		hideRequiredMark: PropTypes.bool,
		colseModalId: PropTypes.string,
	}
	checkChildSpan = (span) => {
		return 0 < span && this.props.span >= span;
	}
	getFormInput = (props) => {
		switch(props.formType) {
			case 'input':
				return <Input 
							disabled={props.disabled}
							readOnly={props.readOnly}
						/>;
			case 'select':
				return <SelectInput 
							disabled={props.disabled}
							readOnly={props.readOnly} 
							name={props.name} 
							data={props.data}
						/>;
			case 'textarea':
				return <Input.TextArea 
							disabled={props.disabled}
							readOnly={props.readOnly} 
							autosize={{minRows: 3}}
						/>
			case 'number':
				return <InputNumber
							readOnly={props.readOnly} 
							disabled={props.disabled}
						/>
		}
	}
	hasError = (field) => {
		const { getFieldError, isFieldTouched } = this.props.form;
		return !!isFieldTouched(field) && !!getFieldError(field);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { colseModalId, form } = this.props;
		form.validateFields({force: true}, (errors) => {
			if (Object.keys(errors ? errors : {}).length === 0) {
			    const after = this.props.form.getFieldsValue();
			    const before = this.props.data ? Object.keys(after).reduce((prev, next) => {
			        prev[next] = this.props.data[next]
			        return prev;
			    }, {}) : null;
			    if (shallowEqual(before, after)) {

			        message.warning('您未做任何修改');
			    } else {
			        message.info(JSON.stringify(after));
			    }
			}else{
				message.warning('表单验证未通过');
			}
		});
		
	}
	shouldComponentUpdate(nextProps, nextState) {
		return !shallowEqual(this.props.wrappedComponentRef, nextProps.wrappedComponentRef);
	}
	render() {
		const { children, span, data, hideRequiredMark, colseModalId } = this.props;
		const { getFieldDecorator } = this.props.form;
		let hasError  = false;
		let Component = React.Children.map(children, (child) => {
			let name  = child.props.name;
			let cSpan = child.props.span;
			let validOpts = child.props.rules ? {rules: child.props.rules } : {};
			if(data && data[name] !== undefined) {
				validOpts['initialValue'] = data[name];
			}
			const error = this.hasError(name);
			hasError = error ? error : hasError;
			warning(this.checkChildSpan(cSpan),`FormItem name=${name}'s span has error`);
			return (
				<Col 
					xs={{ span: 24 }}
					sm={ 24 / span * cSpan}
					style={{display: child.props.hidden ? 'none' : 'block'}}
				>
					<Form.Item
						labelCol={{
							xs: { span: 24},
						}}
						wrapperCol={{
							xs: { span: 24 },
						}}
						label={child.props.label}
						help={null}
						hasFeedback={error}
						validateStatus={error ? 'error' : 'success'}
					>
					{getFieldDecorator(name, validOpts)(
          	  			this.getFormInput(child.props)
          			)} 
					</Form.Item>
				</Col>
			);
		});
		return (
			<Form 
				hideRequiredMark={hideRequiredMark}
				onSubmit={this.handleSubmit}
			>
				<Row>
					{Component}
				</Row>
				<Row style={{marginTop: '10px'}}>
					<div className="ant-modal-footer">
						<Button disabled={hasError} type={'primary'} htmlType="submit">确定</Button>
						<Button onClick={() =>{ colseModalId && modal.close(colseModalId)}}>取消</Button>
					</div>
				</Row>
			</Form>
		);
	}
})
