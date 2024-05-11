import { Outlet, useNavigation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  barThickness: 5,
  barColors: {
    '0': '#ff9800',
    '1.0': '#ff9800',
  },
  shadowBlur: 10,
  shadowColor: 'rgba(255, 242, 197, 0.8)',
})

const Layout = () => {
  const navigation = useNavigation()
  return (
    <>
      {navigation.state === 'loading' && <TopBarProgress />}
      <Outlet />
    </>
  )
}

export { Layout as default }
