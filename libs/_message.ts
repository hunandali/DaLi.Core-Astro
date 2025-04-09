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
