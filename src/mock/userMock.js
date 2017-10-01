import Mock from 'mockjs';

Mock.setup({
    timeout: '300'
});

Mock.mock('/queryUserList', {
	'result|10': [{
		key: '@increment(1)',
		id: '@increment(1)',
		username: '@cname',
		state: '@string("01", 1)',
		address: '@county(true)',
		email: '@email',
		note: '@csentence(50, 100)'
	}]
});

Mock.mock('/menuList', {
	data: [
		{
			url: '/base',
			icon: 'desktop',
			title: '基本页面',
			children: [],
		},
		{
			url: '/icon',
			icon: 'smile-o',
			title: '自定义图标',
			children: [],
		},
		{
			url: '/chart',
			icon: 'area-chart',
			title: '统计图表',
			children: [
				{
					url: '/rechart',
					icon: '',
					title: 'ReChart'
				},
				{
					url: '/echart',
					icon: '',
					title: 'Echart'
				}
			],
		},
	]
});