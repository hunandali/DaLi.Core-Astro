import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [],

	build: {
		cssCodeSplit: false,
		rollupOptions: {
			external: [
				'astro',
				'@tabler/core',
				'@tabler/core/dist/css/tabler.css',
				'@da.li/core-libs',
				'dayjs',
				'countup.js',
				'bootstrap'
			],
			input: {
				'index.css': 'themes/index.less',
				integration: 'integration.ts',
				'libs/index': 'libs/index.ts',
				'libs/client': 'libs/index.client.ts'
			},
			output: {
				entryFileNames: '[name].js',
				assetFileNames: (assetInfo) => {
					// 样式入口文件移动到 theme 目录
					// console.log(assetInfo);

					if (assetInfo.names && assetInfo.names[0] === 'style.css') {
						return 'themes/index.css';
					} else if (
						assetInfo.originalFileNames &&
						assetInfo.originalFileNames[0].startsWith('themes/')
					) {
						return assetInfo.originalFileNames[0];
					}
					return 'resources/[name][extname]';
				},
				chunkFileNames: 'resources/[name]-[hash].js',
				preserveModules: true
			},
			preserveEntrySignatures: 'allow-extension'
		}
	}
});
