import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import { CardTitle } from 'widget';
import EchartLineChart from './echart/EchartLineChart';
import EchartBarChart from './echart/EchartBarChart';
import EchartPieChart from './echart/EchartPieChart';
import EchartMapChart from './echart/EchartMapChart';
import './chart.less';

export default class ECharts extends PureComponent {
	render() {
		return (
			<Row gutter={12}>
		        <Col span={12}>
		          <Card title={<CardTitle type={'line-chart'} title={'折线图'}/>}>
		            <EchartLineChart />
		          </Card>
		        </Col>
		        <Col span={12}>
		          <Card title={<CardTitle type={'bar-chart'} title={'柱状图'}/>}>
		            <EchartBarChart />
		          </Card>
		        </Col>
		        <Col span={12}>
		          <Card title={<CardTitle type={'pie-chart'} title={'饼状图'}/>}>
		            <EchartPieChart />
		          </Card>
		        </Col>
		        <Col span={12}>
		          <Card title={<CardTitle type={'area-chart'} title={'地图'}/>}>
		            <EchartMapChart />
		          </Card>
		        </Col>
     		</Row>
		);
	}
}