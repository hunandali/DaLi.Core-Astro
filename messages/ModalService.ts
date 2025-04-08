/**
 * ModalService 模态窗体服务
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

import { hasObject, isFn } from '@da.li/core-libs';
import { Modal } from 'bootstrap';
import { getIcon, getLogo } from '../icons';
import { ThemeIcon } from '../libs';
import type { ModalOptions } from '../types';

class ModalService {
	private _modal: Modal | undefined;
	private _element: HTMLElement | undefined;
	private _events = {
		/** 确认事件，返回 true 关闭窗口 */
		onOk: (_: Event) => true,

		/** 取消事件，返回 false 取消关闭 */
		onCancel: (_: Event) => true,

		/** 打开事件，返回 false 取消打开 */
		onOpen: (_: Event) => true,

		/** 关闭事件，返回 false 取消关闭 */
		onClose: (_: Event) => true
	};

	/** 创建消息项目 */
	private createModal(options: ModalOptions) {
		if (!this._element) {
			// 创建 Modal 元素
			const ModalEL = document.createElement('div');
			ModalEL.className = 'modal fade';
			ModalEL.setAttribute('tabindex', '-1');

			const ModalDialog = document.createElement('div');
			ModalDialog.className = 'modal-dialog modal-sm modal-dialog-centered';
			ModalDialog.setAttribute('role', 'document');

			const ModalContent = document.createElement('div');
			ModalContent.className = 'modal-content';

			ModalContent.innerHTML = `
<button type="button" class="btn-close" aria-label="Close"></button>
<div class="modal-status"></div>
<div class="modal-body text-center py-6">
	<i class="user-select-none text-14"></i>
	<h2 class="mt-2 mb-4"></h2>
	<div class="text-secondary"></div>
</div>
<div class="modal-footer">
	<div class="w-100 text-center">
		<div class="row">
			<div class="col">
				<button type="button" class="btn btn-default w-100" aria-label="Close"></button>
			</div>
			<div class="col">
				<button type="button"></button>
			</div>
		</div>
	</div>
</div>
`;

			const exit = (e: Event) => this._events.onCancel(e) && this.close();
			ModalDialog.appendChild(ModalContent);
			ModalEL.appendChild(ModalDialog);
			ModalEL.addEventListener(
				'hide.bs.modal',
				(e) => this._events.onClose(e) === false && e.preventDefault()
			);
			ModalEL.addEventListener(
				'show.bs.modal',
				(e) => this._events.onOpen(e) === false && e.preventDefault()
			);
			ModalEL.addEventListener('hidePrevented.bs.modal', exit);

			const btns = ModalEL.querySelectorAll('div.modal-footer button');
			btns[0].addEventListener('click', exit);
			btns[1].addEventListener('click', (e) => this._events.onOk(e) && this.close());

			const btnClose = ModalEL.querySelector('button.btn-close');
			btnClose?.addEventListener('click', exit);

			this._element = ModalEL;
		}

		//////////////////////////////////////////////////////////

		const el = this._element.querySelector('div.modal-content') as HTMLDivElement;

		const btnClose = el.querySelector('button.btn-close') as HTMLButtonElement;
		const elStatus = el.querySelector('div.modal-status') as HTMLDivElement;
		const elIcon = el.querySelector('i') as HTMLElement;
		const elTitle = el.querySelector('h2') as HTMLHeadingElement;
		const elMessage = el.querySelector('div.text-secondary') as HTMLDivElement;

		const btns = el.querySelectorAll('div.modal-footer button');
		const btnCancel = btns[0] as HTMLButtonElement;
		const btnOk = btns[1] as HTMLButtonElement;

		//////////////////////////////////////////////////////////

		const {
			icon: iconName,
			title,
			message,
			theme,
			showClose = true,
			textCancel = '取消',
			textOk = '确定',
			onCancel,
			onOpen,
			onClose,
			onOk
		} = options;
		const icon = ThemeIcon(theme);
		if (iconName) {
			icon.icon = iconName;
			icon.logo = false;
		}
		icon.icon = icon.logo ? getLogo(icon.icon) : getIcon(icon.icon);

		this._events.onCancel = (e) => showClose && (!isFn(onCancel) || onCancel(e) !== false);
		this._events.onOk = (e) => !isFn(onOk) || onOk(e) !== false;
		this._events.onClose = (e) => !isFn(onClose) || onClose(e) !== false;
		this._events.onOpen = (e) => !isFn(onOpen) || onOpen(e) !== false;

		//////////////////////////////////////////////////////////

		if (showClose) {
			btnClose.style.display = 'block';
			btnCancel.parentElement!.style.display = 'block';
		} else {
			btnClose.style.display = 'none';
			btnCancel.parentElement!.style.display = 'none';
		}

		elStatus.className = `modal-status bg-${icon.theme}`;
		elIcon.className = `${icon.icon} user-select-none text-${icon.theme} text-14`;
		elTitle.innerHTML = title ?? '';
		elMessage.innerHTML = message ?? '';

		btnCancel.textContent = textCancel;
		btnOk.textContent = textOk;
		btnOk.className = `btn btn-${icon.theme} w-${showClose ? 100 : 50}`;

		//////////////////////////////////////////////////////////

		if (!this._modal) {
			this._modal = new Modal(this._element, {
				backdrop: 'static',
				keyboard: false,
				focus: true
			});
		}

		return this._modal;
	}

	open(options?: ModalOptions) {
		!hasObject(options) && (options = {});

		const model = this.createModal(options);
		model.show();
	}

	close() {
		this._modal?.hide();
	}

	dispose() {
		this._modal?.hide();
		this._modal?.dispose();
		this._element?.remove();
		this._element = undefined;
	}

	// 公共 API
	alert(message: string, title?: string, options: Partial<ModalOptions> = {}) {
		this.open({ theme: 'danger', message, title, showClose: false, ...options });
	}

	// 公共 API
	success(message: string, title?: string, options: Partial<ModalOptions> = {}) {
		this.open({ theme: 'success', message, title, ...options });
	}

	warning(message: string, title?: string, options: Partial<ModalOptions> = {}) {
		this.open({ theme: 'warning', message, title, ...options });
	}

	danger(message: string, title?: string, options: Partial<ModalOptions> = {}) {
		this.open({ theme: 'danger', message, title, ...options });
	}

	info(message: string, title?: string, options: Partial<ModalOptions> = {}) {
		this.open({ theme: 'info', message, title, ...options });
	}

	primary(message: string, title?: string, options: Partial<ModalOptions> = {}) {
		this.open({ theme: 'primary', message, title, ...options });
	}
}

export default ModalService;
