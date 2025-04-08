/*
' ------------------------------------------------------------
'
' 	Copyright © 2022 湖南大沥网络科技有限公司.
'
' 	  author:	木炭(WOODCOAL)
' 	   email:	i@woodcoal.cn
' 	homepage:	http://www.hunandali.com/
'
' ------------------------------------------------------------
'
' 	扩展图标
'
' 	name: icons
' 	create: 2025-03-30
' 	
' ------------------------------------------------------------
*/

import inIcons from './themes/iconfonts/icons';
import inLogos from './themes/iconfonts/logo';

/** 默认扩展图标 */
const data = {
	moon: 'line-md:moon-filled-alt-loop',
	sun: 'line-md:sunny-outline-twotone-loop',
	arrow: 'line-md:chevron-small-triple-left',
	upload: 'line-md:upload-outline-loop',
	download: 'line-md:download-outline-loop',
	pen: 'line-md:edit-twotone-full',
	check: 'line-md:check-all',
	tip: 'line-md:alert-circle-loop',
	important: 'line-md:alert-loop',
	forward: 'ri:arrow-go-forward-fill',
	compass: 'line-md:compass-loop',
	speed: 'line-md:speed-loop',
	task: 'line-md:check-list-3-twotone',
	menuopen: 'ri:indent-increase',
	menuclose: 'ri:indent-decrease',
	zoomin: 'ri:zoom-in-line',
	zoomout: 'ri:zoom-out-line',
	fullscreen: 'ri:fullscreen-line',
	fullscreen_exit: 'ri:fullscreen-exit-line',
	export: 'ri:upload-cloud-2-line',
	import: 'ri:download-cloud-2-line',
	trash: 'ri:delete-bin-line',
	fn: 'ri:function-add-line',
	unpin: 'ri:unpin-line',
	pin: 'ri:pushpin-line',
	dot: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16"/></svg>',
	'num-dot':
		'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/></svg>',
	load_1: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><g><circle cx="12" cy="2.5" r="1.5" fill="currentColor" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" fill="currentColor" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" fill="currentColor" opacity=".43"/><circle cx="21.5" cy="12" r="1.5" fill="currentColor" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" fill="currentColor" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" fill="currentColor" opacity=".86"/><circle cx="12" cy="21.5" r="1.5" fill="currentColor"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></svg>',
	load_2: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>',
	load_3: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>',
	load_4: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect><rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect></svg>',
	load_5: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsScale0" attributeName="r" begin="0;svgSpinners3DotsScale1.end-0.25s" dur="0.75s" values="3;.2;3"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="r" begin="svgSpinners3DotsScale0.end-0.6s" dur="0.75s" values="3;.2;3"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsScale1" attributeName="r" begin="svgSpinners3DotsScale0.end-0.45s" dur="0.75s" values="3;.2;3"/></circle></svg>',
	load_6: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"/></path><path stroke-dasharray="32" stroke-dashoffset="32" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"/></path></g></svg>'
} as Record<string, string>;

/** 常用字母 */
const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('').reduce((data, char) => {
	data[char] = `fa6-solid:${char}`;
	return data;
}, {} as Record<string, string>);

/** 常用数字 */
const number = '0123456789'.split('').reduce((data, char) => {
	data[`num-${char}`] = `ri:number-${char}`;
	return data;
}, {} as Record<string, string>);

/** 内置图表 */
export const icons = inIcons.reduce((data, key) => {
	data[key] = `icon-${key}`;
	return data;
}, {} as Record<string, string>);

/** 内置 LOGO */
export const logos = inLogos.reduce((data, key) => {
	data[key] = `logo-${key}`;
	return data;
}, {} as Record<string, string>);

/** 扩展图标 */
export const list = {
	...icons,
	...chars,
	...number,
	...data
};

/** 所有图标键 */
export const keys = Object.keys(list);

/** 获取 Logo */
export const getLogo = (logo: string | undefined) => {
	if (!logo) return '';

	// 处理名称
	logo.endsWith('-disabled') && (logo = logo.substring(0, logo.length - 9));

	return logos[logo] || logo;
};

/** 获取图标 */
export const getIcon = (icon: string | undefined) => {
	if (!icon) return '';

	// 处理名称
	icon.endsWith('-disabled') && (icon = icon.substring(0, icon.length - 9));
	icon.startsWith('logo-') && (icon = icon.substring(5));

	return list[icon] || icon;
};

/** 所有图标 */
export default list;
