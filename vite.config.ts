import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	/** 此处需要设置为空值，否则打包的 css 文件中字体资源会使用绝对路径而无法正常显示 */
	base: '',

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

					const fileName =
						assetInfo.names && assetInfo.names.length > 0 ? assetInfo.names[0] : '';
					if (fileName === 'style.css') {
						return 'themes/index.css';
					}

					const filePath =
						assetInfo.originalFileNames && assetInfo.originalFileNames.length > 0
							? assetInfo.originalFileNames[0]
							: '';

					if (filePath.startsWith('themes/')) {
						// if (fileName && /\.(woff|woff2|ttf|eot|otf)$/.test(fileName)) {
						// 	return 'iconfonts/[name][extname]';
						// }

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
