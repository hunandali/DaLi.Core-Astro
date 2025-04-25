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
import { ThemeIcon, updateHTML } from '../libs';
import type { ModalOptions } from '../types';
import { InputMask } from 'imask';
import { createMask } from '../libs/_mask';

/** 对话框集合 */
export const modals = new WeakMap<HTMLElement, Modal>();

/** 当前所有对话框节点 */
export const modalElements = (): HTMLElement[] =>
	Array.from(document.querySelectorAll('div[data-model-message]'));

/** 移除并销毁所有对话框节点 */
export const disponseAll = () => {
	modalElements().forEach((element) => {
		if (modals.has(element)) {
			const modal = modals.get(element);
			// modal?.hide();
			modal?.dispose();
		}

		element.remove();
	});
};

/** 创建对话框 */
export default function (options: ModalOptions) {
	if (!hasObject(options)) return;

	const {
		icon: iconName,
		title,
		message,
		theme,
		showClose = true,
		size,
		textCancel = '取消',
		textConfirm = '确定',
		onCancel,
		onOpen,
		onClose,
		onConfirm
	} = options;

	/** 启动前检测，禁止启动则不在执行 */
	if (isFn(onOpen) && onOpen(options) === false) return;

	// logo- 开头的图标为 logo
	// - 表示隐藏图标
	const icon = ThemeIcon(theme);
	if (iconName) {
		icon.icon = iconName;
		icon.logo = iconName && iconName.startsWith('logo-');
	}
	icon.icon = icon.logo ? getLogo(icon.icon) : getIcon(icon.icon);

	let mask: InputMask<any> | undefined;
	let modal: Modal | undefined;
	let element: HTMLElement | undefined;
	let input: HTMLInputElement | undefined;

	/** 销毁 */
	const dispose = () => {
		// 检测是否禁止关闭
		if (isFn(onClose) && onClose(options) === false) return;

		modal?.hide();
		setTimeout(() => {
			if (modal) {
				modal.dispose();
				modal = undefined;
			}
		}, 500);

		if (element) {
			modals.delete(element);
			element.remove();
			element = undefined;
		}
	};

	/** 取消事件，执行取消事件并关闭窗口 */
	const cancelEvent = (e: Event) => {
		if (!showClose) return;
		if (isFn(onCancel) && onCancel(options, e) === false) return;
		dispose();
	};

	/** 确认事件，执行确认事件并关闭窗 */
	const confirmEvent = (e: Event) => {
		if (!isFn(onConfirm)) return dispose();

		// 输入框赋值
		if (options.prompt && input) {
			options.value = mask ? mask.unmaskedValue : input.value;
		}

		onConfirm(options, e) !== false && dispose();
	};

	/////////////////////////////////////////////////////////////////////////

	element = document.createElement('div');
	element.setAttribute('tabindex', '-1');
	element.setAttribute('data-model-message', '');
	element.className = 'modal fade';
	size && ['sm', 'lg', 'xl'].includes(size) && element.classList.add(`modal-${size}`);
	// element.addEventListener('hide.bs.modal', closeEvent);
	element.addEventListener('hidePrevented.bs.modal', cancelEvent);
	document.body.appendChild(element);

	const dialogEL = document.createElement('div');
	dialogEL.className = 'modal-dialog modal-dialog-centered';
	dialogEL.setAttribute('role', 'document');
	element.appendChild(dialogEL);

	const contentEL = document.createElement('div');
	contentEL.className = 'modal-content';
	dialogEL.appendChild(contentEL);

	// 创建关闭按钮
	if (showClose) {
		const btnClose = document.createElement('button');
		btnClose.className = 'btn-close';
		btnClose.setAttribute('type', 'button');
		btnClose.setAttribute('aria-label', 'Close');
		btnClose.addEventListener('click', cancelEvent);
		contentEL.appendChild(btnClose);
	}

	// 创建状态区域
	const statusEL = document.createElement('div');
	statusEL.className = `modal-status bg-${icon.theme}`;
	contentEL.appendChild(statusEL);

	// 创建主体内容
	const bodyEL = document.createElement('div');
	bodyEL.className = 'modal-body text-center py-6';
	contentEL.appendChild(bodyEL);

	// 创建图标
	if (icon.icon && icon.icon !== '-') {
		const iconEL = document.createElement('i');
		iconEL.className = `${icon.icon} user-select-none text-${icon.theme} text-14`;
		bodyEL.appendChild(iconEL);
	}

	// 创建标题
	if (title) {
		const titleEL = document.createElement('h2');
		titleEL.className = 'mt-2 mb-4';
		titleEL.innerHTML = updateHTML(title);
		bodyEL.appendChild(titleEL);
	}

	// 创建消息内容
	if (message) {
		const messageEL = document.createElement('div');
		messageEL.className = 'text-secondary';
		messageEL.innerHTML = updateHTML(message);
		bodyEL.appendChild(messageEL);
	}

	// 创建输入区域
	if (options.prompt) {
		const inputArea = document.createElement('div');
		inputArea.className = 'd-flex justify-content-center mt-6';
		bodyEL.appendChild(inputArea);

		// 创建输入框容器
		const inputContainer = document.createElement('div');
		inputContainer.className = 'form-floating w-400';
		inputArea.appendChild(inputContainer);

		// 创建输入框
		input = document.createElement('input');
		input.className = `form-control border-${icon.theme} border-2`;
		input.setAttribute('type', 'text');
		input.setAttribute('autocomplete', 'off');
		input.value = `${options.value || ''}`;
		inputContainer.appendChild(input);

		// 创建标签
		const label = document.createElement('label');
		label.textContent = options.prompt === true ? '请输入' : options.prompt;
		inputContainer.appendChild(label);

		mask = createMask(input, options.mask || '');
	}

	// 创建底部区域
	const footerEL = document.createElement('div');
	footerEL.className = 'modal-footer';
	contentEL.appendChild(footerEL);

	// 创建底部内容容器
	const footerContent = document.createElement('div');
	footerContent.className = 'w-100 text-center';
	footerEL.appendChild(footerContent);

	// 创建按钮行
	const buttonRow = document.createElement('div');
	buttonRow.className = 'row';
	footerContent.appendChild(buttonRow);

	if (showClose) {
		// 创建取消按钮列
		const cancelCol = document.createElement('div');
		cancelCol.className = 'col';
		buttonRow.appendChild(cancelCol);

		// 创建取消按钮
		const btnCancel = document.createElement('button');
		btnCancel.className = 'btn btn-default w-100';
		btnCancel.setAttribute('type', 'button');
		btnCancel.setAttribute('aria-label', 'Close');
		btnCancel.textContent = textCancel;
		btnCancel.addEventListener('click', cancelEvent);
		cancelCol.appendChild(btnCancel);
	}

	// 创建确认按钮列
	const confirmCol = document.createElement('div');
	confirmCol.className = 'col';
	buttonRow.appendChild(confirmCol);

	// 创建确认按钮
	const btnConfirm = document.createElement('button');
	btnConfirm.setAttribute('type', 'button');
	btnConfirm.className = `btn btn-${icon.theme} w-${showClose ? 100 : 50}`;
	btnConfirm.textContent = textConfirm;
	btnConfirm.addEventListener('click', confirmEvent);
	confirmCol.appendChild(btnConfirm);

	modal = new Modal(element, {
		backdrop: 'static',
		keyboard: false, // false 才会触发 hidePrevented.bs.modal
		focus: true
	});

	modals.set(element, modal);
	return modal;
}
