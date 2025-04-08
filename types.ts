///<reference types="@da.li/core-libs" />

/** 默认样式 */
export type ITheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** 全部颜色 */
export type IThemeFull = ITheme | 'light' | 'dark';

/** 默认颜色 */
export type IColor =
	| 'light'
	| 'dark'
	| 'blue'
	| 'azure'
	| 'indigo'
	| 'purple'
	| 'pink'
	| 'red'
	| 'orange'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'teal'
	| 'cyan';

/** 全部颜色 */
export type IColorFull = ITheme | IColor;

/** 位置(边) */
export type IPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';

/** 位置(角) */
export type IPositionBase =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'middle-left'
	| 'middle-center'
	| 'middle-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

/** 位置(全部) */
export type IPositionFull = IPosition | IPositionBase;

/////////////////////////////////////////////////////////////////////////////////////////

/** 警告消息类型 */
export interface AlertOptions {
	/** 主题 */
	theme?: ITheme;

	/** 标题 */
	title?: string;

	/** 消息内容 */
	message?: string;

	/** 图标 */
	icon?: string;

	/** 是否重要 */
	important?: boolean;

	/** 是否可关闭 */
	closeable?: boolean;
}

/** 加载消息类型 */
export interface LoadingOptions {
	/** 样式 */
	theme?: ITheme;

	/** load 图标 1-6 */
	mode?: number;

	/** 加载信息 */
	message?: string;

	/** 加载目标 */
	target?: string | HTMLElement;

	/** 是否禁止背景项目滚动 */
	lock?: boolean;

	/** 是否执行时间 */
	showTime?: boolean;

	/** 尺寸 */
	size?: number;
}

/** 弹窗消息类型 */
export interface ModalOptions {
	/** 图标 */
	icon?: string;

	/** 主题 */
	theme?: ITheme;

	/** 标题 */
	title?: string;

	/** 消息内容 */
	message?: string;

	/** 允许关闭 */
	showClose?: boolean;

	/** 取消按钮文字 */
	textCancel?: string;

	/** 确认按钮文字 */
	textOk?: string;

	/** 确认事件，返回 true 关闭窗口 */
	onOk?: (e: Event) => boolean | void;

	/** 取消事件，返回 false 取消关闭 */
	onCancel?: (e: Event) => boolean | void;

	/** 打开事件，返回 false 取消打开 */
	onOpen?: (e: Event) => boolean | void;

	/** 关闭事件，返回 false 取消关闭 */
	onClose?: (e: Event) => boolean | void;
}

/** 提示消息类型 */
export interface ToastOptions {
	/** 主题 */
	theme?: ITheme;

	/** 标题 */
	title?: string;

	/** 消息内容 */
	message?: string;

	/** 显示时长(毫秒)，0表示不自动关闭 */
	duration?: number;
}

/////////////////////////////////////////////////////////////////////////////////////////

/** 图标属性 */
export interface IIcon {
	/** 图标 */
	icon?: string | undefined;

	/** 是否为 Logo */
	logo?: string | boolean | undefined;

	/** 文字 */
	text?: string | number | undefined;

	/** 类型 */
	theme?: IColorFull | string | undefined;

	/** 禁用图标 */
	disabled?: boolean | undefined;

	/** 旋转 */
	rotate?: 0 | 1 | 2 | 3 | 'horizontal' | 'vertical' | 'both' | string | undefined;
}
