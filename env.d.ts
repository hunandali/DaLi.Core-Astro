interface ImportMetaEnv {
	readonly PUBLIC_APP_COMPANY: string;
	readonly PUBLIC_APP_NAME: string;
	readonly PUBLIC_APP_VERSION: string;
	readonly PUBLIC_APP_URL: string;
	readonly PUBLIC_APP_DESCRIPTION: string;
	readonly PUBLIC_APP_KEYWORDS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
