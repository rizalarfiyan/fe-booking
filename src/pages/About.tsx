import { Button } from '@components/Button'
import { Card, CardContent, CardHeader } from '@components/Card'
import GraphicAboutInformation from '@components/Graphics/AboutInformation'
import GraphicAboutVision from '@components/Graphics/AboutVision'
import { Typography } from '@components/Typograpy'
import {
  Linkedin,
  Instagram,
  Github,
  Quote,
  BookUp2,
  UserRound,
  Check,
} from 'lucide-react'
import { TitleDescription } from '@components/TitleDescription'
import React from 'react'

const teamMembers = [
  {
    name: 'Muhamad Rizal Arfiyan',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/19503666?v=4',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com/rizalarfiyan',
  },
  {
    name: 'Gilang Nur Hidayat',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/130344101?v=4',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com/glngnoor',
  },
  {
    name: 'Damar Galih',
    role: 'CO & Founder',
    image:
      'https://damar-glh.github.io/me/static/media/Damar.7d80677b81bb3c0271dc.jpg',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com/damar-glh',
  },
  {
    name: 'Ahmad Mufied Nugroho',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/40788381?v=4',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com/ahmad-mufied',
  },
  {
    name: 'Wisnu Kusuma Dewa',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/154528514?v=4',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com/wisnu-kusuma-dewa',
  },
]

const data = {
  hero: {
    title: 'How It Started?',
    quote:
      'Five people with a deep love of reading met and shared the same dream',
    description:
      "Founded in 2024, Booking's mission is to make reading accessible and affordable for everyone. We are committed to providing a diverse selection of books from a variety of genres, ensuring that everyone, regardless of age, background, or budget, can enjoy the benefits and happiness of reading",
    detail: [
      {
        title: '10th',
        description: 'Since Year',
      },
      {
        title: '10k+',
        description: 'Lots of Books',
      },
      {
        title: '50k+',
        description: 'Positive Reviews',
      },
      {
        title: '50k+',
        description: 'Books Borrowed',
      },
    ],
  },
  first: {
    title: 'Social Impact and Community',
    description:
      'Through our flexible and affordable book rental services, we support and empower communities of readers across the country, fostering a love of literacy and building bridges of knowledge that connect diverse individuals and cultures.',
    point: [
      {
        icon: BookUp2,
        title: 'Fostering Literacy',
        description:
          'Our services make reading accessible, fostering a love of literacy in communities.',
      },
      {
        icon: UserRound,
        title: 'Cultural Connection',
        description:
          'We offer diverse books to connect individuals from various cultural backgrounds.',
      },
    ],
  },
  second: {
    title: 'Our Vision',
    description:
      'Our vision is to make books easily accessible and affordable for everyone, fostering a love of reading, enhancing knowledge, and expanding imagination. We provide a diverse selection of books, support reader communities, promote sustainability, and leverage technology to improve our services.',
    point: [
      'Accessible and Affordable Books',
      'Diverse Book Selection',
      'Active Reader Community',
      'Sustainability and Book Sharing',
      'Technology-Enhanced Services',
    ],
  },
}

