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

import { cleanDuplicate, hasArray, hasObject, isArray, type Dict } from '@da.li/core-libs';
import type { IPropsBase } from '../types';

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
 * @param prefix 同时处理的前缀，默认为 ['data-', 'x-']
 * @param ignoreCase 前缀是否忽略大小写，默认为 true
 * @returns 更新后的属性，与被移除的属性
 */
export const PropsUpdate = (props: IPropsBase, prefix = ['data-', 'x-'], ignoreCase = true) => {
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
