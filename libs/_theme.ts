/**
 * 	theme 主题操作
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

import type { IColorFull, IIcon, ITheme } from '../types';

/** 主题图标数据 */
export const ThemeICONS: Record<ITheme, IIcon> = {
	primary: { icon: 'logo', logo: true, theme: 'primary' },
	secondary: { icon: '', theme: 'secondary' },
	success: { icon: 'success', theme: 'success' },
	warning: { icon: 'warn', theme: 'warning' },
	danger: { icon: 'fail', theme: 'danger' },
	info: { icon: 'info', theme: 'info' }
};

/**
 * 获取主题图标
 * @param theme 主题
 * @returns 图标
 */
export const ThemeIcon = (theme = 'priamry' as IColorFull) =>
	ThemeICONS[theme as ITheme] || { icon: 'logo', logo: true, theme };
