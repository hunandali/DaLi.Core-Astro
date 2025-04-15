/**
 * 	Prism 代码高亮
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

import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

// 行号显示插件
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// 自动加载语言插件
import 'prismjs/plugins/autoloader/prism-autoloader.js';

// 工具栏插件
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

// 显示语言标签插件(依赖工具栏插件)
import 'prismjs/plugins/show-language/prism-show-language.js';

// 代码复制插件(依赖工具栏插件)
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';

// 代码格式化插件
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

// 配置格式化选项（可选）
Prism.plugins.NormalizeWhitespace.setDefaults({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'break-lines': 100,
	'right-trim': true,
	indent: 0,
	'remove-initial-line-feed': true,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4
});

// 全局参数
import { APP } from '../config';

// 配置 autoloader
Prism.plugins.autoloader.languages_path = APP.CODE_LANGUAGES_PATH;
