import React, { Suspense } from 'react'
import { TitleDescription } from '@components/TitleDescription'
import { Clock2, History, LibraryBig } from 'lucide-react'
import { Typography } from '@components/Typograpy'
import { Card, CardContent, CardHeader } from '@components/Card'
import { Button } from '@components/Button'
import { Await, defer, Link, useLoaderData } from 'react-router-dom'
import type { IBookCard } from '@/types/data'
import { Skeleton } from '@components/Skeleton'
import { ErrorMessage } from '@components/ErrorMessage'
import CardBook from '@components/Card/Book'
import useAuth from '@hooks/useAuth'
import WelcomeToBooking from '@components/Graphics/WelcomeToBooking'

const data = {
  hero: {
    subtitle: 'Welcome to Booking',
    description:
      'Embark on a journey of literary exploration with Booking, where every page holds the promise of adventure, knowledge, and inspiration.',
  },
  offer: {
    title: 'What We Offer?',
    description:
      'Discover our wide range of services designed to make reading accessible, enjoyable, and convenient for everyone.',
    contents: [
      {
        title: 'Extensive Book Collection',
        description:
          "Browse thousands of titles across genres, from fiction to children's books.",
        icon: LibraryBig,
      },
      {
        title: 'Easy Borrowing',
        description:
          'A quick and simple borrowing process. Find the book you want, borrow, and enjoy!',
        icon: Clock2,
      },
      {
        title: 'Convenient Returns',
        description:
          "Return books at your nearest public library, so you don't have to worry about a thing.",
        icon: History,
      },
    ],
  },
  books: {
    title: 'Popular Books',
    description:
      'Discover the latest and most popular books in our collection.',
  },
  join: {
    title: 'Join Us Today!',
    description:
      'Join our community and start borrowing books from our extensive collection.',
  },
}

interface IPromiseLanding {
  books: Promise<IBookCard[]>
}

