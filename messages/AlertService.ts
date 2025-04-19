/**
 * AlertService 全局警告信息服务
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

import { ThemeIcon, updateHTML } from '../libs';
import { getIcon, getLogo } from '../icons';
import type { AlertOptions } from '../types';

class AlertService {
	/** 容器 */
	private container: HTMLDivElement | null = null;

	/** 创建容器，存在则使用原来容器 */
	private createContainer() {
		if (!this.container) {
			// 全局搜索
			this.container = document.querySelector('.alert-container');
			if (this.container) return this.container;

			// 创建新的容器
			this.container = document.createElement('div');
			this.container.classList.add('alert-container');
			document.body.appendChild(this.container);
		}

		return this.container;
	}

	/** 创建消息项目 */
	private createAlertElement(options: AlertOptions): HTMLDivElement {
		let { title, message } = options;
		const { icon: iconName, theme: themeName, mini, important, closeable = true } = options;

		const icon = ThemeIcon(themeName);
		const theme = icon.theme;
		icon.icon = iconName ?? icon.icon;
		icon.icon = icon.logo ? getLogo(icon.icon) : getIcon(icon.icon);

		// 如果没有标题，则消息直接作为标题
		if (!title && message) {
			title = message;
			message = '';
		}

		// 创建 Alert 元素
		const alert = document.createElement('div');
		alert.className = 'alert alert-dismissible';
		mini !== false && alert.classList.add('alert-mini');
		important && alert.classList.add('alert-important');
		theme && alert.classList.add(`bg-${icon.theme}-lt`);

		alert.setAttribute('role', 'alert');

		let content = '';

		// 标题
		const iconSize = icon.logo ? (mini ? 5 : 4) : mini ? 4 : 3;
		const fontSize = mini ? 4 : 3;
		content = `<div class="dl-icon user-select-none text-${icon.theme} text-${iconSize} fw-bold"><i class="${icon.icon}"></i><span class="text ms-1 text-${fontSize}">${title}</span></div>`;

		// 消息内容
		const ms = theme === 'secondary' ? '' : ' ps-5';
		message &&
			(content += `<div class="mt-1${ms} text-secondary alert-message">${message}</div>`);

		// 区域
		content = updateHTML(`<div class="d-block">${content}</div>`);

		// 关闭按钮
		closeable &&
			(content = `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>${content}`);

		alert.innerHTML = content;
		return alert;
	}

	show(options: AlertOptions) {
		const container = this.createContainer();
		const el = this.createAlertElement(options);
		container.appendChild(el);
	}

	// 公共 API
	success(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'success', message, title, ...options });
	}

	warning(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'warning', message, title, ...options });
	}

	danger(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'danger', message, title, ...options });
	}

	info(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'info', message, title, ...options });
	}

	primary(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'primary', message, title, ...options });
	}
}

export default AlertService;
