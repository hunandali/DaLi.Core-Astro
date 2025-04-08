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

import { cleanDuplicate, isArray } from '@da.li/core-libs';

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
