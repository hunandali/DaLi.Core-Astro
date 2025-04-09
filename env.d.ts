interface ImportMetaEnv {
	readonly SITE_NAME: string;
	readonly SITE_URL: string;
	readonly SITE_DESCRIPTION: string;
	readonly SITE_KEYWORDS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
