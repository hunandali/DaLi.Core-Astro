import fs_extra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '.');

/** 目录复制 */
async function floderCopy(source: string, target = 'dist') {
	const srcDir = path.join(rootDir, source);
	const distDir = path.join(rootDir, `${target}/${source}`);

	try {
		if (!fs_extra.existsSync(srcDir)) {
			throw new Error(`Source directory does not exist: ${srcDir}`);
		}

		// 确保目标目录存在
		await fs_extra.ensureDir(distDir);

		// 复制 src 目录的内容到 dist，但排除 app.css
		const filter = async (src: string) => {
			return !src.endsWith('需要排除的文件或目录');
		};

		await fs_extra.copy(srcDir, distDir, { filter });
		// eslint-disable-next-line no-console
		console.log(`✅ 成功复制文件 ${source} 到 ${target}`);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`❌ 复制文件 ${source} 到 ${target}失败：`, error);
		process.exit(1);
	}
}

/** 文件复制 */
async function fileCopy(sourceFile: string, targetFolder = 'dist') {
	const srcFile = path.join(rootDir, sourceFile);
	const distFile = path.join(rootDir, targetFolder, path.basename(sourceFile));

	try {
		// 检查源文件是否存在
		if (!fs_extra.existsSync(srcFile)) {
			throw new Error(`Source file does not exist: ${srcFile}`);
		}

		// 确保目标目录存在
		await fs_extra.ensureDir(path.dirname(distFile));

		// 复制文件
		await fs_extra.copy(srcFile, distFile);
		console.log(`✅ 成功复制文件 ${sourceFile} 到 ${targetFolder}`);
	} catch (error) {
		console.error(`❌ 复制文件 ${sourceFile} 到 ${targetFolder}失败：`, error);
		process.exit(1);
	}
}

/** 清理指定目录下指定类型文件，如：./dist/abc/&.ts */
async function cleanupDist(
	targetFolder: string,
	fileTypes: string[] = ['.ts', '.js', '.d.ts', '.map']
) {
	const targetDir = path.join(rootDir, targetFolder);

	try {
		if (!fs_extra.existsSync(targetDir)) {
			console.log(`⚠️ 目标目录不存在: ${targetDir}`);
			return;
		}

		const files = await fs_extra.readdir(targetDir);

		for (const file of files) {
			const filePath = path.join(targetDir, file);
			const stat = await fs_extra.stat(filePath);

			if (stat.isFile() && fileTypes.some((ext) => file.endsWith(ext))) {
				await fs_extra.unlink(filePath);
				console.log(`🗑️ 已删除文件: ${file}`);
			}
		}

		console.log('✅ 清理完成');
	} catch (error) {
		console.error('❌ 清理失败:', error);
		process.exit(1);
	}
}

async function postBuild() {
	try {
		// await cleanupDist();
		await floderCopy('components');
		await floderCopy('messages');
		// await floderCopy('libs');
		await fileCopy('config.ts');
		// await fileCopy('integration.ts');
		await fileCopy('types.ts');
		await fileCopy('README.md');
		await fileCopy('package.json');

		await cleanupDist('dist/messages', ['.ts']);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('❌ 后处理任务失败:', error);
		process.exit(1);
	}
}

postBuild();
