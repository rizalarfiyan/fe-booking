export default function ({ addBase, theme }) {
  if (process.env.NODE_ENV === 'production') return

  const screens = theme('screens', {})
  const breakpoints = Object.entries(screens).map(([screen, size]) => ({
    screen,
    size,
    num: Number.parseInt(size.replace('px', '')),
  }))

  breakpoints.sort((a, b) => a.num - b.num)

  addBase({
    'body::after': {
      content: `"< ${screens[breakpoints[0]]}"`,
      position: 'fixed',
      left: '.5rem',
      bottom: '.5rem',
      padding: '.2rem .4rem',
      background: '#edf2f7',
      border: '1px solid #cbd5e0',
      color: 'red',
      fontSize: '.875rem',
      fontWeight: '600',
      zIndex: '99999',
    },
    ...breakpoints.reduce((acc, current) => {
      acc[`@media (min-width: ${current.size})`] = {
        'body::after': {
          content: `"${current.screen}"`,
        },
      }
      return acc
    }, {}),
  })
}
