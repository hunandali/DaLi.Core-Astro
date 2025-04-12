interface ImportMetaEnv {
	/** 企业名称 */
	readonly PUBLIC_APP_COMPANY: string;

	/** 企业网址 */
	readonly PUBLIC_APP_URL: string;

	/** 应用名称 */
	readonly PUBLIC_APP_NAME: string;

	/** 应用版本 */
	readonly PUBLIC_APP_VERSION: string;

	/** 应用描述 */
	readonly PUBLIC_APP_DESCRIPTION: string;

	/** 应用关键词 */
	readonly PUBLIC_APP_KEYWORDS: string;

	/** 应用白名单域名 */
	readonly PUBLIC_APP_WHITELIST_DOMAINS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
