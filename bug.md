# 关于 dayjs 打包后使用报错的问题

当使用 `import dayjs from 'dayjs'` 方式导入 dayjs 时，发布的包在其他 Astro 项目中使用时会报错。
只有使用 `import * as dayjs from 'dayjs'` 方式导入 dayjs 时，发布的包在其他 Astro 项目中使用时才不会报错。
但是使用 `import * as dayjs from 'dayjs'` 方法在项目打包时则会提示异常。需要在 tsconfig.json 中添加以下配置：

```json
"compilerOptions": {
	"esModuleInterop": false,
	"allowSyntheticDefaultImports": false
}
```

参考：https://day.js.org/docs/zh-CN/installation/typescript
