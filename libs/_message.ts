/**
 * 	message 消息提示
 * 	提供全局消息提示、加载、弹窗、侧边栏等UI交互功能的统一接口
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

import LoadingInstance from '../messages/LoadingService';
import ToastInstance from '../messages/ToastService';
import AlertInstance from '../messages/AlertService';
import ModalInstance, { disponseAll } from '../messages/ModalService';
import SidebarInstance from '../messages/SidebarService';
import type { LoadingOptions, MessageButtonEvent, ModalOptions, SidebarOptions } from '../types';

import type { ITheme } from '../types';
import { $Global, Cookies, SERVERMODE } from '@da.li/core-libs';
import type { Modal } from 'bootstrap';

let loading: LoadingInstance;
let toast: ToastInstance;
let alert: AlertInstance;
let sidebar: SidebarInstance;

/**
 * 显示全局加载提示
 * @param options 加载提示配置选项
 */
export const showLoading = (options?: LoadingOptions) => {
	if (SERVERMODE) return;
	if (!loading) loading = new LoadingInstance();
	loading.show(options);
};

/**
 * 隐藏全局加载提示
 */
export const hideLoading = () => {
	if (SERVERMODE) return;
	loading && loading.hide();
};

/**
 * 显示 Toast 消息通知，屏幕右上角，通知后自动消失
 * @param message 消息内容
 * @param title 消息标题（可选）
 * @param theme 主题样式（可选）
 * @param duration 显示持续时间（毫秒），默认5000ms
 */
export const showToast = (message: string, title?: string, theme?: ITheme, duration = 5000) => {
	if (SERVERMODE) return;
	if (!toast) toast = new ToastInstance();
	toast.show({ message, title, theme, duration });
};

/**
 * 隐藏所有Toast消息通知
 */
export const hideToast = () => {
	if (SERVERMODE) return;
	toast && toast.hideAll();
};

/**
 * 显示通知提醒，页面中部或上部（视情况），通知后不会自动消失，需要手动关闭
 * @param message 通知内容
 * @param title 通知标题（可选）
 * @param theme 主题样式（可选），默认为'primary'
 * @param important 是否为重要通知，默认为false
 */
export const showNotice = (message: string, title?: string, theme?: ITheme, important = false) => {
	if (SERVERMODE) return;
	if (!alert) alert = new AlertInstance();
	alert.show({ message, title, theme: theme || 'primary', important });
};

/**
 * 打开模态窗口
 * @param options 模态窗口配置选项
 */
export const openModal = (options: ModalOptions) => {
	if (SERVERMODE) return;

	const modal = ModalInstance(options);
	modal?.show();

	return modal;
};

/**
 * 关闭模态窗口
 */
export const closeModal = (modal: Modal) => {
	if (SERVERMODE) return;
	modal && modal.hide();
};

/**
 * 销毁所有模态窗口
 */
export const disposeAllModal = () => {
	if (SERVERMODE) return;
	disponseAll();
};

/**
 * 显示警告弹窗
 * 基于模态窗口实现，预设为危险主题的小型弹窗，不可关闭
 * @param message 消息内容
 * @param title 消息标题（可选）
 * @param theme 主题样式（可选），默认为'danger'
 */
export const showAlert = (
	message: string,
	title?: string,
	theme?: ITheme,
	options?: ModalOptions
) => {
	openModal({
		size: 'sm',
		...options,
		message,
		title,
		theme: theme || 'danger',
		showClose: false
	});
};

/**
 * 显示确认弹窗
 * 基于模态窗口实现，预设为主要主题的小型弹窗，可关闭
 * @param message 消息内容
 * @param title 消息标题（可选）
 * @param theme 主题样式（可选），默认为'primary'
 * @param onConfirm 确认事件回调函数，返回 true 关闭窗口
 */
export const showConfirm = (
	message: string,
	title?: string,
	onConfirm?: MessageButtonEvent<ModalOptions>,
	theme?: ITheme,
	options?: ModalOptions
) => {
	openModal({
		size: 'sm',
		...options,
		message,
		title,
		theme: theme || 'primary',
		onConfirm,
		showClose: true
	});
};

/**
 * 显示输入弹窗
 * 基于模态窗口实现，预设为主要主题的小型弹窗，可关闭
 * @param message 消息内容
 * @param title 消息标题（可选）
 * @param theme 主题样式（可选），默认为'primary'
 * @param onConfirm 确认事件回调函数，返回 true 关闭窗口
 * @param value 默认输入值（可选）
 * @param prompt 输入框提示文本（可选）
 * @param mask 输入框遮罩文本（可选）
 */
