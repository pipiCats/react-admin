import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './sider.less';
import { List, Set, is } from 'immutable';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
//antd Header Component
const { Sider } = Layout;

const { SubMenu } = Menu;

class CustomSlider extends Component {

    constructor(props) {
        super(props);
        this.subMenuPath = Set();//存储SubMenu的url
    }
    static PropTypes = {
        collapsed: PropTypes.bool.isRequired,
        toggle: PropTypes.func.isRequired,
        menuList: PropTypes.instanceOf(List).isRequired,
    }
    state = {
        selectedKeys: List(),
        openKeys: Set(),
        menuElement: null,
    }
    onCollapse =  (collapsed, type) => {
        this.props.toggle();
    }
    componentWillReceiveProps(nextProps) {
        let {menuElement, selectedKeys } = this.state;
        let {location, menuList, match, } = nextProps;
        let openRoute = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
        if (menuElement === null) {
            this.setState({
                menuElement: this.mapMenuList(menuList.map(menu => menu.set('level', 1)), match.url),
            });
        }
        this.setState({
            selectedKeys: selectedKeys.update(0, val => location.pathname),
            openKeys: this.subMenuPath.filter(sub => openRoute.includes(sub)),
        });
    }
    onOpenChange = (menu) => {
        this.setState({
            openKeys: Set(menu)
        });
    }
    mapMenuList = (menuList, parentPath) => {
        let {match} = this.props;
        return menuList.map((menu) => {
            if (menu.get('level') === 1) {
                parentPath = match.url;
            }
            let to = parentPath + menu.get('url');
            if (!menu.get('children') || 
                    List.isList(menu.get('children')) && menu.get('children').size === 0) {
                return (
                    <Menu.Item className="menu-item" key={to}>
          				 <NavLink to={to}>
          				 	{menu.get('level') === 1 && <Icon type={menu.get('icon')} /> }
          				 	<span className="nav-text">{menu.get('title')}</span>
          				 </NavLink>
          			</Menu.Item>
                )
            } else {
                parentPath += menu.get('url');
                this.subMenuPath = this.subMenuPath.add(parentPath);
                return (
                    <SubMenu key={parentPath} title={ SubMenuTitle(menu)}>
      					{this.mapMenuList(menu.get('children'), parentPath)}
      				</SubMenu>
                );
            }
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        let thisProps = this.props;
        return thisProps.location.pathname !== nextProps.location.pathname ||
            thisProps.collapsed !== nextProps.collapsed ||
            !is(thisProps.menuList, nextProps.menuList) ||
            !shallowEqualImmutable(this.state, nextState);
    }
    render() {
        return (
            <Sider
	            className="custom-sider"
	            trigger={null}
	            breakpoint="lg"
	            collapsed={!this.props.collapsed}
	            onCollapse= {this.onCollapse}
            >
            	<div className="logo">
            		<h2 className="system-name">React Admin</h2>
          		</div>
		        <Menu
		            className="menu"
		            mode="inline"
		            selectedKeys={this.state.selectedKeys.toArray()}
		            openKeys={this.state.openKeys.toArray()}
		            onOpenChange={this.onOpenChange}
            	>
		          { this.state.menuElement }
		        </Menu>
            </Sider>
        );
    }
}
CustomSlider.__ANT_LAYOUT_SIDER = true;

const SubMenuTitle = (menu) => {
    return (
        <span>
			{menu.get('level') === 1 ?
            (
            <span><Icon type={menu.get('icon')} /><span>{menu.get('title')}</span></span>
            ) : (
            <span>{menu.get('title')}</span>
            )
        }
		</span>
    );
}

export default withRouter(CustomSlider);