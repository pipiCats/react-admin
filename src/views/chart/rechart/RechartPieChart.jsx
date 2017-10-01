import React, { PureComponent } from 'react';
import {
	PieChart, 
	Pie,
	Tooltip, 
	Legend,
	ResponsiveContainer
} from 'recharts';

const data = [{"name":"Category A", "value":20, 'fill': "#8884d8"}, 
		         {"name":"Category B", "value":50, 'fill':"#f03"}, 
		          {"name":"Category C", "value":30, 'fill':"#82ca9d"}];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  	const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  	const y = cy  + radius * Math.sin(-midAngle * RADIAN);
	return (
	    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'middle'} dominantBaseline="central">
	    	{`${(percent * 100).toFixed(0)}%`}
	    </text>
	);
};
export default class RechartPieChart extends PureComponent {
	state = {
		countHide: false,
		moneyHide : false,
	}
	render() {
		return (
			<ResponsiveContainer width="100%" height={200}>
		        <PieChart
		         
		        >
		            <Legend />
		            <Tooltip />
		            <Pie  labelLine={false} label={renderCustomizedLabel}   data={data} hide={this.state.countHide} dataKey="value"  />
		        </PieChart>
    		</ResponsiveContainer>
		);
	}
}