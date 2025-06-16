/// <reference lib="dom" />

/**
 * 获取可用的主题列表
 * @returns {string[]} 主题名称数组
 */
export function getThemeList(): string[] {
  return ['default', 'test']
}

/**
 * 设置当前主题
 * @param {string} themeName 主题名称
 */
export function setTheme(themeName: string): void {
  const root = document.documentElement
  root.setAttribute('data-resume-theme', themeName)
}

/**
 * 获取当前主题
 * @returns {string} 当前主题名称
 */
export function getCurrentTheme(): string {
  return document.documentElement.getAttribute('data-resume-theme') || 'default'
}
