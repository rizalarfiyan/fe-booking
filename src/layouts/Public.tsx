import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import useTheme from '@hooks/useTheme.ts'
import {
  BookOpenText,
  Facebook,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  Twitter,
  Youtube,
} from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { isExternalUrl } from '@utils/url.ts'

interface FooterItem {
  title: string
  link: string
  icon?: LucideIcon
}

interface FooterContent {
  title: string
  content: FooterItem[]
}

const content: FooterContent[] = [
  {
    title: 'Contact',
    content: [
      {
        title: 'support@booking.com',
        link: 'mailto:support@booking.com',
        icon: Mail,
      },
      {
        title: '+62 8962-2323-2392',
        link: 'tel:0896223232392',
        icon: Phone,
      },
      {
        title: 'DI. Yogyakarta, Indonesia',
        link: 'tel:0896223232392',
        icon: MapPin,
      },
    ],
  },
  {
    title: 'Pages',
    content: [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: 'Guide & Rules',
        link: '/guide-rules',
      },
      {
        title: 'Contact',
        link: '/contact',
      },
      {
        title: 'About',
        link: '/about',
      },
    ],
  },
  {
    title: 'Books',
    content: [
      {
        title: 'All Books',
        link: '/books',
      },
      {
        title: 'Most Pupular',
        link: '/books?orderBy=popular',
      },
      {
        title: 'Best Rating',
        link: '/books?orderBy=rating',
      },
      {
        title: 'New Books',
        link: '/books?orderBy=newest',
      },
    ],
  },
  {
    title: 'Buy Books',
    content: [
      {
        title: 'Gramedia',
        link: 'https://gramedia.com',
      },
      {
        title: 'Open Trolley',
        link: 'https://opentrolley.co.id',
      },
      {
        title: 'Periplus',
        link: 'https://periplus.com',
      },
      {
        title: 'Grob Mart',
        link: 'https://grobmart.com',
      },
    ],
  },
]

const Layout: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <div>
      <header className='w-full py-3 border-b fixed bg-background'>
        <div className='container flex justify-between'>
          <div className='flex items-center gap-2'>
            <Typography type='title' asChild>
              <BookOpenText className='size-7' />
            </Typography>
            <Typography as='h1' variant='h3' type='title'>
              Booking
            </Typography>
          </div>
          <div className='flex items-center gap-4'>
            <Button
              size='icon'
              variant='outline'
              className='size-8'
              type='button'
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? (
                <Sun className='size-5' />
              ) : (
                <Moon className='size-5' />
              )}
            </Button>
            <nav>
              <ul className='flex items-center gap-2'>
                <li>
                  <Button variant='secondary' asChild>
                    <Link to='/login'>Login</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild>
                    <Link to='/register'>Register</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className='flex items-center min-h-[calc(100dvh_-_60px)] justify-center'>
        <Outlet />
      </main>
      <footer className='bg-background border-t'>
        <div className='container mx-auto'>
          <div className='lg:flex py-8'>
            <div className='w-full -mx-6 lg:w-2/5'>
              <div className='px-6'>
                <Link to='/'>
                  <div className='flex items-center gap-2'>
                    <Typography type='title' asChild>
                      <BookOpenText className='size-10' />
                    </Typography>
                    <Typography as='h2' variant='h2' type='title'>
                      Booking
                    </Typography>
                  </div>
                </Link>
                <Typography type='detail' className='max-w-sm mt-2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores consequatur corporis eum expedita explicabo nulla
                  quia ratione rerum, sunt totam!
                </Typography>
                <div className='flex mt-6 gap-2 text-slate-500 dark:text-slate-400'>
                  <Button variant='outline' size='icon'>
                    <Facebook className='size-5' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Twitter className='size-5' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Youtube className='size-5' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Linkedin className='size-5' />
                  </Button>
                </div>
              </div>
            </div>
            <div className='mt-6 lg:mt-0 lg:flex-1'>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {content.map((val, idx) => (
                  <div key={idx} className='space-y-4'>
                    <Typography as='h3' variant='h4' className='uppercase'>
                      {val.title}
                    </Typography>
                    <ul className='space-y-2'>
                      {val.content.map(
                        ({ title, link, icon: Icon }, idxItem) => {
                          const isExternal = isExternalUrl(link)
                          return (
                            <li
                              key={idxItem}
                              className='flex items-center gap-2'
                            >
                              {Icon && (
                                <Typography type='detail' asChild>
                                  <Icon className='size-5' />
                                </Typography>
                              )}
                              <Typography type='detail' asChild>
                                <Link
                                  to={link}
                                  className='block text-sm hover:underline'
                                  target={isExternal ? '_blank' : undefined}
                                >
                                  <span>{title}</span>
                                </Link>
                              </Typography>
                            </li>
                          )
                        },
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='text-center py-6 border-t'>
            <Typography as='p'>
              Copyright &copy; {new Date().getFullYear()} Booking - All Rights
              Reserved
            </Typography>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { Layout as default }
