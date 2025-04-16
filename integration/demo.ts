import type { AstroIntegration } from 'astro';
import type { ConfigOptions } from '../types';
import { serverScript, clientScript } from './';

/** 集成 */
export default function (config: ConfigOptions): AstroIntegration {
	return {
		name: 'dali-astro',
		hooks: {
			'astro:config:setup': async (options) => {
				/** 全局脚本注入 */
				options.injectScript('page-ssr', serverScript(config, true));
				options.injectScript('page', clientScript(config, true));
			}
		}
	};
}
