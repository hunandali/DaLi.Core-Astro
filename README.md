# 大沥网络 Astro 公共库

[![NPM Version](https://img.shields.io/npm/v/@da.li/core-astro)](https://www.npmjs.com/package/@da.li/core-astro)
[![License](https://img.shields.io/npm/l/@da.li/core-astro)](https://github.com/woodcoal/DaLi.Core-Astro/blob/main/LICENSE)

## 简介

大沥网络 Astro 公共库是一个基于 Astro 框架的 UI 组件库，提供了一系列基础 UI 组件和工具函数，用于快速构建现代化的网页应用。

## 特性

-   🚀 基于 Astro 5.x 构建
-   💎 提供丰富的 UI 组件
-   🎨 支持主题定制
-   📦 支持按需加载
-   🛠️ TypeScript 支持

## 安装

```bash
npm install @da.li/core-astro
```

## 使用方法

1. 在 `astro.config.ts` 中配置插件：

```typescript
import { defineConfig } from 'astro/config';
import dali from '@da.li/core-astro';

export default defineConfig({
	integrations: [dali()]
});
```

2. 在组件中使用：

```astro
---
import { Button } from '@da.li/core-astro/components';
---

<Button>点击我</Button>
```

## 组件列表

### 基础组件

-   Avatar - 头像组件
-   Badge - 徽章
-   Button - 按钮
-   Card - 卡片
-   Divider - 分割线
-   Empty - 空状态
-   Icon - 图标
-   Progress - 进度条
-   Spinner - 加载动画
-   Status - 状态标识
-   Switch - 开关
-   Timeline - 时间线
-   Tooltip - 文字提示

### 交互组件

-   Carousel - 轮播
-   Countup - 数字动画
-   Dropcard - 下拉卡片
-   Dropdown - 下拉菜单
-   Modal - 模态框
-   Toast - 消息提示

## 许可证

本项目基于 [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) 许可证开源。
