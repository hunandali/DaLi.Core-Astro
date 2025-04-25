/**
 * 	mask 字符掩码
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

// https://imask.js.org/guide.html
import IMask, { InputMask } from 'imask';

/**
 * 	创建掩码
 * @param element 元素
 * @param mask 掩码格式
 * @returns 掩码对象
 */
export const createMask = (
	element: HTMLInputElement | null | undefined,
	mask: string | undefined
) => {
	if (!element || !mask) return;

	// 记录掩码值，因为使用掩码后，如果开启了 lazy 模式，则无法通过 element.value 获取到原始值
	element.setAttribute('data-value', element.value);

	/**
	 * 字符覆盖模式，默认值为 true
	 *  - true：输入新字符的时候，旧字符将被新字符覆盖
	 *  - false：输入新字符的时候，如果存在空位，则将插入新字符，否则将替换就字符
	 */
	const overwrite = element.dataset['maskOverwrite'] !== 'false' ? true : 'shift';

	/** 是否自动填充占位符 */
	const lazy = element.dataset['maskLazy'] === 'true';

	/** 占位符 */
	const placeholderChar = element.dataset['maskPlaceholder'] || '_';

	/** 安全输入符，类似密码框的掩码符 */
	const displayChar = element.dataset['maskDisplay'];

	/**
	 *  mask 格式：
	 *  - 斜线开始结束：正则表达式。如：/^\d{3}-\d{3}-\d{4}$/
	 *  - 方括号包含：数值模式。逗号间隔，分别最小值与最大值。
	 *    - 格式：[min, max, scale]
	 *    - min：最小值，不设置则从字段 min 中获取，获取不到则为负无穷大
	 *    - max：最大值，不设置则从字段 max 中获取，获取不到则为负无穷大
	 *    - scale：小数位数，不设置则为 0
	 *  - 其他：字符串模式。
	 */
	let ret: InputMask<any>;

	// 正则表达式
	if (mask.startsWith('/') && mask.endsWith('/') && mask.length > 2) {
		ret = IMask(element, {
			mask: RegExp(mask.slice(1, -1)),
			overwrite,
			lazy,
			placeholderChar,
			displayChar
		});
	}

	// 数值模式
	else if (mask.startsWith('[') && mask.endsWith(']') && mask.length > 2) {
		const [min, max, scale] = `${mask.slice(1, -1)},,,`.split(',');

		ret = IMask(element, {
			mask: Number,
			min: min ? parseFloat(min) : element.min ? parseFloat(element.min) : undefined,
			max: max ? parseFloat(max) : element.max ? parseFloat(element.max) : undefined,
			scale: scale ? parseInt(scale) : undefined,
			overwrite,
			lazy,
			placeholderChar,
			displayChar
		});
	}

	// 字符串模式
	else {
		ret = IMask(element, {
			mask: mask,
			overwrite,
			lazy,
			placeholderChar,
			displayChar
		});
	}

	// 记录掩码值，因为使用掩码后，如果开启了 lazy 模式，则无法通过 element.value 获取到原始值
	ret.on('accept', () => {
		element.dataset['value'] = ret.unmaskedValue;
	});

	return ret;
};
