import type { NavbarItem } from '../components/Navbar/menus.astro';

/** 导航栏菜单 */
export default [
	{
		text: '首页',
		href: '/',
		icon: 'home'
	},
	{
		text: '基础组件',
		href: '#',
		icon: 'setting',
		children: [
			{
				text: '计数器',
				href: 'countup'
			},
			{
				text: '空状态',
				href: 'empty'
			},
			{
				text: '错误',
				href: 'error'
			},
			{ text: '进度条', href: 'progress' },
			{
				text: '徽标',
				href: 'ribbon'
			},
			{
				text: '滚动条',
				href: 'spinner'
			},
			{
				text: '切换按钮',
				href: 'switch-icon'
			},
			{
				text: '时间线',
				href: 'timeline'
			}
		]
	},

	{
		text: '消息组件',
		href: '#',
		icon: 'sms',
		children: [
			{
				text: '加载',
				href: 'loading'
			},
			{
				text: '警告',
				href: 'alert'
			},
			{
				text: '通知',
				href: 'toast'
			},
			{
				text: '弹窗',
				href: 'modal'
			}
		]
	},

	{ text: '自定义组件', href: '#', icon: 'id' },
	{
		text: '其他',
		href: '#',
		icon: 'book',
		children: [
			{
				text: '表格',
				href: 'table'
			},
			{
				text: '表单',
				href: 'form'
			},
			{
				text: '图标',
				href: 'icon'
			}
		]
	},
	{
		text: '其他',
		href: '#',
		icon: 'book',
		children: [
			{
				text: '表格',
				href: 'table'
			},
			{
				text: '表单',
				href: 'form'
			},
			{
				text: '图标',
				href: 'icon'
			},

			{
				text: '计数器',
				href: 'countup'
			},
			{
				text: '空状态',
				href: 'empty'
			},
			{
				text: '错误',
				href: 'error'
			},
			{ text: '进度条', href: 'progress' },
			{
				text: '徽标',
				href: 'ribbon'
			},
			{
				text: '滚动条',
				href: 'spinner'
			},
			{
				text: '切换按钮',
				href: 'switch-icon'
			},
			{
				text: '时间线',
				href: 'timeline'
			}
		]
	}
] as NavbarItem[];
