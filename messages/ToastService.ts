/**
 * ToastService 全局消息通知服务
 *
 * ------------------------------------------------------------
 *
 * 	Copyright © 2025 湖南大沥网络科技有限公司.
 *
 * 	  author:	木炭(WOODCOAL)
 * 	   email:	i@woodcoal.cn
 * 	homepage:	https://www.hunandali.com/
 *
 * ------------------------------------------------------------
 */

import { Toast } from 'bootstrap';
import type { IPositionBase } from '../types';
import { ThemeIcon } from '../libs';
import { getIcon, getLogo } from '../icons';
import { hasObject } from '@da.li/core-libs';
import type { ToastOptions } from '../types';

class ToastService {
	/** 位置 */
	Position: IPositionBase = 'top-right';

	/** 容器 */
	private container: HTMLDivElement | null = null;

	/** 消息项目 */
	private toasts = new Map<Toast, HTMLElement>(); // 存储 Toast 实例的数组

	/** 定时器 */
	private timer: NodeJS.Timeout | undefined;

	/** 创建容器，存在则使用原来容器 */
	private createContainer() {
		if (!this.container) {
			// 全局搜索
			this.container = document.querySelector('.toast-container');
			if (this.container) return this.container;

			// 创建新的容器
			this.container = document.createElement('div');
			this.container.classList.add('toast-container', 'p-2');
			document.body.appendChild(this.container);
		}

		// 位置设置
		if (this.container.getAttribute('data-bs-position') === this.Position)
			return this.container;

		this.container.setAttribute('data-bs-position', this.Position);
		this.container.classList.remove(
			'top-0',
			'start-0',
			'bottom-0',
			'end-0',
			'top-50',
			'start-50',
			'translate-middle-x',
			'translate-middle-y',
			'translate-middle'
		);

		switch (this.Position) {
			case 'top-left':
				this.container?.classList.add('top-0', 'start-0');
				break;
			case 'top-center':
				this.container?.classList.add('top-0', 'start-50', 'translate-middle-x');
				break;
			case 'top-right':
				this.container?.classList.add('top-0', 'end-0');
				break;
			case 'middle-left':
				this.container?.classList.add('top-50', 'start-0', 'translate-middle-y');
				break;
			case 'middle-center':
				this.container?.classList.add('top-50', 'start-50', 'translate-middle');
				break;
			case 'middle-right':
				this.container?.classList.add('top-50', 'end-0', 'translate-middle-y');
				break;
			case 'bottom-left':
				this.container?.classList.add('bottom-0', 'start-0');
				break;
			case 'bottom-center':
				this.container?.classList.add('bottom-0', 'start-50', 'translate-middle-x');
				break;
			case 'bottom-right':
				this.container?.classList.add('bottom-0', 'end-0');
				break;
		}

		return this.container;
	}

	/** 创建消息项目 */
	private createToastElement(options: ToastOptions): HTMLDivElement {
		const { title, message, theme } = options;
		const icon = ThemeIcon(theme);

		// 创建 Toast 元素
		const toast = document.createElement('div');
		toast.className = 'toast';

		const header = document.createElement('div');
		header.classList.add('toast-header', `bg-${icon.theme}-lt`);
		toast.appendChild(header);

		// 图标
		const iconName = icon.logo ? getLogo(icon.icon) : getIcon(icon.icon);
		if (iconName) {
			const iconEl = document.createElement('i');
			iconEl.classList.add(iconName);
			header.appendChild(iconEl);
		}

		// 标题
		const text = title ? title : message;
		if (text) {
			const titleEl = document.createElement('strong');
			titleEl.classList.add('me-auto', 'ms-1');
			titleEl.textContent = text;
			header.appendChild(titleEl);
		}

		// 关闭按钮
		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.classList.add('btn-close');
		closeButton.setAttribute('data-bs-dismiss', 'toast');
		closeButton.setAttribute('aria-label', 'Close');
		header.appendChild(closeButton);

		// 消息内容(存在标题时显示)
		if (title && message) {
			const body = document.createElement('div');
			body.classList.add('toast-body');
			body.textContent = message || '';
			toast.appendChild(body);
		}

		return toast;
	}

	private clear() {
		// 清除定时器
		this.timer && clearTimeout(this.timer);

		// 没有不处理
		if (this.toasts.size < 1) return;

		// 清除所有消息
		this.toasts.forEach((el, toast) => {
			if (!toast.isShown()) {
				toast.hide();
				toast.dispose();
				el.remove();

				this.toasts.delete(toast);
			}
		});

		this.timer = setTimeout(() => {
			this.clear();
		}, 1000);
	}

	show(options?: ToastOptions) {
		!hasObject(options) && (options = {});

		const container = this.createContainer();
		const el = this.createToastElement(options);
		container.appendChild(el);

		const delay = options.duration || 0;
		const toast = new Toast(el, { delay, autohide: delay > 0 });
		toast.show();

		// 存储 Toast 实例
		this.toasts.set(toast, el);

		// 清除
		this.clear();

		return toast;
	}

	/** 隐藏所有消息 */
	hideAll() {
		this.toasts.forEach((_, toast) => {
			toast.isShown() && toast.hide();
		});
	}

	// 公共 API
	success(message: string, title?: string, options: Partial<ToastOptions> = {}) {
		this.show({ theme: 'success', message, title, ...options });
	}

	warning(message: string, title?: string, options: Partial<ToastOptions> = {}) {
		this.show({ theme: 'warning', message, title, ...options });
	}

	danger(message: string, title?: string, options: Partial<ToastOptions> = {}) {
		this.show({ theme: 'danger', message, title, ...options });
	}

	info(message: string, title?: string, options: Partial<ToastOptions> = {}) {
		this.show({ theme: 'info', message, title, ...options });
	}

	primary(message: string, title?: string, options: Partial<ToastOptions> = {}) {
		this.show({ theme: 'primary', message, title, ...options });
	}
}

export default ToastService;
