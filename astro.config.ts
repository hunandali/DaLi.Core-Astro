import { defineConfig } from 'astro/config';

/** 集成项目 */
import dali from './integration/demo';

/** 包信息 */
import pkg from './package.json';

export default defineConfig({
	// 插件
	integrations: [
		dali({
			name: `${pkg.title}(${pkg.name})`,
			version: pkg.version,
			description: pkg.description,
			company: pkg.company,
			url: pkg.homepage,
			keywords: pkg.keywords?.join(','),
			whitelistDomains: [],
			external_link_action: 'alert',
			external_link_message: '此为外部链接，非本项目内链接，是否前往？',
			directives: true
		})
	],

	// 设置 Astro 将读取网站的目录。
	srcDir: './',

	// 设置静态资源目录。这个目录下的文件在开发过程中被提供给 /，在构建过程中被复制到构建目录。
	publicDir: './public',

	// 设置 astro build 将你的最终构建写入的目录。
	outDir: './demo',

	// 为 Astro 网站启用安全措施。
	security: {
		checkOrigin: true
	},

	// 服务端设置
	server: {
		port: 4000,
		host: true,
		open: true // 打开浏览器（路径）
	},

	// 构建选项
	build: {
		format: 'directory',
		assets: 'resources', // 公共资源目录
		assetsPrefix: '', // CDN 地址前缀
		inlineStylesheets: 'never' // 项目样式都以外部样式表的形式发送
	},

	devToolbar: {
		enabled: false // 是否开启开发者工具栏
	}
});
