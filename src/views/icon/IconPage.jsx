import React, { PureComponent } from 'react';
import { FontIcon } from 'widget';
import { Icon, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './icon.less';

const IconItem = (props) => {
	const { type } = props;
	return (
		<li key={type} className="icon-list-item">
			<FontIcon type={type}/>
			<p className="icon-type">{type}</p>
			<div className="hover-mask">
				<CopyToClipboard 
					text={`<FontIcon type="${type}"/>`}
					onCopy={()=>message.success('Copied!')}
				>
					<i className="copy-ctrl">
						<Icon type="copy" style={{color: '#ffffff', fontSize: '22px'}}/>
						<p className="copy">复制代码</p>
					</i>
				</CopyToClipboard>
			</div>
		</li>
	)
}
const EmojiIcons = () => {
	let icons = [];
	for(let i = 1; i < 30; i++){
		icons.push(<IconItem key={`icon-emoji-${i}`} type={`emoji-${i}`}/>);
	}
	return icons;
}
const ChartIcons = () => {
	let type = ['Kxiantu', 'bingtuhuanzhuang', 'bingzhuangtu', 'ditu',
	'duijitu', 'guanxitu', 'leidatu', 'loudoutu', 'rediantu', 'sandiantu',
	'shaloutu', 'shijieditu', 'shuzhuangtu', 'tiaozhuangtu', 'xiangxiantu',
	'yibiaopan', 'zhexiantu', 'zhongguoditu', 'zhutiheliutu', 'zhuzhuangtu',
	'zhexiantu1'
	];
	return type.map(item => <IconItem key={`icon-${item}`} type={item}/>);
}
export default class IconPage extends PureComponent {
	render() {
		return (
			<div className="markdown">
				<div className="icon-h2-header">
					<h2>如何使用</h2>
				</div>
				<p className="mark">使用<code>{`<FontIcon />`}</code>标签声明组件，指定图标对应的 type 属性，示例代码如下:</p>
				<pre className="mark jsx-code">
					<code>
						<span style={{marginLeft: '10px'}}>{`<FontIcon type="emoji-1"/>`}</span>
					</code>
				</pre>
				<div className="icon-h2-header">
					<h2>表情图标</h2>
				</div>
				<ul>
					{ EmojiIcons() }
				</ul>
				<div className="icon-h2-header">
					<h2>统计图标</h2>
				</div>
				<ul>
					{ ChartIcons() }
				</ul>
			</div>
		);
	}
}