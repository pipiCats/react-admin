import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';
import './dialog.less';
import warning from 'fbjs/lib/warning';

let event = new EventEmitter();
event.setMaxListeners(0);

class Dialog extends PureComponent {
	
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		width: 520,
	}
	static propsTypes = {
		id: PropTypes.string.isRequired,
	}
	static modals = {}
	state = {
		visible: false,
		title: '',
		component: null,
	}
	onCancel = () => {
		this.setState({ visible: false });
	}
	componentWillUnmount() {
		let { id } = this.props;
		event.removeAllListeners(`${id}_openModal`);
		event.removeAllListeners(`${id}_closeModal`);
		delete Dialog.modals[id];
	}
	componentDidMount() {
		let { id } = this.props;
		warning(Dialog.modals[id] !== null, `Dialog Component id=${id} already exist`);
		Dialog.modals[id] = null;
		event.on(`${id}_openModal`,(title, component) => {
			this.setState({
				title: title,
				visible: true,
				component: component,
			});
		});
		event.on(`${id}_closeModal`,(onClose) => {
			this.setState({
				visible: false,
			}, () => {
				onClose && onClose();
			});
		});
	}

	render() {
		return (
			<Modal
				key={this.props.id}
				title={this.state.title}
				width={this.props.width}
          		wrapClassName="vertical-center-modal"
          		visible={this.state.visible}
          		onCancel={this.onCancel}
          		footer={null}
          		maskClosable={true}
          	>
          	{ this.state.component }
			</Modal>
		);
	}	
}
const modal = {
	open: (id, title, component) => {
		event.emit(`${id}_openModal`, title, component);
	},
	close: (id, onClose) => {
		event.emit(`${id}_closeModal`, onClose || null);
	}
}
export {
	Dialog,
	modal,
};