const Graphic: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='sm:-mx-12 overflow-hidden p-4 md:mx-0 md:w-1/2 md:overflow-visible md:px-0 sm:px-12'>
      <div className='relative bg-gray-100 after:absolute before:absolute after:inset-0 before:inset-0 before:scale-x-110 after:scale-y-110 after:border-gray-200 before:border-gray-200 dark:after:border-gray-700 dark:before:border-gray-700 after:border-x before:border-y dark:bg-gray-800'>
        <div className='flex h-96 items-center justify-center p-10 lg:h-[32rem]'>
          {children}
        </div>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div className='mb-32 space-y-24 lg:space-y-32'>
      <section className='relative flex h-full min-h-dvh w-full items-center bg-muted text-center'>
        <div
          aria-hidden='true'
          className='-space-x-52 absolute inset-0 grid grid-cols-2 opacity-40 dark:opacity-20'
        >
          <div className='h-56 bg-gradient-to-br from-primary-500 to-primary-100 blur-[106px] dark:from-slate-100' />
          <div className='h-32 bg-gradient-to-r from-primary-100 to-primary-500 blur-[106px] dark:to-slate-100' />
        </div>

        <div className='mt-28 mb-20 space-y-14 md:space-y-20'>
          <div className='mx-auto w-full md:w-3/4 xl:w-1/2'>
            <div className='mx-auto mb-8 flex flex-col items-center gap-2'>
              <Typography variant='h4'>{data.hero.title}</Typography>
              <div className='h-1 w-10 rounded bg-primary' />
            </div>
            <Quote className='mb-8 inline-block size-8 text-muted-foreground' />
            <Typography as='h1' className='text-4xl leading-normal lg:text-5xl'>
              {data.hero.quote}
            </Typography>
            <div className='mt-8 mb-6 inline-block h-1 w-10 rounded bg-primary' />
            <Typography type='description' className='leading-snug'>
              {data.hero.description}
            </Typography>
          </div>
          <div className='mx-auto flex max-w-5xl flex-wrap justify-center gap-6 border-y py-8 md:justify-between'>
            {data.hero.detail.map(({ title, description }, index) => (
              <div key={index} className='w-full max-w-32'>
                <Typography as='h2' className='font-bold text-4xl'>
                  {title}
                </Typography>
                <Typography as='p' type='description'>
                  {description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='container flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-6'>
        <div className='flex w-full flex-col justify-center lg:w-1/2'>
          <div className='space-y-8 lg:space-y-12'>
            <div className='space-y-2'>
              <Typography as='h3' className='text-2xl lg:text-3xl'>
                {data.first.title}
              </Typography>
              <Typography as='p' type='description' className='leading-snug'>
                {data.first.description}
              </Typography>
            </div>
            <div className='space-y-6'>
              {data.first.point.map(
                ({ title, description, icon: Icon }, index) => (
                  <div key={index} className='flex items-center gap-6'>
                    <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-3xl border border-primary bg-background'>
                      <Icon className='size-7 text-primary' />
                    </div>
                    <div className='flex-1 space-y-2'>
                      <Typography as='h4' variant='p' className='font-semibold'>
                        {title}
                      </Typography>
                      <Typography as='p' type='description'>
                        {description}
                      </Typography>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <Graphic>
          <GraphicAboutInformation className='h-auto w-full max-w-md' />
        </Graphic>
      </section>

      <section className='container flex flex-col items-center gap-12 lg:flex-row lg:gap-24'>
        <Graphic>
          <GraphicAboutVision className='h-auto w-full max-w-md' />
        </Graphic>
        <div className='flex w-full flex-col justify-center lg:w-1/2'>
          <div className='space-y-8'>
            <div className='space-y-2'>
              <Typography as='h3' className='text-2xl lg:text-3xl'>
                {data.second.title}
              </Typography>
              <Typography as='p' type='description' className='leading-snug'>
                {data.second.description}
              </Typography>
            </div>
            <div className='space-y-6'>
              {data.second.point.map((point, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <div className='flex-shrink-0 rounded-full bg-primary p-1'>
                    <Check className='size-5 text-white' />
                  </div>
                  <Typography
                    as='h4'
                    variant='p'
                    className='flex-1 font-semibold'
                  >
                    {point}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='container space-y-10'>
        <TitleDescription
          title='Get to Know Our Team'
          description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequuntur distinctio saepe sint voluptas?'
        />
        <div className='flex w-full flex-wrap justify-center gap-4'>
          {teamMembers.map(
            ({ role, image, name, linkedin, instagram, github }, idx) => (
              <Card key={idx} className='group'>
                <CardHeader className='p-4'>
                  <div className='aspect-[1/1] h-full w-full max-w-48 overflow-hidden rounded-md bg-muted'>
                    <img
                      className='h-full w-full object-fill grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0'
                      src={image}
                      alt={name}
                    />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4 p-4 pt-0'>
                  <div>
                    <Typography as='h4' className='text-lg'>
                      {name}
                    </Typography>
                    <Typography type='small-description'>{role}</Typography>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Button variant='outline' size='icon' asChild>
                      <a
                        href={linkedin}
                        target='_blank'
                        rel='nofollow noreferrer'
                      >
                        <Linkedin className='size-5' />
                      </a>
                    </Button>
                    <Button variant='outline' size='icon' asChild>
                      <a
                        href={instagram}
                        target='_blank'
                        rel='nofollow noreferrer'
                      >
                        <Instagram className='size-5' />
                      </a>
                    </Button>
                    <Button variant='outline' size='icon' asChild>
                      <a
                        href={github}
                        target='_blank'
                        rel='nofollow noreferrer'
                      >
                        <Github className='size-5' />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

export default About
