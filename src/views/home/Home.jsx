import { Layout, Avatar, Dropdown, Menu, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryMenuList } from '@action/HomeAction';
import { 
  CustomizedSider, 
  CustomizedHeader,
} from 'widget';
import { Switch, Route } from 'react-router-dom';
import BasePage from '../base/BasePage';
import ReCharts  from '../chart/ReCharts';
import Echarts  from '../chart/Echarts';
import IconPage from '../icon/IconPage';
import { FontIcon } from 'widget';
import './home.less';

const { Content } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);
class Home extends Component {
  
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentDidMount() {
    this.props.queryMenuList();
  }
  render() {
    let {match, menuList} = this.props;
    return (
      <Layout className="home-container">
        <CustomizedSider menuList={menuList} collapsed={this.state.collapsed} toggle={this.toggle}/>
        <Layout>
          <CustomizedHeader collapsed={this.state.collapsed} toggle={this.toggle}>
            <div className="header-content">
              <Avatar style={{ backgroundColor: '#87d068', marginRight: '6px' }} size="large" src={require('../../res/header.jpeg')} />
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#" style={{color: '#000'}}>
                 admin<Icon type="down" style={{marginLeft: '3px'}}/>
                </a>
              </Dropdown>
            </div>
          </CustomizedHeader>
          <Content className="content">
            <div style={{ padding: 24, background: '#fff', flex: 1 }}>
              <Switch>
                <Route exact path={`${match.url}/base`} component={ BasePage } />
                <Route exact path={`${match.url}/icon`} component={ IconPage } />
                <Route exact path={`${match.url}/chart/rechart`} component={ ReCharts } />
                <Route exact path={`${match.url}/chart/echart`} component={ Echarts } />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let { home } = state.toObject();
  return {
    menuList: home.get('menuList')
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    queryMenuList: () => { dispatch(queryMenuList())},
    dispatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
