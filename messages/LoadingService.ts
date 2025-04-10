/**
 * LoadingService 全局加载框服务
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

import { hasObject, isString, toDate } from '@da.li/core-libs';
import { getIcon } from '../icons';
import type { LoadingOptions } from '../types';

class LoadingService {
	/** 目标 */
	private _target: string | HTMLElement | undefined = '_TARGET_';
	private _targetElement: HTMLElement | undefined;
	private _targetPosition: string = '';
	private _targetOverflow: string = '';

	/** 加载项目 */
	private _element: HTMLElement | undefined;

	/** 计时器 */
	private _timer: NodeJS.Timeout | undefined;

	/** 计时 */
	private _ticker = 0;

	/** 获取目标节点 */
	private getTargetElement(target: string | HTMLElement | undefined) {
		if (this._target === target && !this._targetElement) return this._targetElement;

		let el: HTMLElement | null = document.body;

		if (isString(target)) {
			el = document.querySelector(target);
		} else if (hasObject(target)) {
			el = (target as HTMLElement) ?? el;
		}

		this._target = target;
		this._targetElement = el || undefined;

		return el;
	}

	/** 创建加载项目 */
	private createElement(options: LoadingOptions) {
		if (!this._element) {
			// 创建 Loading 元素
			const el = document.createElement('div');
			el.className = 'dl-loading';
			el.innerHTML = `
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;

			this._element = el;
		}

		const { theme, mode = 1, message = '加载中...', size = 8, showTime = true } = options;

		echo(options, theme, mode, message, size, showTime);

		const nodeEL = this._element.querySelector('div');
		const iconEL = nodeEL?.children[0] as HTMLElement;
		const titleEL = nodeEL?.children[1] as HTMLElement;
		const timeEL = nodeEL?.children[2] as HTMLElement;

		if (nodeEL) {
			nodeEL.className = '';
			theme && nodeEL.classList.add(`text-${theme}`);
			size > 4 && nodeEL.classList.add(`text-${size}`);
		}

		if (iconEL) {
			iconEL.innerHTML = this.createIcon(mode);
			iconEL.className = '';
			size && iconEL.classList.add(`text-${size}`);
		}

		if (titleEL) {
			titleEL.textContent = message;
			titleEL.style.marginTop = '1rem';
			titleEL.style.fontWeight = 'bold';
			size > 4 && (titleEL.style.fontSize = '60%');
		}

		if (timeEL) {
			timeEL.className = '';
			timeEL.innerHTML = '';
			if (showTime) {
				theme && timeEL.classList.add(`bg-${theme}-lt`, 'code', 'tag');
				size > 4 && (timeEL.style.fontSize = '50%');
				this.updateTimer(timeEL, showTime);
			}
		}

		return this._element;
	}

	/** 清除计时器 */
	private clearTimer(clearTicks = true) {
		// 清除计时器
		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = undefined;
		}

		clearTicks && (this._ticker = 0);
	}

	/** 更新计时器 */
	private updateTimer(el: Element, enabled: boolean) {
		this.clearTimer(false);
		if (!enabled || !el) return;

		this._ticker++;

		const message = `${new Date().toLocaleTimeString()} <i class="opacity-50">/</i> ${toDate(
			this._ticker
		)}`;
		el.innerHTML = message;
		this._timer = setTimeout(() => this.updateTimer(el, enabled), 1000);
	}

	/** 创建图标项目 */
	private createIcon(mode: number) {
		/** 加载图标 */
		let icon = mode < 2 ? 'load_1' : mode < 6 ? `load_${mode}` : 'load_6';
		icon = getIcon(icon);

		if (!icon.startsWith('<svg')) icon = `<i class="${icon}"></i>`;
		return icon;
	}

	/** 显示 */
	show(options?: LoadingOptions) {
		this.clearTimer();

		if (!hasObject(options)) options = {};

		const target = this.getTargetElement(options.target);
		if (!target) return this;

		// 记录位置
		this._targetPosition = target.style.position;
		this._targetOverflow = target.style.overflow;

		target.style.position = 'relative';
		options.lock !== false && (target.style.overflow = 'hidden');

		const loading = this.createElement(options);
		loading.style.display = 'flex';

		// 对于 body 元素，将强制固定
		if (target === document.body) {
			loading.style.position = 'fixed';
		}

		target.append(loading);

		// 延时以便显示动画
		setTimeout(() => {
			loading.classList.add('is-loading');
		}, 300);
		return this;
	}

	/** 隐藏 */
	hide() {
		this.clearTimer();

		const el = this._element;
		if (!el) return;

		const isLoading = el.style.display !== 'none';
		if (!isLoading) return;

		// 还原位置
		if (this._targetElement) {
			this._targetElement.style.position = this._targetPosition;
			this._targetElement.style.overflow = this._targetOverflow;
		}

		el.classList.remove('is-loading');

		// 延时以便显示动画
		setTimeout(() => {
			el.style.display = 'none';
		}, 300);
	}

	/** 注销 */
	dispose() {
		if (this._element) {
			this._element.remove();
			this._element = undefined;
		}
	}
}

export default LoadingService;
