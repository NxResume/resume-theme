import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { rmSync } from 'node:fs'
import { defineBuildConfig } from 'unbuild'
import sass from 'sass'
import fs from 'fs-extra'

// 编译 SCSS 文件
async function compileScss(input: string, output: string, themeName: string) {
  // 读取原始 SCSS 内容
  const content = await readFile(input, {
    encoding: 'utf-8',
  })

  // 包装在 data-resume-theme 选择器中
  const wrappedContent = `[data-resume-theme="${themeName}"] {\n${content}\n}`

  // 编译 SCSS
  const result = sass.compileString(wrappedContent, {
    style: 'compressed',
    loadPaths: ['src'],
  })

  // 写入编译后的 CSS
  await writeFile(output, result.css)
}

// 遍历主题文件夹并编译
async function compileThemes() {
  const themesDir = resolve('src/themes')
  const entries = await readdir(themesDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const themeName = entry.name
      const styleFile = join(themesDir, themeName, 'style.scss')
      const outputDir = resolve('dist/themes', themeName)

      try {
        // 确保主题输出目录存在
        await mkdir(outputDir, { recursive: true })

        await compileScss(
          styleFile,
          join(outputDir, 'style.css'),
          themeName,
        )
      }
      catch (error) {
        console.warn(`Warning: Could not compile theme ${themeName}:`, error)
      }
    }
  }
}

async function generateThemeIndex() {
  const themesDir = resolve('src/themes')
  const entries = await readdir(themesDir, { withFileTypes: true })

  // 生成完整的 index.scss 内容，确保 @use 在最前面
  const content = '@use \'./common\' as *;'
  // 写入文件
  await writeFile(resolve('dist/themes/index.scss'), content)

  // 编译 SCSS 为 CSS
  const result = sass.compileString(content, {
    style: 'compressed',
    loadPaths: ['src/themes'],
  })

  // 获取所有主题目录
  const themes = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  const imports = themes
    .map(theme => `@import url('./${theme}/style.css');`)
    .join('\n')

  // 写入编译后的 CSS
  await writeFile(resolve('dist/themes/index.css'), `${result.css}${imports}`)
}

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: false,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    'build:prepare': async () => {
      // 先移除原有的dist
      await rmSync('dist', { recursive: true, force: true })

      // 确保 dist 目录存在
      await mkdir('dist', { recursive: true })
      await mkdir('dist/themes', { recursive: true })

      // 复制 assets 目录
      await fs.copy('src/assets', 'dist/assets')

      // 编译所有主题
      await compileThemes()

      // 生成并编译主题索引文件
      await generateThemeIndex()
    },
  },
})