export const showPrompt = (
	message: string,
	title?: string,
	value?: string,
	onConfirm?: MessageButtonEvent<ModalOptions>,
	theme?: ITheme,
	prompt?: string,
	mask?: string,
	options?: ModalOptions
) => {
	openModal({
		size: 'sm',
		...options,
		prompt: prompt || true,
		mask,
		value,
		message,
		title,
		theme: theme || 'primary',
		onConfirm,
		showClose: true
	});
};

/**
 * 打开侧边栏
 * @param options 侧边栏配置选项
 */
export const openSidebar = (options?: SidebarOptions) => {
	if (SERVERMODE) return;
	if (!sidebar) sidebar = new SidebarInstance();
	sidebar.open(options);
};

/**
 * 关闭侧边栏
 */
export const closeSidebar = () => {
	if (SERVERMODE) return;
	sidebar && sidebar.close();
};

/**
 * 全局警告弹窗函数
 * 为全局对象添加alert方法，用于显示警告弹窗
 * @param message 警告消息内容
 */
$Global.alert = (message) =>
	setTimeout(
		() =>
			openModal({
				theme: 'warning',
				title: message,
				icon: '-',
				size: 'sm',
				showClose: false,
				textConfirm: '确定'
			}),
		200
	);

/**
 * 判断当前是否为深色模式
 * @returns 返回布尔值，true表示当前为深色模式，false表示当前为浅色模式
 */
export const IsDarkTheme = (): boolean => {
	return SERVERMODE ? false : Cookies.get('theme') === 'dark';
};

/**
 * 直接打开链接
 * 通过创建临时DOM元素的方式打开URL链接
 * @param url 需要打开的URL地址
 * @param target 打开目标，默认为'_blank'（新标签页）
 */
export const openUrl = (url: string, target?: string) => {
	if (!url || SERVERMODE) return;

	// 创建一个临时的 <a> 元素
	const link = document.createElement('a');
	link.href = url;
	link.target = target || '_blank'; // 在新标签页中打开
	link.rel = 'noopener noreferrer'; // 安全属性，防止新页面访问 window.opener
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

/**
 * 打开链接（带安全提示）
 * 如果提供了提示信息，会先显示确认弹窗，用户确认后再打开链接
 * 弹窗中会显示完整链接地址并支持复制功能
 * @param url 需要打开的网址
 * @param message 提示信息，如果设置，则将使用弹窗先提示此信息后再打开
 */
export const openLink = (url: string, message: string) => {
	if (SERVERMODE || !url) return;

	// 无提示信息
	if (!message) return openUrl(url);

	message = message.replace(/\{url\}/g, url);
	message = `<div class="text-4"><div class="badge text-bg-primary text-4 num m-3" v-copy="${url}">链接<input type="text" class="form-control ms-2" value="${url}" readonly></div><div>${message}</div></div>`;

	// 显示弹窗
	openModal({
		title: '外链提醒',
		message,
		icon: 'link',
		theme: 'warning',
		showClose: true,
		size: 'sm',
		textConfirm: '确认并打开',
		textCancel: '暂不打开',
		onConfirm: () => {
			openUrl(url);
			return true;
		}
	});
};

/**
 * 复制内容到剪贴板
 * 仅在客户端环境下可用，优先使用现代Clipboard API，失败时提示用户手动复制
 * @param content 要复制的内容文本
 * @param show 复制完成后是否显示操作结果提示，默认为true
 */
export const copy = (content: string, show: boolean = true) => {
	if (SERVERMODE || !content || !window) return;

	/**
	 * 显示复制结果提示
	 * @param result 复制是否成功
	 */
	const showMessage = (result: boolean) => {
		if (!show) return;

		result
			? showToast('内容已复制', '', 'success', 300000)
			: showToast(
					`<div class="fw-bold">请手动选择并复制以下内容：</div><div class="p-3 mt-2 bg-danger-lt rounded-2">${content}${content}${content}${content}${content}${content}${content}</div>`,
					'复制异常',
					'danger',
					10000
			  );
	};

	// navigator clipboard 需要https等安全上下文
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard 向剪贴板写文本
		navigator.clipboard
			.writeText(content)
			.then(() => showMessage(true))
			.catch(() => showMessage(false));

		return;
	}

	// 手动复制
	showMessage(false);

	// 以下是使用已弃用API的备选方案，当前已注释
	// let successful = false;
	// try {
	// 	const textArea = document.createElement('textarea');
	// 	textArea.value = content;
	// 	textArea.style.position = 'fixed';
	// 	textArea.style.opacity = '0';
	// 	textArea.style.left = '-999999px';
	// 	textArea.style.top = '-999999px';
	// 	document.body.appendChild(textArea);
	// 	textArea.focus();
	// 	textArea.select();

	// 	// @ts-ignore: 使用已弃用的API作为回退方案
	// 	successful = document.execCommand('copy');
	// 	document.body.removeChild(textArea);
	// 	textArea.remove();
	// } catch (err) {}

	// showMessage(successful);
};
