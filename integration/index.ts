import type { AstroIntegration } from 'astro';
import type { ConfigOptions } from '../config';

export { Imports as AutoImports } from './imports';

/** 文件路径 */
const file = (name: string, local: boolean) =>
	local ? `/integration/${name}` : `@da.li/core-astro/dist/integration/${name}`;

/** 服务端注入脚本 */
export const serverScript = (config: ConfigOptions, local: boolean) =>
	`import { init } from '${file('server', local)}';init(${JSON.stringify(config)});`;

/** 客户端注入脚本 */
export const clientScript = (config: ConfigOptions, local: boolean) =>
	`import { init } from '${file('client', local)}';init(${JSON.stringify(config)});`;

/** 默认集成设置 */
export default function (config: ConfigOptions): AstroIntegration {
	!config && (config = {});

	return {
		name: 'dali-astro',
		hooks: {
			'astro:config:setup': async (options) => {
				/** 全局脚本注入 */
				options.injectScript('page-ssr', serverScript(config, false));
				options.injectScript('page', clientScript(config, false));
			}
		}
	};
}
