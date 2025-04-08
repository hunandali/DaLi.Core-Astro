import type { AstroIntegration } from 'astro';

// /** Auto Import */
// import AutoImport from 'unplugin-auto-import/astro';
// import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';

/** Alpine.js */
// import AlpineJs from '@astrojs/alpinejs';

export default function (): AstroIntegration {
	return {
		name: 'dali-astro',
		hooks: {
			'astro:config:setup': async (options) => {
				// /** 常用应用组件 */
				// await AutoImport(autoImport).hooks['astro:config:setup'](options);

				// /** Alpine.js */
				// await AlpineJs().hooks['astro:config:setup']!(options);

				/** 全局脚本注入 */
				options.injectScript(
					'page-ssr',
					`import "@da.li/core-libs";
import "@tabler/core/dist/css/tabler.css";
import "/themes/index.css";`
				);
				options.injectScript('page', `import "@da.li/core-libs";`);
			}
		}
	};
}

// import "@tabler/core";

// /** 自动导入类型、函数与组件 */
// const autoImport: AutoImportOptions = {
// 	dts: true,
// 	imports: [
// 		{
// 			'@da.li/core-libs': [
// 				'$Global',
// 				'DEBUG',
// 				'LOGO',
// 				'LRU',
// 				'MD5',
// 				'SERVERMODE',
// 				'Cookies',
// 				'base64Decode',
// 				'base64Encode',
// 				'cleanDuplicate',
// 				'rnd',
// 				'sleep',
// 				'clear',
// 				'clone',
// 				'merge',
// 				'toDate',
// 				'toJSON',
// 				'debounce',
// 				'throttle',
// 				'hasArray',
// 				'hasObject',
// 				'hasObjectName',
// 				'hasString',
// 				'isArray',
// 				'isAsync',
// 				'isBoolean',
// 				'isCar',
// 				'isChinese',
// 				'isDate',
// 				'isEmail',
// 				'isEmpty',
// 				'isEnglish',
// 				'isEqual',
// 				'isFloat',
// 				'isFn',
// 				'isFullUrl',
// 				'isGuid',
// 				'isHttp',
// 				'isIP',
// 				'isInt',
// 				'isJSON',
// 				'isMatch',
// 				'isMobile',
// 				'isNaN',
// 				'isName',
// 				'isNil',
// 				'isNumber',
// 				'isObject',
// 				'isPhone',
// 				'isPrimitive',
// 				'isRegExp',
// 				'isString',
// 				'isSymbol',
// 				'isUrl'
// 			]
// 		},
// 		{
// 			from: 'dayjs',
// 			imports: [
// 				{
// 					name: '*',
// 					as: 'dayjs'
// 				}
// 			] // 导入 dayjs 的默认导出
// 		},
// 		{
// 			from: '@da.li/core-libs',
// 			imports: [
// 				'Dict',
// 				'NVs',
// 				'Action',
// 				'AsyncAction',
// 				'Func',
// 				'AsyncFunc',
// 				'IList',
// 				'IListMap',
// 				'ITree',
// 				'ITreeMap',
// 				'IRule',
// 				'IRules',
// 				'Nullable',
// 				'MaybePromise',
// 				'HttpRuntime'
// 			],
// 			type: true
// 		},
// 		{
// 			'/libs/index.server.ts': ['ThemeIcon', 'ClassUpdate', 'ClassClear']
// 		},
// 		{
// 			'/libs/index.client.ts': [
// 				'showLoading',
// 				'hideLoading',
// 				'showToast',
// 				'hideToast',
// 				'showAlert'
// 			]
// 		},
// 		{
// 			'/config.ts': ['EVENTS']
// 		}
// 	]
// };
