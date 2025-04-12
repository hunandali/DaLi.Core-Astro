/**
 * 	message 消息提示
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
import ModalInstance from '../messages/ModalService';
import type { LoadingOptions, ModalOptions } from '../types';

import type { ITheme } from '../types';
import { $Global, Cookies, SERVERMODE } from '@da.li/core-libs';

let loading: LoadingInstance;
let toast: ToastInstance;
let alert: AlertInstance;
let modal: ModalInstance;

export const showLoading = (options?: LoadingOptions) => {
	if (SERVERMODE) return;
	if (!loading) loading = new LoadingInstance();
	loading.show(options);
};

export const hideLoading = () => {
	if (SERVERMODE) return;
	loading && loading.hide();
};

export const showToast = (message: string, title?: string, theme?: ITheme, duration = 5000) => {
	if (SERVERMODE) return;
	if (!toast) toast = new ToastInstance();
	toast.show({ message, title, theme, duration });
};

export const hideToast = () => {
	if (SERVERMODE) return;
	toast && toast.hideAll();
};

export const showAlert = (message: string, title?: string, theme?: ITheme, important = false) => {
	if (SERVERMODE) return;
	if (!alert) alert = new AlertInstance();
	alert.show({ message, title, theme, important });
};

export const openModal = (options?: ModalOptions) => {
	if (SERVERMODE) return;
	if (!modal) modal = new ModalInstance();
	modal.open(options);
};

export const closeModal = () => {
	if (SERVERMODE) return;
	modal && modal.close();
};

$Global.alert = (message) =>
	setTimeout(
		() =>
			openModal({
				theme: 'warning',
				title: message,
				icon: '-',
				showClose: false,
				textOk: '确定'
			}),
		200
	);

/** 是否深色模式 */
export const IsDarkTheme = (): boolean => {
	return SERVERMODE ? false : Cookies.get('theme') === 'dark';
};

/** 直接打开链接 */
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
 * 打开链接
 * @param url 		需要打开的网址
 * @param message 	提示信息，如果设置，则将使用弹窗先提示此信息后再打开
 */
export const openLink = (url: string, message: string) => {
	if (SERVERMODE || !url) return;

	// 无提示信息
	if (!message) return openUrl(url);

	message = message.replace(/\{url\}/g, url);
	message = `<div class="text-4"><div class="badge text-bg-primary text-4 num m-3">链接<input type="text" class="form-control ms-2" value="${url}${url}${url}" disabled></div>${message}</div>`;

	// 显示弹窗
	openModal({
		title: '外链提醒',
		message,
		icon: 'link',
		theme: 'warning',
		showClose: true,
		size: 'sm',
		textOk: '确认并打开',
		textCancel: '暂不打开',
		onOk: () => {
			openUrl(url);
			return true;
		}
	});
};
