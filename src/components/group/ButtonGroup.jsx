import React, { Component } from 'react';
import {Row, Col} from 'antd';

export default class ButtonGroup extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	
	render() {
		let {children} = this.props;
		return (
			<Row style={{marginBottom: '20px'}}>
				{
					React.Children.map(children, (child) => {
						return (
							<Col 
								key={`col_${child.props.id}`}
								className="tool-button-group"
								xs={{span:11, offset: 1}} 
					    		sm={{span:3, offset: 0}} 
								lg={{span:2, offset: 0}}
								xl={{span:2, offset: 0}}	
							>
								{child}
							</Col>
						);
					} )
				}
			</Row>
		);
	}
}