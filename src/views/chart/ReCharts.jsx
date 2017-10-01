
import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { CardTitle } from 'widget';
import RechartLineChart from './rechart/RechartLineChart';
import RechartBarChart from './rechart/RechartBarChart';
import RechartPieChart from './rechart/RechartPieChart';
import RechartAreaChart  from './rechart/RechartAreaChart';
import './chart.less';

export default class ReCharts extends Component {
  render() {
    return (
      <Row gutter={12}>
        <Col span={12}>
          <Card title={<CardTitle type={'line-chart'} title={'折线图'}/>}>
            <RechartLineChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<CardTitle type={'bar-chart'} title={'柱状图'}/>}>
            <RechartBarChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<CardTitle type={'pie-chart'} title={'饼状图'}/>}>
            <RechartPieChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<CardTitle type={'area-chart'} title={'面积图'}/>}>
            <RechartAreaChart />
          </Card>
        </Col>
      </Row>
    );
  }
}