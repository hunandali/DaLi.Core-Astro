/**
 *  utils 工具函数
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

import {
	base64Encode,
	cleanDuplicate,
	hasArray,
	hasObject,
	htmlSafe,
	isArray,
	isBoolean,
	stringIncludes,
	type Dict
} from '@da.li/core-libs';
import type { IExternalLinkAction, IPropsBase } from '../types';
import { APP } from '../config';

/** 样式类型 */
type ClassItem = string | boolean | number | undefined;
type ClassData = ClassItem | ClassItem[];

/** 样式清理并返回类型列表 */
export const ClassUpdate = (classData: ClassData) => {
	if (!classData) return [];

	const str2Arr = (str: any): string[] => str.toString().replace(/\s+/g, '|').trim().split('|');

	let list = isArray(classData) ? classData : str2Arr(classData);
	if (list.length === 0) return [];

	var ret: string[] = [];

	list.filter((x) => !!x).forEach((item) => {
		const arr = str2Arr(item);
		if (arr.length > 0) ret.push(...arr);
	});

	return cleanDuplicate(ret);
};

/** 样式清理并返回类型文本 */
export const ClassClear = (classData: ClassData) => {
	return ClassUpdate(classData).join(' ');
};

/**
 * 基础属性更新
 * @param props 属性
 * @param prefix 同时处理的前缀，默认为 ['data-', 'x-', 'v-']
 * @param ignoreCase 前缀是否忽略大小写，默认为 true
 * @returns 更新后的属性，与被移除的属性
 */
export const PropsUpdate = (
	props: IPropsBase,
	prefix = ['data-', 'x-', 'v-'],
	ignoreCase = true
) => {
	const ret: Dict = {};
	if (!hasObject(props)) {
		return [ret, props];
	}

	props.class && (ret.class = ClassClear(props.class));
	props.style && (ret.style = props.style);
	props.id && (ret.id = props.id);

	// 获取所有扩展属性 data-* 以及 x-*
	if (hasArray(prefix)) {
		// 不区分大小写则先将 prefix 转换为小写
		!ignoreCase && (prefix = prefix.map((p) => p.toLowerCase()));

		Object.keys(props).forEach((key) => {
			// 不区分大小写则先将 key 转换为小写
			!ignoreCase && (key = key.toLowerCase());

			// 匹配前缀
			prefix.some((p) => key.startsWith(p)) && (ret[key] = props[key]);
		});
	}

	// 移除扩展属性
	props = { ...props };
	Object.keys(ret).forEach((key) => delete props[key]);

	return [ret, props];
};

/**
 * 判断是否是外部链接，且非白名单网址或者域名
 * @param url 需要判断的URL
 * @param whiteList 白名单域名列表，为空则使用全局白名单：APP.WHITELIST_DOMAINS；空内容则不检查域名
 * @param ignoreCase 是否忽略大小写，默认为 true
 * @returns 是否为外部链接
 */
export const isExternalDomain = (url: string, whiteList?: string[], ignoreCase = true): boolean => {
	if (!url) return false;

	// 检查是否为外部链接格式
	const isExternalProtocol = /^(https?:|mailto:|tel:)/.test(url);
	if (!isExternalProtocol) return false;

	// 未设置（非空）白名单，则使用全局白名单
	// const isEmptyWhiteList = !whiteList;
	// isEmptyWhiteList && (whiteList = APP.WHITELIST_DOMAINS);

	// 如果没有白名单，则直接返回 true
	if (!whiteList || whiteList.length < 1) return true;

	// 处理 URL，提取域名部分，如果 URL 解析失败，使用原始 URL
	let hostname = url;
	try {
		hostname = new URL(url).hostname;
	} catch (e) {}

	// 忽略大小写处理
	if (ignoreCase) {
		hostname = hostname.toLowerCase();

		// 对于非默认白名单的域名需要进行小写处理，默认的在配置时已经处理
		whiteList = whiteList.map((x) => x.toLowerCase());
	}

	// 检查是否在白名单中
	return !whiteList.some((domain) => stringIncludes(hostname, domain));
};

/**
 * 对于链接地址的二次处理，对于外部地址是否需要进行二次处理
 * @param url 需要判断的URL
 * @param whiteList 白名单域名列表，为空则使用全局白名单：APP.WHITELIST_DOMAINS；空内容则不检查域名
 * @param ignoreCase 是否忽略大小写，默认为 true
 * @returns - enabled: 	是否允许直接打开链接
 * 			- url:		实际链接地址
 * 			注意：如果 `enabled = false`，`url` 不为空则将使用弹窗提示手动打开网址
 */
export const updateLink = (
	url: string,
	action: IExternalLinkAction,
	whiteList?: string[],
	ignoreCase = true
) => {
	// 是否外部链接
	if (isBoolean(action) || !action) return { enabled: action, url: '' };

	// 检查是否为外部链接
	const isExternal = isExternalDomain(url, whiteList, ignoreCase);
	if (!isExternal) return { enabled: true, url: url };

	// 是否提示
	if (action === 'alert') return { enabled: false, url: url };

	// 进行二次处理
	url = action.replace('{url}', base64Encode(url));
	return { enabled: true, url: url };
};

/** Html 代码 xss 过滤，返回安全 HTML 代码，针对当前项目保留了 x- v- 指令属性 */
export const updateHTML = (html: string) =>
	!html
		? ''
		: APP.DIRECTIVE_PREFIX
		? htmlSafe(html.replace(APP.DIRECTIVE_PREFIX, 'data-directive-prefix-name-')).replace(
				'data-directive-prefix-name-',
				APP.DIRECTIVE_PREFIX
		  )
		: htmlSafe(html);
