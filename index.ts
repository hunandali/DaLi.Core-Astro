import type { AstroIntegration } from 'astro';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';

export * from './config';
export * from './libs';
export * from './components';
export * from './layouts';
export * from './messages';

/** 默认集成设置 */
export default function (): AstroIntegration {
	return {
		name: 'dali-astro',
		hooks: {
			'astro:config:setup': async (options) => {
				/** 全局脚本注入 */
				options.injectScript(
					'page-ssr',
					`import "@da.li/core-libs";
import "@tabler/core/dist/css/tabler.css";
import "@da.li/core-astro/dist/themes/index.css";`
				);
				options.injectScript('page', `import "@da.li/core-libs";`);
			}
		}
	};
}

/** unplugin-auto-import 自动导入类型、函数与组件 */
export const Imports: AutoImportOptions['imports'] = [
	{
		'@da.li/core-astro': [
			// config
			'EVENTS',

			// libs
			'ThemeIcon',
			'ClassUpdate',
			'ClassClear',
			'PropsUpdate',

			// components
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
			'DlTracking',

			// layouts
			'DlEmptyLayout',
			'DlHead',
			'DlPageHeader',
			'DlPageLayout',
			'DlPageTheme',

			// messages
			'DlAlert',
			'DlMessageModal',
			'DlModal',
			'DlToast',
			'AlertService',
			'LoadingService',
			'ModalService',
			'ToastService'
		]
	},

	// 对于服务端无法直接导入组件的情况，需要单独导入
	{
		'@da.li/core-astro/dist/libs/client': [
			'showLoading',
			'hideLoading',
			'showToast',
			'hideToast',
			'showAlert'
		]
	}
];
