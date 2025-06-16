# Resume Theme

一个简单易用的简历主题切换工具。

## 功能特性

- 支持多主题切换
- TypeScript 支持
- 简单易用的 API
- 支持 Nuxt.js 集成

## 安装

```bash
npm install resume-theme
# 或
yarn add resume-theme
# 或
pnpm add resume-theme
```

## 使用方法

### 基础使用

```typescript
import { ThemeName, getCurrentTheme, getThemeList, setTheme } from 'resume-theme'

// 设置主题
setTheme(ThemeName.Default)

// 获取主题列表
const themes = getThemeList()

// 获取当前主题
const currentTheme = getCurrentTheme()
```

### 在 Nuxt.js 中使用

1. 在 `nuxt.config.ts` 中添加配置：

```typescript
export default defineNuxtConfig({
  build: {
    transpile: ['resume-theme']
  }
})
```

2. 在组件中使用：

```vue
<script setup>
import { ThemeName, setTheme } from 'resume-theme'

onMounted(() => {
  setTheme(ThemeName.Default)
})
</script>

<template>
  <div :data-resume-theme="getCurrentTheme()">
    <!-- 你的内容 -->
  </div>
</template>
```

## API 文档

### ThemeName

主题名称枚举：

```typescript
enum ThemeName {
  Default = 'default',
  Test = 'test'
}
```

### setTheme(themeName: ThemeName)

设置当前主题。

### getThemeList(): ThemeName[]

获取所有可用的主题列表。

### getCurrentTheme(): ThemeName

获取当前使用的主题。

## 主题开发

1. 在 `src/themes` 目录下创建新的主题目录
2. 在主题目录中创建 `style.scss` 文件
3. 在 `ThemeName` 枚举中添加新的主题名称

## 构建

```bash
# 安装依赖
pnpm install

# 构建
pnpm build
```

## 许可证

MIT
