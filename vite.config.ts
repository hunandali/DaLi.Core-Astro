import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			outDir: 'dist',

			// 可选：包含你想要生成类型的文件
			include: ['index.ts', 'libs/*.ts', 'messages/*.ts'],

			// 可选：排除不需要生成类型的文件
			exclude: ['**/types.ts']
		})
	],

	build: {
		cssCodeSplit: false,
		rollupOptions: {
			external: [
				'@da.li/core-libs',
				'@tabler/core',
				'astro',
				'astro-iconify',
				'dayjs',
				'countup.js',
				'bootstrap'
			],
			input: {
				'index.css': 'themes/index.less',
				index: 'index.ts',
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
