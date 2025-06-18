/// <reference lib="dom" />

/**
 * 主题名称枚举
 */
export enum ThemeName {
  Default = 'default',
  BlackBarSimplicity = 'blackBarSimplicity',
  NoIcon = 'noIcon',
  BlackToppedSimple = 'blackToppedSimple',
  BlueSimplicity = 'blueSimplicity',
}

/**
 * 获取可用的主题列表
 * @returns {ThemeName[]} 主题名称数组
 */
export function getThemeList(): ThemeName[] {
  return Object.values(ThemeName)
}

/**
 * 设置当前主题
 * @param {ThemeName} themeName 主题名称
 */
export function setTheme(themeName: ThemeName): void {
  const root = document.documentElement
  root.setAttribute('data-resume-theme', themeName)
}

/**
 * 获取当前主题
 * @returns {ThemeName} 当前主题名称
 */
export function getCurrentTheme(): ThemeName {
  const theme = document.documentElement.getAttribute('data-resume-theme')
  return theme as ThemeName || ThemeName.Default
}

export default {
  ThemeName,
  getThemeList,
  setTheme,
  getCurrentTheme,
}
