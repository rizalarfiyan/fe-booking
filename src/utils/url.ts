export const isExternalUrl = (url: string): boolean => {
  if (url.startsWith('/')) return false
  try {
    const urlHostname = new URL(url).hostname
    const currentHostname = window.location.hostname
    return urlHostname !== currentHostname
  } catch (error) {
    return true
  }
}
