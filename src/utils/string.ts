import { Node } from 'slate'
import { slateDemoSlateToDomConfig, slateToHtml } from 'slate-serializers'

export const getAuthor = (authors: string[]) => {
  const count = authors.length
  if (count === 1) return authors[0]
  if (count > 1) return `${count} authors`
  return '-'
}

export const getFullName = (firstName: string, lastName?: string): string => {
  if (!lastName) return firstName
  return `${firstName} ${lastName}`
}

export const getAvatarName = (fullName: string) => {
  const words = fullName.split(' ')
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
}

export const truncate = (text: string, length: number, separator = '...') => {
  if (text.length <= length) return text
  return text.slice(0, length) + separator
}

export const plural = (count: number, str: string, withCount = true) => {
  return `${withCount ? `${count} ` : ''}${str}${count > 1 ? 's' : ''}`
}

export const parseSlate = (jsonSlate: any[], isFlat = false) => {
  if (isFlat) return jsonSlate.map((n) => Node.string(n)).join('. ')
  return slateToHtml(jsonSlate, slateDemoSlateToDomConfig)
}

export const formatNum = (num: number, digits = 2) => {
  if (num < 1000) return num
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const floor = Math.floor(Math.abs(num).toString().length / 3)
  const value = +(num / 1000 ** floor)
  return value.toFixed(value > 1 ? digits : 2) + units[floor - 1]
}
