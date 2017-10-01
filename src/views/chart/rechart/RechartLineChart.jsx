import React, { PureComponent } from 'react';
import {
	LineChart, 
	Line, 
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend,
	ResponsiveContainer
} from 'recharts';

const data = [
    {name: '一月', count: 400, money: 2410},
    {name: '二月', count: 300, money: 2398},
    {name: '三月', count: 450, money: 6810},
    {name: '四月', count: 278, money: 3108},
    {name: '五月', count: 289, money: 4200},
    {name: '六月', count: 249, money: 1300},
    {name: '七月', count: 456, money: 3300},
    {name: '八月', count: 456, money: 3300},
    {name: '九月', count: 456, money: 3300},
    {name: '十月', count: 456, money: 3300},
    {name: '十一月', count: 456, money: 3300},
    {name: '十二月', count: 456, money: 3300},
];

const CustomizedLabel = (props) => {
	const {x, y, stroke, value} = props;
	return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
}

export default class RechartLineChart extends PureComponent {
	state = {
		countHide: false,
		moneyHide : false,
	}
	render() {
		return (
			<ResponsiveContainer width="100%" height={200}>
		        <LineChart
		            data={data}
		            margin={{top: 5, right: 30, left: 20, bottom: 5}}
		        >
		            <Legend onClick={(data, index)=>{
		            	if(index === 0){
		            		this.setState({
		            			countHide: false,
		            			moneyHide: !this.state.moneyHide,
		            		});
		            	}else{
		            		this.setState({
		            			countHide: !this.state.countHide,
		            			moneyHide: false,
		            		});
		            	}
		            }}/>
		            <Tooltip />
		            <XAxis dataKey="name" />
		            <YAxis tickSize={5}/>
		            <CartesianGrid strokeDasharray="3 3" />
		            <Line hide={this.state.countHide} name={'交易笔数'} unit={'笔'} type="linear" dataKey="count" stroke="#8884d8" activeDot={{r: 5}} />
		            <Line label={<CustomizedLabel stroke="#82ca9d"/>} hide={this.state.moneyHide} name={'交易金额'} unit={'元'} type="linear" dataKey="money" stroke="#82ca9d" activeDot={{r: 5}}/>
		        </LineChart>
    		</ResponsiveContainer>
		);
	}
}