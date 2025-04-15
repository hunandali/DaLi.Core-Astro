/**
 * directive 指令系统
 * 模仿 Vue 的自定义指令系统，实现类似 v-action 等指令功能
 * 通过 MutationObserver 监听 DOM 变化，自动应用指令
 *
 * 使用方式：
 * 1. 通过 registerAction 注册指令
 * 2. 在 HTML 元素上使用 v-xxx 属性应用指令
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

import { $Global, isFn, SERVERMODE } from '@da.li/core-libs';

/**
 * 指令处理函数类型定义
 * @param el - 应用指令的 HTML 元素
 * @param value - 指令的值
 */
export type DirectiveHandler = (el: HTMLElement, value: string) => void;

/**
 * 指令管理器类 - 单例模式
 * 负责注册、管理和执行自定义指令
 */
export class DirectiveManager {
	/** 单例实例 */
	private static instance: DirectiveManager | null = null;

	/** 存储注册的指令及其处理函数 */
	private directives: Map<string, DirectiveHandler>;

	/** DOM 变化观察器 */
	private observer: MutationObserver;

	/**
	 * 私有构造函数，初始化指令管理器
	 * 创建 MutationObserver 并开始监听 DOM 变化
	 */
	private constructor() {
		this.directives = new Map();
		this.observer = new MutationObserver(this.handleDOMChanges.bind(this));

		this.startObserving();
	}

	/**
	 * 获取 DirectiveManager 单例实例
	 * @returns DirectiveManager 实例
	 */
	public static getInstance(): DirectiveManager {
		if (!DirectiveManager.instance) {
			DirectiveManager.instance = new DirectiveManager();
		}
		return DirectiveManager.instance;
	}

	/**
	 * 开始观察 DOM 变化
	 * 监听 document.body 的子元素变化和属性变化
	 */
	private startObserving() {
		if (SERVERMODE) return;

		// 确保 document.body 已存在
		if (document.body) {
			this.observer.observe(document.body, {
				childList: true, // 监听子节点添加或删除
				subtree: true, // 监听所有后代节点
				attributes: true, // 监听属性变化
				attributeOldValue: false // 不需要记录属性的旧值
			});

			// 如果 body 已加载，初始化检查
			this.processElementDirectives(document.body);
		} else {
			// 如果 body 还未加载，等待 DOMContentLoaded 事件
			document.addEventListener('DOMContentLoaded', () => {
				this.startObserving();
			});
		}
	}

