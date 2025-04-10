interface ImportMetaEnv {
	readonly APP_COMPANY: string;
	readonly APP_NAME: string;
	readonly APP_VERSION: string;
	readonly APP_URL: string;
	readonly APP_DESCRIPTION: string;
	readonly APP_KEYWORDS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
