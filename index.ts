import type { AstroIntegration } from 'astro';

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
