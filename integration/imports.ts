/**
 * 	imports 自动导出配置
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

import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';

/** 基础包公用函数 */
const coreLibs = [
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
];

/** 基础包公用类型声明 */
const coreTypes = [
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
];

/** 常量 */
const constants = ['APP', 'EVENTS', 'ERROR_CODES'];

/** 基础参数 */
const baseParams = [
	'ThemeIcon',
	'ClassUpdate',
	'ClassClear',
	'PropsUpdate',
	'isExternalDomain',
	'updateLink'
];

/** 基础库函数 */
const baseLibs = [
	'showLoading',
	'hideLoading',
	'showToast',
	'hideToast',
	'showAlert',
	'openModal',
	'closeModal',
	'IsDarkTheme',
	'copy',
	'openUrl',
	'openLink'
];

/** 组件 */
const components = [
	'DlAvatar',
	'DlAvatarList',
	'DlBadge',
	'DlBreadcrumb',
	'DlButton',
	'DlCard',
	'DlCarousel',
	'DlCountup',
	'DlDataGrid',
	'DlDivider',
	'DlDropcard',
	'DlDropdown',
	'DlEmpty',
	'DlIcon',
	'DlLink',
	'DlNavbar',
	'DlNavs',
	'DlNavSegment',
	'DlPlaceholder',
	'DlProgress',
	'DlProgressBar',
	'DlProgressList',
	'DlRibbon',
	'DlSpinner',
	'DlStatus',
	'DlSwitch',
	'DlSwitchIcon',
	'DlTab',
	'DlTimeline',
	'DlTooltip',
	'DlTracking'
];

/** 布局组件 */
const layouts = [
	'DlLayoutBase',
	'DlLayoutDefault',
	'DlHead',
	'DlPageFooter',
	'DlPageHeader',
	'DlPageLayout',
	'DlPageTheme'
];

/** 自定义组件 */
const customs = ['DlAbout', 'DlError', 'DlQR'];

/** 消息组件 */
const messages = [
	'DlAlert',
	'DlMessageModal',
	'DlModal',
	'DlToast',
	'DlSidebar',
	'AlertService',
	'LoadingService',
	'ModalService',
	'ToastService',
	'SidebarService'
];

/** unplugin-auto-import 自动导入类型、函数与组件 */
export const Imports: AutoImportOptions['imports'] = [
	{
		/** 基础包公用函数 */
		'@da.li/core-libs': coreLibs
	},
	{
		/** 基础包公用类型声明 */
		from: '@da.li/core-libs',
		imports: coreTypes,
		type: true
	},

	///////////////////////////////////////////

	{
		/** 常量 */
		'@da.li/core-astro/dist/config': constants
	},
	{
		/** 基础参数 */
		'@da.li/core-astro/dist/libs/index': baseParams
	},
	{
		/** 基础库函数 */
		'@da.li/core-astro/dist/libs/client': baseLibs
	},

	///////////////////////////////////////////

	{
		/** 基础组件 */
		'@da.li/core-astro/dist/components': components
	},
	{
		/** 自定义组件 */
		'@da.li/core-astro/dist/customs': customs
	},
	{
		/** 布局组件 */
		'@da.li/core-astro/dist/layouts': layouts
	},
	{
		/** 消息组件 */
		'@da.li/core-astro/dist/messages': messages
	}
];
