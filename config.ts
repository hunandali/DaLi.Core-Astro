/**
 * 	config 全局配置文件
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

/** 全局事件名称前缀 */
export const EVENT_PREFIX = 'dali:event:';

/** 全局事件名称生成器 */
const event = (name: string) => `${EVENT_PREFIX}${name}`;

/** 全局事件变量 */
export const EVENTS = {
	COUNTUP: {
		START: event('countup-start'),
		COMPLETE: event('countup-complete')
	}
};
