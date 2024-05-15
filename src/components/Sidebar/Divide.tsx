import { hasRoleNested } from '@utils/check'
import HorizontalLine from '@components/HorizontalLine'
import { Typography } from '@components/Typograpy'
import type { DivideSidebarRole } from '@/types/dashboard'
import SidebarItem from '@components/Sidebar/Item'

const SidebarDivide: React.FC<DivideSidebarRole> = (props) => {
  const { items, role, title } = props

  if (!hasRoleNested(role, items)) return

  return (
    <div className='pt-1 sm:pt-3'>
      <HorizontalLine lineHeight={1} rightOnly className='py-0 pb-2'>
        <Typography as='span' variant='small' type='description'>
          {title}
        </Typography>
      </HorizontalLine>
      <div className='space-y-2'>
        {items.map((item, idx) => {
          return <SidebarItem key={idx} role={role} {...item} />
        })}
      </div>
    </div>
  )
}

export default SidebarDivide