const Component: React.FC = () => {
  const { books } = useLoaderData() as IPromiseLanding
  const { isLoggedIn } = useAuth()

  return (
    <div className='space-y-24 lg:space-y-32'>
      <section className='relative flex h-full min-h-dvh w-full items-center justify-center bg-muted'>
        <div className='container mt-28 mb-20 flex items-center justify-between gap-20'>
          <div className='flex w-full flex-col justify-center lg:w-1/2'>
            <div className='space-y-10'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Typography
                    as='span'
                    className='font-semibold text-primary text-xl lg:text-2xl'
                  >
                    {data.hero.subtitle}
                  </Typography>
                  <Typography
                    as='h1'
                    className='!leading-snug text-4xl lg:text-6xl'
                  >
                    <span>Unlocking </span>
                    <span className='rounded-md bg-primary px-4 py-2 text-white'>
                      World
                    </span>
                    <span>, One </span>
                    <span className='underline decoration-4 decoration-primary underline-offset-4 lg:decoration-[10px]'>
                      Book
                    </span>
                    <span> at a Time</span>
                  </Typography>
                </div>
                <Typography
                  as='p'
                  type='description'
                  className='max-w-sm leading-relaxed'
                >
                  {data.hero.description}
                </Typography>
              </div>
              <Button className='mx-auto px-8 py-6 text-lg' asChild>
                <Link to='/books'>Explore Now</Link>
              </Button>
            </div>
          </div>
          <WelcomeToBooking className='h-auto w-full max-w-2xl' />
        </div>
      </section>

      <section className='container space-y-12 lg:space-y-18'>
        <TitleDescription
          title={data.offer.title}
          description={data.offer.description}
        />
        <div className='mx-auto flex flex-wrap justify-center gap-12'>
          {data.offer.contents.map(
            ({ title, description, icon: Icon }, index) => (
              <Card key={index} className='w-full max-w-72 text-center'>
                <CardHeader className='py-10'>
                  <div className='relative mx-auto flex size-14 flex-shrink-0 items-center justify-center rounded-md bg-primary'>
                    <Icon className='size-7 text-white' />
                    <div className='absolute size-16 rotate-[20deg] rounded-md bg-primary opacity-15 dark:bg-primary-300' />
                    <div className='absolute size-16 rotate-[40deg] rounded-md bg-primary opacity-15 dark:bg-primary-300' />
                  </div>
                </CardHeader>
                <CardContent className='pb-10'>
                  <div className='flex-1 space-y-2'>
                    <Typography as='h2' variant='h4'>
                      {title}
                    </Typography>
                    <Typography as='p' type='description'>
                      {description}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </section>

      <section className='container flex max-w-6xl flex-col items-center space-y-12 lg:space-y-18'>
        <TitleDescription
          title={data.books.title}
          description={data.books.description}
        />
        <Suspense
          fallback={
            <div className='flex w-full flex-wrap justify-center gap-4'>
              {Array.from({ length: 8 }, (_, idx) => {
                return <Skeleton key={idx} className='h-72 w-full max-w-60' />
              })}
            </div>
          }
        >
          <Await
            resolve={books}
            errorElement={<ErrorMessage message="Couldn't load book books" />}
          >
            {(books) => {
              return (
                <div className='flex flex-wrap justify-center gap-4'>
                  {books.map((book: IBookCard, idx: number) => {
                    return <CardBook key={idx} {...book} />
                  })}
                </div>
              )
            }}
          </Await>
        </Suspense>
        <Button className='mx-auto' asChild>
          <Link to='/books?orderBy=popular'>Show More</Link>
        </Button>
      </section>

      <section className='relative z-10 overflow-hidden bg-muted py-20 lg:py-32'>
        <div className='container mx-auto'>
          <div className='relative overflow-hidden'>
            <div className='-mx-4 flex flex-wrap items-stretch'>
              <div className='w-full px-4'>
                <div className='mx-auto flex max-w-4xl flex-col items-center gap-8'>
                  <div className='mx-auto max-w-md space-y-4 text-center'>
                    <Typography as='h2' variant='h1'>
                      {data.join.title}
                    </Typography>
                    <Typography
                      type='description'
                      className='text-lg leading-snug'
                    >
                      {data.join.description}
                    </Typography>
                  </div>
                  {isLoggedIn ? (
                    <Button className='mx-auto px-8 py-6 text-lg' asChild>
                      <Link to='/dashboard'>Go Dashboard</Link>
                    </Button>
                  ) : (
                    <Button className='mx-auto px-8 py-6 text-lg' asChild>
                      <Link to='/login'>Register Now</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-secondary-600 dark:text-secondary-100'>
          <span className='absolute top-0 left-0'>
            <svg
              width={495}
              height={470}
              viewBox='0 0 495 470'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx={55}
                cy={442}
                r={138}
                stroke='currentColor'
                strokeOpacity='0.04'
                strokeWidth={50}
              />
              <circle
                cx={446}
                r={39}
                stroke='currentColor'
                strokeOpacity='0.04'
                strokeWidth={20}
              />
              <path
                d='M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z'
                stroke='currentColor'
                strokeOpacity='0.08'
                strokeWidth={12}
              />
            </svg>
          </span>
          <span className='absolute right-0 bottom-0'>
            <svg
              width={493}
              height={470}
              viewBox='0 0 493 470'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx={462}
                cy={5}
                r={138}
                stroke='currentColor'
                strokeOpacity='0.04'
                strokeWidth={50}
              />
              <circle
                cx={49}
                cy={470}
                r={39}
                stroke='currentColor'
                strokeOpacity='0.04'
                strokeWidth={20}
              />
              <path
                d='M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z'
                stroke='currentColor'
                strokeOpacity='0.06'
                strokeWidth={13}
              />
            </svg>
          </span>
        </div>
      </section>
    </div>
  )
}

const fakeLatestBooks = async () => {
  const books = await import('@dummy/books.json').then((res) => res.default)
  for (let i = books.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[books[i], books[j]] = [books[j], books[i]]
  }

  const recommendation = books.slice(0, 8)
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(recommendation)
    }, 1500)
  })
}

const loader = async () => {
  return defer({
    books: fakeLatestBooks(),
  })
}

export { Component as default, loader }