	/**
	 * 处理 DOM 变化
	 * 检测并应用 v- 开头的指令
	 * @param mutations - DOM 变化记录列表
	 */
	private handleDOMChanges(mutations: MutationRecord[]) {
		mutations.forEach((mutation) => {
			echo('mutation', mutation);
			// 处理属性变化
			if (mutation.type === 'attributes') {
				this.processDirective(mutation.target as HTMLElement, mutation.attributeName || '');
			}

			// 处理子节点变化
			else if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
				// 收集所有新增的元素节点
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						this.processElementDirectives(node as HTMLElement);
					}
				});
			}
		});
	}

	/**
	 * 处理单个元素上的所有指令
	 * @param element - 要处理的元素
	 */
	private processElementDirectives(element: HTMLElement) {
		// 确保元素有效
		if (!element) return;

		// 检查元素的所有属性
		if (element.attributes) {
			const attributes = element.getAttributeNames();
			for (let i = 0; i < attributes.length; i++) {
				this.processDirective(element, attributes[i]);
			}
		}

		// 递归处理子元素
		if (!element.children || element.children.length === 0) return;

		// 遍历所有子元素
		for (const child of Array.from(element.children)) {
			this.processElementDirectives(child as HTMLElement);
		}
	}

	/**
	 * 注册指令
	 * @param name - 指令名称（不含 v- 前缀）
	 * @param handler - 指令处理函数
	 * @param immediate - 是否立即应用指令到已存在的元素
	 */
	public registerDirective(name: string, handler: DirectiveHandler, immediate = true) {
		if (name && isFn(handler)) {
			this.directives.set(name, handler);

			// 立即应用指令到已存在的元素
			immediate && this.applyDirectiveToExistingElements(name);
		}
	}

	/**
	 * 将新注册的指令应用到已存在的元素
	 * @param name - 指令名称
	 */
	private applyDirectiveToExistingElements(name: string) {
		if (!document.body || !name) return;

		// 属性
		const attributeName = `v-${name}`;

		// 使用 querySelectorAll 选择所有具有指定属性的元素
		const elements = document.querySelectorAll(`[${attributeName}]`);

		if (elements.length === 0) return;

		elements.forEach((element) => {
			if (element instanceof HTMLElement) {
				const value = element.getAttribute(attributeName);
				this.executeVDirective(element, attributeName, value);
			}
		});
	}

	/**
	 * 执行指令 (注意不检测节点类型，属性名是否空等，请前置操作时做好检测)
	 * @param element - 应用指令的 HTML 元素
	 * @param attributeName - 指令名称（不含 v- 前缀）
	 */
	private processDirective(element: HTMLElement, attributeName: string) {
		if (attributeName.length < 1) return;

		const value = element.getAttribute(attributeName);

		// 处理 @ 指令
		let flag = this.executeOnDirective(element, attributeName, value);
		if (flag) return;

		flag = this.executeVDirective(element, attributeName, value);
		if (flag) return;
	}

	/**
	 * 执行 @ 指令 (注意不检测节点类型，属性名是否空等，请前置操作时做好检测)
	 * @param element - 应用指令的 HTML 元素
	 * @param attributeName - 指令名称（含 @ 前缀）
	 * @param value - 指令的值
	 * @returns ture 操作完成，后续无需再处理；false 操作未完成，后续需要再处理
	 */
	private executeOnDirective(element: HTMLElement, attributeName: string, value: string | null) {
		if (!attributeName.startsWith('@')) return false;
		if (!value) return true;

		// 移除 @ 前缀
		const eventName = `on${attributeName.slice(1)}`;

		// 已经存在事件处理函数，不再处理
		if (element.hasAttribute(eventName)) return true;

		// 创建事件处理函数
		element.setAttribute(eventName, value);

		// 对于点击修改鼠标样式
		if (eventName === 'onclick') {
			element.style.cursor = 'pointer';
		}

		// 移除原始的 @event 属性
		element.removeAttribute(attributeName);
		return true;
	}

	/**
	 * 执行 v- 指令 (注意不检测节点类型，属性名是否空等，请前置操作时做好检测)
	 * @param element - 应用指令的 HTML 元素
	 * @param attributeName - 指令名称（不含 v- 前缀）
	 * @param value - 指令的值
	 * @returns ture 操作完成，后续无需再处理；false 操作未完成，后续需要再处理
	 */
	private executeVDirective(element: HTMLElement, attributeName: string, value: string | null) {
		if (!attributeName.startsWith('v-')) return false;

		// 移除 v- 前缀
		const directiveName = attributeName.slice(2);

		// 获取指令处理函数
		const handler = this.directives.get(directiveName);
		if (!handler) return true;

		// 标记状态，处理过不再处理
		if (element.hasAttribute(`__${directiveName}`)) return true;
		element.setAttribute(`__${directiveName}`, '');

		// 使用try-catch包装处理函数调用，防止单个指令错误影响整个系统
		try {
			// 执行指令处理函数
			handler(element, value || '');
		} catch (error) {
			console.error(`Error executing directive v-${directiveName}:`, error);
		}

		// 移除指令属性
		element.removeAttribute(attributeName);
		return true;
	}

	/**
	 * 销毁指令管理器
	 * 断开 MutationObserver 连接并清空指令列表
	 */
	public destroy() {
		this.observer.disconnect();
		this.directives.clear();
		DirectiveManager.instance = null;
	}
}

/**
 * 导出单例实例
 * 用于在应用中访问指令管理器
 */
export const directiveManager = DirectiveManager.getInstance();

/**
 * 导出注册指令的辅助函数
 * @param name - 指令名称（不含 v- 前缀）
 * @param handler - 指令处理函数
 */
export function registerAction(name: string, handler: DirectiveHandler) {
	directiveManager.registerDirective(name, handler);
}

/** 全局类型申明 */
declare global {
	/** 指令管理器 */
	var directive: DirectiveManager;

	/** 指令管理器 */
	var $v: DirectiveManager;
}

$Global.directive = $Global.$v = directiveManager;
