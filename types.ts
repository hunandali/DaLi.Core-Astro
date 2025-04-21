///<reference types="@da.li/core-libs" />

import type { Dict } from '@da.li/core-libs';

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

/** 尺寸 */
export type ISize = 'sm' | 'md' | 'lg' | 'xl';

/////////////////////////////////////////////////////////////////////////////////////////

/** 消息类型 */
export interface IMessage {
	/** 主题 */
	theme?: IColorFull;

	/** 标题 */
	title?: string;

	/** 消息内容 */
	message?: string;

	/** 图标 */
	icon?: string;
}

/** 警告消息类型 */
export interface AlertOptions extends IMessage {
	/** 是否重要 */
	important?: boolean;

	/** 小窗口模式 */
	mini?: boolean;

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
	size?: number | string;
}

/** 弹窗消息类型 */
export interface ModalOptions extends IMessage {
	/** 允许关闭 */
	showClose?: boolean;

	/** 尺寸 */
	size?: ISize;

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

/** 侧边栏类型 */
export interface SidebarOptions extends IMessage {
	/** 侧边栏位置 */
	placement?: 'start' | 'end' | 'top' | 'bottom';

	/** 尺寸，左右侧边栏为宽度，上下侧边栏为高度，兼容样式款高度 */
	size?: number | string;

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
export interface ToastOptions extends Omit<IMessage, 'icon'> {
	/** 显示时长(毫秒)，0表示不自动关闭 */
	duration?: number;
}

/////////////////////////////////////////////////////////////////////////////////////////

/** 组件基础属性 */
export interface IPropsBase extends Dict {
	/** 自定义样式类 */
	class?: string;

	/** 自定义样式 */
	style?: any;

	/** 自定义标识 */
	id?: string;
}

/////////////////////////////////////////////////////////////////////////////////////////

/** 图标属性 */
export interface IIcon {
	/** 图标 */
	icon?: string;

	/** 是否为 Logo */
	logo?: string | boolean;

	/** 文字 */
	text?: string | number;

	/** 类型 */
	theme?: IColorFull | string;

	/** 禁用图标 */
	disabled?: boolean;

	/** 旋转 */
	rotate?: 0 | 1 | 2 | 3 | 'horizontal' | 'vertical' | 'both' | string;
}

/** 链接属性 */
export interface ILink extends Omit<IIcon, 'rotate' | 'logo'> {
	/** 图标大小 1-6 */
	size?: number | string;

	/** 链接 */
	href?: string;

	/** 链接目标 */
	target?: string;

	/** 自定义样式 */
	class?: string;
}

/**
 * 外部链接处理方式
 * 1. false: 不允许，发现外部链接禁用
 * 2. true: 允许，发现外部直接使用，不做任何限制
 * 3. string: 允许，发现外部使用模板地址跳转，模板地址中使用 {url} 占位符，原始网址使用 base64 编码。未使用 {url} 则会直接跳到模板地址。
 * 4. alert: 允许，但是会弹窗提示手动点击打开。
 */
export type IExternalLinkAction = boolean | string | 'alert';

/**
 * 是否启用指令
 * 1. false: 禁用
 * 2. true: 启用默认(v-)类型指令
 * 3. string: 启用并自定义指令前缀，例如 '@' 或 'v-'，空值则禁用
 */
export type IDirective = boolean | string;

/** 配置属性 */
export interface ConfigOptions {
	/** 应用名称 */
	name?: string;

	/** 应用版本 */
	version?: string;

	/** 应用描述 */
	description?: string;

	/** 企业 */
	company?: string;

	/** 应用网址 */
	url?: string;

	/** 应用关键词 */
	keywords?: string;

	/** 应用白名单网址 */
	whitelistDomains?: string[];

	/**
	 * 默认外部链接处理方式（Link.astro 组件默认外部链接处理方式）
	 * 1. false: 不允许，发现外部链接禁用
	 * 2. true: 允许，发现外部直接使用，不做任何限制
	 * 3. string: 允许，发现外部使用模板地址跳转，模板地址中使用 {url} 占位符，原始网址使用 base64 编码。未使用 {url} 则会直接跳到模板地址。
	 * 4. alert: 允许，但是会弹窗提示手动点击打开。
	 */
	external_link_action?: IExternalLinkAction;

	/** 如果使用弹窗模式打开外部链接，则使用此警告消息，原网址使用 {url} 占位符 */
	external_link_message?: string;

	/** 代码高亮语言默认路径 */
	code_languages_path?: string;

	/**
	 * 是否启用指令
	 * 1. false: 禁用
	 * 2. true: 启用默认(v-)类型指令
	 * 3. string: 启用并自定义指令前缀，例如 '@' 或 'v-'，空值则禁用
	 */
	directives?: IDirective;
}
