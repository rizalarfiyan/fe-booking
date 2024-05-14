import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import {
  BookOpenText,
  Facebook,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { isExternalUrl } from '@utils/url'

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
        link: 'https://maps.app.goo.gl/kW7MYvGPaeZRcCYA6',
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
        link: '/books?orderBy=latest',
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

const Footer: React.FC = () => {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto'>
        <div className='py-8 lg:flex'>
          <div className='-mx-6 w-full lg:w-2/5'>
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
              <Typography type='small-description' className='mt-2 max-w-sm'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores consequatur corporis eum expedita explicabo nulla
                quia ratione rerum, sunt totam!
              </Typography>
              <div className='mt-6 flex gap-2 text-slate-500 dark:text-slate-400'>
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
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
              {content.map((val, idx) => (
                <div key={idx} className='space-y-4'>
                  <Typography as='h3' variant='h4' className='uppercase'>
                    {val.title}
                  </Typography>
                  <ul className='space-y-2'>
                    {val.content.map(({ title, link, icon: Icon }, idxItem) => {
                      const isExternal = isExternalUrl(link)
                      return (
                        <li key={idxItem} className='flex items-center gap-2'>
                          {Icon && (
                            <Typography type='description' asChild>
                              <Icon className='size-5 flex-shrink-0' />
                            </Typography>
                          )}
                          <Typography type='description' asChild>
                            <Link
                              to={link}
                              className='block flex-1 break-words text-sm hover:underline'
                              target={isExternal ? '_blank' : undefined}
                            >
                              {title}
                            </Link>
                          </Typography>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='border-t py-6 text-center'>
          <Typography as='p'>
            Copyright &copy; {new Date().getFullYear()} Booking - All Rights
            Reserved
          </Typography>
        </div>
      </div>
    </footer>
  )
}

export default Footer
