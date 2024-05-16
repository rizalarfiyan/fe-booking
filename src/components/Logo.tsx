import React, { forwardRef } from 'react'

const Logo = forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        width={75}
        height={75}
        viewBox='0 0 180 180'
        xmlns='http://www.w3.org/2000/svg'
        ref={ref}
        {...props}
      >
        <path
          d='M310.458 146.5V90.26c-5.841-.029-9.561.391-9.561.391v66.357s32.736-3.731 56.943 11.737c-20.133-19.536-47.382-22.245-47.382-22.245'
          transform='translate(-419.56 -70.333)scale(1.41857)'
          className='fill-primary-600'
        />
        <path
          d='M335.306 138.836v-56.48c-10.743-4.501-19.983-6.008-19.983-6.008v66.358s31.048 5.051 45.508 24.4c-4.251-12.671-25.525-28.27-25.525-28.27'
          transform='translate(-419.56 -70.333)scale(1.41857)'
          className='fill-secondary-300 dark:fill-secondary-100'
        />
        <path
          d='M340.171 69.354v66.358s18.792 13.5 24.848 31.356v-59.252c0-29.671-24.848-38.462-24.848-38.462'
          transform='translate(-419.56 -70.333)scale(1.41857)'
          className='fill-primary-500'
        />
        <path
          d='M410.672 140.969v-51.29c5.841-.029 6.844.539 6.844.539v62.275s-29.907-4.792-48.71 16.252c13.994-24.104 41.866-27.776 41.866-27.776'
          transform='translate(-419.56 -70.333)scale(1.41857)'
          className='fill-primary-600'
        />
        <path
          d='M405.806 71.019v66.3s-34.731 11.893-40.787 29.749v-59.252c0-29.671 40.787-36.797 40.787-36.797M368.805 57.303l5.078 9.284 9.283 5.077-9.283 5.077-5.078 9.284-5.077-9.284-9.284-5.077 9.284-5.077z'
          transform='translate(-419.56 -70.333)scale(1.41857)'
          className='fill-secondary-300 dark:fill-secondary-100'
        />
      </svg>
    )
  },
)

Logo.displayName = 'Logo'

export default Logo
