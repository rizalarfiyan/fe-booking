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

export const plural = (count: number, str: string) => {
  return `${count} ${str}${count > 1 ? 's' : ''}`
}
