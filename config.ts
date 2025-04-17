/**
 * 	config 全局配置文件
 *
 * ------------------------------------------------------------
 *
 * 	Copyright © 2024 湖南大沥网络科技有限公司.
 *
 * 	  author:	木炭(WOODCOAL)
 * 	   email:	i@woodcoal.cn
 * 	homepage:	http://www.hunandali.com/
 *
 * ------------------------------------------------------------
 */

import { cleanDuplicate, hasArray, isNil, isObject } from '@da.li/core-libs';
import type { ConfigOptions, IExternalLinkAction, IMessage } from './types';

/** 全局事件名称前缀 */
export const EVENT_PREFIX = 'dali:event:';

/** 全局事件名称生成器 */
const event = (name: string) => `${EVENT_PREFIX}${name}`;

/** 全局应用信息 */
export const APP = {
	/** 应用名称 */
	NAME: '大沥网络组件库',

	/** 应用版本 */
	VERSION: '49.10.1',

	/** 应用描述 */
	DESCRIPTION: '一个基于 Tabler 样式的 Astro 组件库',

	/** 企业 */
	COMPANY: '湖南大沥网络科技有限公司',

	/** 应用网址 */
	URL: 'https://www.hunandali.com',

	/** 应用关键词 */
	KEYWORDS: '大沥网络,组件库,astro,tabler',

	/** 应用白名单域名 */
	WHITELIST_DOMAINS: ['localhost', '127.0.0.1'],

	/**
	 * 默认外部链接处理方式（Link.astro 组件默认外部链接处理方式）
	 * 1. false: 不允许，发现外部链接禁用
	 * 2. true: 允许，发现外部直接使用，不做任何限制
	 * 3. string: 允许，发现外部使用模板地址跳转，模板地址中使用 {url} 占位符，原始网址使用 base64 编码。未使用 {url} 则会直接跳到模板地址。
	 * 4. alert: 允许，但是会弹窗提示手动点击打开。
	 * @default 'alert'
	 */
	EXTERNAL_LINK: 'alert' as IExternalLinkAction,

	/** 如果使用弹窗模式打开外部链接，则使用此警告消息，原网址使用 {url} 占位符 */
	EXTERNAL_LINK_MESSAGE:
		'<div class="text-start text-wrap text-break" style="text-indent:2rem"><div>您需要访问的链接 ”<b class="text-primary">{url}</b>” 为外部链接，打开后将跳转到第三方页面，我们无法保证其页面的安全与合法性，打开后访问的所有信息与操作都与本站无关，请自行甄别并再次确认是否需要打开。</div></div>',

	/** Prism 代码高亮语言默认路径，错误将无法高亮非常用语言 */
	CODE_LANGUAGES_PATH: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/',

	/** 自定义指令前缀，例如 '@' 或 'v-'，空值则为默认(v-)；不设置将关闭自定义指令 */
	DIRECTIVE_PREFIX: 'v-'
};

/** 全局事件变量 */
export const EVENTS = {
	COUNTUP: {
		START: event('countup-start'),
		COMPLETE: event('countup-complete')
	}
};

/** 全局错误状态码 */
export const ERROR_CODES: Record<string, string | IMessage> = {
	// 404: {
	// 	icon: 'address-disabled',
	// 	title: '页面不存在',
	// 	message: '访问的页面不存在',
	// 	theme: 'warning'
	// },
	// 500: {
	// 	icon: 'fail',
	// 	title: '服务异常',
	// 	message: '系统服务发生异常，麻烦联系系统服务人员处理',
	// 	theme: 'danger'
	// },
	// params: {
	// 	icon: 'i-icon-tip',
	// 	title: '参数异常',
	// 	message: '无效参数或者参数不匹配',
	// 	theme: 'warning'
	// },
	client: {
		icon: 'display-disabled',
		title: '客户端无效',
		message: '当前客户端参数错误或者已经被禁止使用',
		theme: 'danger'
	},
	// sign: {
	// 	icon: 'signet-disabled',
	// 	title: '数据异常',
	// 	message: '与服务器通讯时检测到数据签名错误。',
	// 	theme: 'danger'
	// },
	// network: {
	// 	icon: 'parameter-disabled',
	// 	title: '网络异常',
	// 	message: '无法与服务器建立连接，请检查网络连接是否正常',
	// 	theme: 'danger'
	// },
	// news: '无新闻列表',
	// favor: '暂无收藏',
	// order: '订单为空',
	// request: '无效请求', // gameover
	// address: '没有收货地址',
	// shopping: '购物车为空', // shopping-cart
	// permission: '无此操作权限',
	// page: '页面不存在',
	// result: '没有搜索结果', // list-search
	// comment: '暂无评论',
	// message: '消息列表为空',
	// coupon: '没有优惠券',
	datas: '暂无更多数据',
	// history: '无历史记录',
	load: '数据加载中'
};

/** 初始化常量 */
export const init = (options: ConfigOptions) => {
	!isObject(options) && (options = {});

	// @ts-ignore
	APP.NAME = options.name || import.meta.env.PUBLIC_APP_NAME;
	// @ts-ignore
	APP.VERSION = options.version || import.meta.env.PUBLIC_APP_VERSION;
	// @ts-ignore
	APP.DESCRIPTION = options.description || import.meta.env.PUBLIC_APP_DESCRIPTION;
	// @ts-ignore
	APP.COMPANY = options.company || import.meta.env.PUBLIC_APP_COMPANY;

	// 网址
	// @ts-ignore
	const url = options.url || import.meta.env.PUBLIC_APP_URL || import.meta.env.SITE;
	APP.URL = url ? new URL(url).origin : '';

	// 关键词
	// @ts-ignore
	const keywords = options.keywords || import.meta.env.PUBLIC_APP_KEYWORDS;
	APP.KEYWORDS = keywords ? cleanDuplicate(keywords.split(',')).join(',') : '';

	// 外部链接处理方式，未设置则默认开启
	APP.EXTERNAL_LINK = isNil(options.external_link_action) ? true : options.external_link_action;

	// 白名单网址，所有地址合并
	// 1. 来自环境变量
	// @ts-ignore
	const domains = (import.meta.env.PUBLIC_APP_WHITELIST_DOMAINS || '').split(',');

	// 2. 来自配置文件
	hasArray(options.whitelistDomains) && domains.push(...options.whitelistDomains!);

	// 3. 来自网址
	APP.URL && domains.push(APP.URL, 'localhost', '127.0.0.1');

	// 组后结果 仅保留域名，转换小写并去重
	APP.WHITELIST_DOMAINS = cleanDuplicate(
		domains
			.map((item: string) => {
				let host = '';

				try {
					host = new URL(item).host;
				} catch {
					host = item?.trim();
				}

				return host ? host.toLowerCase() : '';
			})
			.filter((item: string) => item !== '')
	);

	// 外部链接警告消息
	!isNil(options.external_link_message) &&
		(APP.EXTERNAL_LINK_MESSAGE = options.external_link_message);

	// 代码高亮语言默认路径
	!isNil(options.code_languages_path) && (APP.CODE_LANGUAGES_PATH = options.code_languages_path);

	// 指令(未设置参数，默认开启)
	APP.DIRECTIVE_PREFIX = isNil(options.directives)
		? 'v-'
		: !options.directives
		? ''
		: options.directives === true
		? 'v-'
		: options.directives;
};
