export const getAuthor = (authors: string[]) => {
  const count = authors.length
  if (count === 1) return authors[0]
  if (count > 1) return `${count} authors`
  return '-'
}
