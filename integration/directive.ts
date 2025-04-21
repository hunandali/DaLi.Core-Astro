/**
 * directive 指令注册
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

import { dateFormat, htmlEncode, QRCreate, string2Value, type IQR } from '@da.li/core-libs';
import { registerAction } from './_directive';
import { copy } from '../libs/_message';
import { Tooltip } from 'bootstrap';
import './_prism';

/** 复制指令 */
registerAction('copy', (el, value) => {
	el.style.cursor = 'pointer';
	el.title = '点击复制';

	// 添加 Tooltip 效果
	if (!el.hasAttribute('data-bs-toggle')) {
		new Tooltip(el, {
			delay: { show: 50, hide: 50 },
			html: false,
			placement: 'auto'
		});
	}

	el.addEventListener('click', () => {
		value = value || el.innerText;
		copy(value);
	});
});

/** 二维码指令 */
registerAction('qr', async (el, value) => {
	if (!value) return;

	const logo = string2Value(el.dataset.logo || '');

	const params: IQR = {
		code: value,
		size: parseInt(el.dataset.size || '200'),
		color: el.dataset.color || '#000',
		backColor: el.dataset.backcolor || '#fff',
		logo: logo || false
	};

	const svg = await QRCreate(params);

	el.innerHTML = svg;
	el.style.backgroundColor = 'transparent';
});

/** 提示指令 */
registerAction('tooltip', (el, value) => {
	value = value || el.title || el.textContent || '';
	value = value.trim();
	if (!value) return;

	// 添加 Tooltip 效果
	el.title = value;
	if (!el.hasAttribute('data-bs-toggle')) {
		new Tooltip(el, {
			delay: { show: 50, hide: 50 },
			html: false,
			placement: (el.dataset.placement || 'top') as any
		});
	}
});

/** 日期指令 */
registerAction('date', (el, value) => {
	const data = string2Value(value);
	const format = data === false ? 'desc' : data === true ? 'YYYY-MM-DD' : value || 'YYYY-MM-DD';
	value = (el.textContent || '').trim();
	el.textContent = dateFormat(value, format);
});

/** 日期时间指令 */
registerAction('datetime', (el, value) => {
	const data = string2Value(value);
	const format =
		data === false
			? 'desc'
			: data === true
			? 'YYYY-MM-DD HH:mm:ss'
			: value || 'YYYY-MM-DD HH:mm:ss';
	value = (el.textContent || '').trim();
	el.textContent = dateFormat(value, format);
});

/** 代码输出指令 */
registerAction('code', (el, value) => {
	// value 表示语言类型，默认 html
	const lang = value || '';
	let code = '';

	// input 标签包裹，value 内容为代码，需要 HTML 编码
	if (el.tagName === 'INPUT') {
		code = (el as HTMLInputElement).value;
		code = htmlEncode(code);
	}

	// textarea 标签包裹，直接输出
	else if (el.tagName === 'TEXTAREA') {
		code = el.innerHTML;
	} else {
		code = el.innerHTML;
		if (!code) return;

		// 去除首尾空格
		el.innerHTML = code.trim();

		// 检查 el 下如果仅存在一个子元素，且该子元素为注释节点，则获取注释内容
		if (el.childNodes.length === 1 && el.firstChild?.nodeType === Node.COMMENT_NODE) {
			const commentContent = el.firstChild.textContent || '';
			code = htmlEncode(commentContent);
		}

		// 如果当前节点为 pre 标签或 lang 为 html，则获取 el 节点的 HTML 内容
		else if (el.tagName === 'PRE' || lang === 'html') {
			code = htmlEncode(el.innerHTML);
		}

		// 否则，获取 el 节点的文本内容
		else {
			code = el.textContent || '';
		}
	}

	if (!code) return;

	el.outerHTML = `<pre><code class="language-${lang} line-numbers">${code}</code></pre>`;
});
