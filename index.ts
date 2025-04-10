import type { AstroIntegration } from 'astro';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';
import type { ConfigOptions } from './config';

/** 默认集成设置 */
export default function (config: ConfigOptions): AstroIntegration {
	!config && (config = {});
	const appConfig = JSON.stringify(config);

	return {
		name: 'dali-astro',
		hooks: {
			'astro:config:setup': async (options) => {
				/** 全局脚本注入 */
				options.injectScript(
					'page-ssr',
					`import '@da.li/core-libs';
import '@tabler/core/dist/css/tabler.css';
import '@da.li/core-astro/dist/themes/index.css';
import { init } from '@da.li/core-astro/dist/config';
init(${appConfig});`
				);
				options.injectScript(
					'page',
					`import "@da.li/core-libs";
import { init } from '@da.li/core-astro/dist/config';
init(${appConfig});`
				);
			}
		}
	};
}

/** unplugin-auto-import 自动导入类型、函数与组件 */
export const Imports: AutoImportOptions['imports'] = [
	{
		/** 基础包公用函数 */
		'@da.li/core-libs': [
			'$Global',
			'DEBUG',
			'LOGO',
			'LRU',
			'MD5',
			'SERVERMODE',
			'Cookies',
			'base64Decode',
			'base64Encode',
			'cleanDuplicate',
			'rnd',
			'sleep',
			'clear',
			'clone',
			'merge',
			'toDate',
			'toJSON',
			'debounce',
			'throttle',
			'hasArray',
			'hasObject',
			'hasObjectName',
			'hasString',
			'isArray',
			'isAsync',
			'isBoolean',
			'isCar',
			'isChinese',
			'isDate',
			'isEmail',
			'isEmpty',
			'isEnglish',
			'isEqual',
			'isFloat',
			'isFn',
			'isFullUrl',
			'isGuid',
			'isHttp',
			'isIP',
			'isInt',
			'isJSON',
			'isMatch',
			'isMobile',
			'isNaN',
			'isName',
			'isNil',
			'isNumber',
			'isObject',
			'isPhone',
			'isPrimitive',
			'isRegExp',
			'isString',
			'isSymbol',
			'isUrl'
		]
	},
	{
		/** 基础包公用类型声明 */
		from: '@da.li/core-libs',
		imports: [
			'Dict',
			'NVs',
			'Action',
			'AsyncAction',
			'Func',
			'AsyncFunc',
			'IList',
			'IListMap',
			'ITree',
			'ITreeMap',
			'IRule',
			'IRules',
			'Nullable',
			'MaybePromise',
			'HttpRuntime'
		],
		type: true
	},

	///////////////////////////////////////////

	{
		/** 常量 */
		'@da.li/core-astro/dist/config': ['APP', 'EVENTS', 'ERROR_CODES']
	},
	{
		/** 基础参数 */
		'@da.li/core-astro/dist/libs': ['ThemeIcon', 'ClassUpdate', 'ClassClear', 'PropsUpdate']
	},
	{
		/** 客户端组件 */
		'@da.li/core-astro/dist/libs/client': [
			'showLoading',
			'hideLoading',
			'showToast',
			'hideToast',
			'showAlert',
			'IsDarkTheme'
		]
	},

	///////////////////////////////////////////

	{
		/** 基础组件 */
		'@da.li/core-astro/dist/components': [
			'DlAvatar',
			'DlAvatarList',
			'DlBadge',
			'DlBreadcrumb',
			'DlButton',
			'DlCard',
			'DlCarousel',
			'DlCountup',
			'DlDivider',
			'DlDropcard',
			'DlDropdown',
			'DlEmpty',
			'DlIcon',
			'DlPlaceholder',
			'DlProgress',
			'DlProgressBar',
			'DlProgressList',
			'DlRibbon',
			'DlSpinner',
			'DlStatus',
			'DlSwitch',
			'DlSwitchIcon',
			'DlTimeline',
			'DlTooltip',
			'DlTracking'
		]
	},
	{
		/** 自定义组件 */
		'@da.li/core-astro/dist/customs': ['DlAbout', 'DlError', 'DlQR']
	},
	{
		/** 布局组件 */
		'@da.li/core-astro/dist/layouts': [
			'DlEmptyLayout',
			'DlHead',
			'DlPageFooter',
			'DlPageHeader',
			'DlPageLayout',
			'DlPageTheme'
		]
	},
	{
		/** 消息组件 */
		'@da.li/core-astro/dist/messages': [
			'DlAlert',
			'DlMessageModal',
			'DlModal',
			'DlToast',
			'AlertService',
			'LoadingService',
			'ModalService',
			'ToastService'
		]
	}
];
