/**
 * SidebarService  侧边栏服务
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
import { Offcanvas } from 'bootstrap';
import { getIcon, getLogo } from '../icons';
import { ThemeIcon, updateHTML } from '../libs';
import type { SidebarOptions } from '../types';

class SidebarService {
	private _sidebar: Offcanvas | undefined;
	private _showClose: boolean | undefined;

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
	private createSidebar(options: SidebarOptions) {
		let SidebarEL = document.querySelector(
			'div.offcanvas[data-sidebar-service]'
		) as HTMLDivElement;

		if (!SidebarEL) {
			// 创建 Sidebar 元素
			SidebarEL = document.createElement('div');
			SidebarEL.className = 'offcanvas';
			SidebarEL.setAttribute('tabindex', '-1');
			SidebarEL.setAttribute('data-sidebar-service', '');

			SidebarEL.innerHTML = `
<div class="offcanvas-header">
	<h5 class="offcanvas-title"></h5>
	<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body"></div>
<div class="offcanvas-footer">
	<button type="button" class="btn btn-default" aria-label="Close"></button><button type="button"></button>
</div>
`;

			const exit = (e: Event) => this._events.onCancel(e) && this.close();
			SidebarEL.addEventListener(
				'hide.bs.offcanvas',
				(e) => this._events.onClose(e) === false && e.preventDefault()
			);
			SidebarEL.addEventListener(
				'show.bs.offcanvas',
				(e) => this._events.onOpen(e) === false && e.preventDefault()
			);
			SidebarEL.addEventListener('hidePrevented.bs.offcanvas', exit);

			const btns = SidebarEL.querySelectorAll('div.offcanvas-footer button');
			btns[0].addEventListener('click', exit);
			btns[1].addEventListener('click', (e) => this._events.onOk(e) && this.close());

			const btnClose = SidebarEL.querySelector('button.btn-close');
			btnClose?.addEventListener('click', exit);

			document.body.appendChild(SidebarEL);
		}

		//////////////////////////////////////////////////////////

		const elHeader = SidebarEL.querySelector('.offcanvas-header') as HTMLDivElement;
		const btnClose = elHeader.querySelector('button.btn-close') as HTMLButtonElement;
		const elTitle = elHeader.querySelector('h5.offcanvas-title') as HTMLHeadingElement;

		const elMessage = SidebarEL.querySelector('div.offcanvas-body') as HTMLDivElement;

		const elFooter = SidebarEL.querySelector('div.offcanvas-footer') as HTMLDivElement;
		const btns = elFooter.querySelectorAll('button');
		const btnCancel = btns[0] as HTMLButtonElement;
		const btnOk = btns[1] as HTMLButtonElement;

		//////////////////////////////////////////////////////////

		const {
			icon: iconName,
			title,
			message,
			theme,
			placement = 'start',
			showClose = true,
			size,
			textCancel = '取消',
			textOk = '确定',
			onCancel,
			onOpen,
			onClose,
			onOk
		} = options;

		// 参数
		SidebarEL.setAttribute('data-bs-backdrop', showClose === true ? 'true' : 'static');

		// 移除宽度和高度、位置
		const removeClasses: string[] = [];
		SidebarEL.classList.forEach(
			(v) =>
				(v.startsWith('w-') || v.startsWith('h-') || v.startsWith('offcanvas-')) &&
				removeClasses.push(v)
		);
		removeClasses.forEach((v) => SidebarEL.classList.remove(v));

		placement && SidebarEL.classList.add(`offcanvas-${placement}`);

		size &&
			placement &&
			(placement === 'start' || placement === 'end'
				? SidebarEL.classList.add(`w-${size}`)
				: SidebarEL.classList.add(`h-${size}`));

		// logo- 开头的图标为 logo
		// - 表示隐藏图标
		const icon = ThemeIcon(theme);
		if (iconName) {
			icon.icon = iconName;
			icon.logo = iconName && iconName.startsWith('logo-');
		}
		icon.icon = icon.logo ? getLogo(icon.icon) : getIcon(icon.icon);

		this._events.onCancel = (e) => showClose && (!isFn(onCancel) || onCancel(e) !== false);
		this._events.onOk = (e) => !isFn(onOk) || onOk(e) !== false;
		this._events.onClose = (e) => !isFn(onClose) || onClose(e) !== false;
		this._events.onOpen = (e) => !isFn(onOpen) || onOpen(e) !== false;

		//////////////////////////////////////////////////////////

		if (showClose) {
			btnClose.style.display = 'block';
			btnCancel.style.display = 'block';
		} else {
			btnClose.style.display = 'none';
			btnCancel.style.display = 'none';
		}

		if (isFn(onOk)) {
			btnOk.style.display = 'block';
		} else {
			btnOk.style.display = 'none';
		}

		elFooter.style.display =
			btnCancel.style.display === 'none' && btnOk.style.display === 'none' ? 'none' : 'flex';

		if (title) {
			const html = updateHTML(title);
			elTitle.innerHTML = icon.icon
				? `<div class="dl-icon user-select-none text-${icon.theme}"><i class="${icon.icon} text-5"></i><span class="text ms-1">${html}</span></div>`
				: `<div class="user-select-none text-${icon.theme}">${html}</div>`;

			elHeader.style.display = 'block';
		} else {
			elHeader.style.display = 'none';
		}

		if (message) {
			elMessage.innerHTML = updateHTML(message);
			elMessage.style.display = 'block';
		} else {
			elMessage.style.display = 'none';
		}

		btnCancel.textContent = textCancel;
		btnOk.textContent = textOk;
		btnOk.className = `btn btn-${icon.theme}`;

		//////////////////////////////////////////////////////////

		// 展示状态不一致需要先移除旧组件
		if (this._sidebar && this._showClose !== showClose) {
			this._sidebar.dispose();
			this._sidebar = undefined;
		}

		if (!this._sidebar) {
			this._sidebar = new Offcanvas(SidebarEL, {
				backdrop: showClose ? true : 'static',
				keyboard: showClose,
				scroll: false
			});
		}

		return this._sidebar;
	}

	open(options?: SidebarOptions) {
		!hasObject(options) && (options = {});

		const model = this.createSidebar(options);
		model.show();
	}

	close() {
		this._sidebar?.hide();
	}

	dispose() {
		this._sidebar?.hide();
		this._sidebar?.dispose();
	}
}

export default SidebarService;
