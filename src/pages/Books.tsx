import type { ISlugTitle } from '@/types/base'
import { Accordion } from '@components/Accordion'
import { buttonVariants } from '@components/Button'
import { Card, CardContent, CardHeader } from '@components/Card'
import FilterCategory from '@components/Filter/Category'
import FilterRating from '@components/Filter/Rating'
import FilterSearch from '@components/Filter/Search'
import FilterSorting from '@components/Filter/Sorting'
import FilterYear from '@components/Filter/Year'
import { ToggleGroup, ToggleGroupItem } from '@components/ToggleGroup'
import { Typography } from '@components/Typograpy'
import { BookOpenText, LayoutGrid, LayoutList, Star, User } from 'lucide-react'
import React, { Suspense } from 'react'
import { Await, Link, defer, useLoaderData } from 'react-router-dom'

interface IBook {
  authors: string[]
  description: string
  height: string
  image: string
  isbn: string
  language: string
  pages: string
  publishedAt: string
  sku: string
  slug: string
  title: string
  weight: string
  width: string
  rating: number
}

interface IPromiseFilter {
  years: Promise<number[]>
  categories: Promise<ISlugTitle[]>
  books: Promise<IBook[]>
}

const Component: React.FC = () => {
  const { years, categories, books } = useLoaderData() as IPromiseFilter

  return (
    <div className='mt-28 mb-20 w-full space-y-4'>
      <Typography as='h1' variant='h2'>
        All Books
      </Typography>
      <div className='flex gap-6'>
        <div className='w-80 space-y-4'>
          <FilterSearch />
          <Accordion type='multiple' className='w-full'>
            <FilterRating />
            <FilterYear years={years} />
            <FilterCategory categories={categories} />
          </Accordion>
        </div>
        <div className='w-full space-y-8'>
          <div className='flex items-center justify-between'>
            <FilterSorting />
            <ToggleGroup
              type='single'
              variant='outline'
              defaultValue='grid'
              className='space-x-1'
            >
              <ToggleGroupItem value='grid' aria-label='Toggle Grid'>
                <LayoutGrid className='size-5' />
              </ToggleGroupItem>
              <ToggleGroupItem value='list' aria-label='Toggle List'>
                <LayoutList className='size-5' />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className=''>
            <Suspense fallback='Loading...'>
              <Await resolve={books} errorElement='Error...'>
                {(books) => (
                  <div className='flex flex-wrap items-center justify-center gap-4'>
                    {books.map((book: IBook) => {
                      const countAuthor = book.authors.length
                      const author =
                        countAuthor === 1
                          ? book.authors[0]
                          : countAuthor > 1
                            ? `${countAuthor} authors`
                            : '-'

                      return (
                        <Link key={book.isbn} to={`book/${book.slug}`}>
                          <Card
                            key={book.isbn}
                            className='group w-full max-w-60 space-y-3 p-4'
                          >
                            <div className='relative aspect-[3/4] h-full w-full cursor-pointer overflow-hidden rounded-md bg-red-500'>
                              <img
                                className='h-full w-full object-fill transition-transform duration-300 group-hover:scale-105'
                                src={book.image}
                                alt={book.title}
                              />
                              <div className='absolute inset-0 flex items-center justify-center bg-primary-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                <div
                                  className={buttonVariants({
                                    size: 'icon',
                                    className: 'size-10 rounded-full',
                                  })}
                                >
                                  <BookOpenText />
                                </div>
                              </div>
                            </div>
                            <CardHeader className='p-0'>
                              <Typography
                                as='h3'
                                className='line-clamp-2 text-lg leading-tight decoration-2 decoration-primary-500 underline-offset-2 group-hover:underline'
                              >
                                {book.title}
                              </Typography>
                            </CardHeader>
                            <CardContent className='flex gap-4 p-0'>
                              <div className='flex gap-1.5'>
                                <User className='size-4 text-slate-500 dark:text-slate-400' />
                                <Typography as='span' type='small-description'>
                                  {author}
                                </Typography>
                              </div>
                              <div className='flex gap-1.5'>
                                <Star className='size-4 text-slate-500 dark:text-slate-400' />
                                <Typography as='span' type='small-description'>
                                  {book.rating}
                                </Typography>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fake data
const categories: ISlugTitle[] = [
  { slug: 'adventure', title: 'Adventure' },
  { slug: 'art', title: 'Art/Photography' },
  { slug: 'autobiography', title: 'Autobiography' },
  { slug: 'biography', title: 'Biography' },
  { slug: 'business', title: 'Business' },
  { slug: 'children', title: "Children's" },
  { slug: 'comedy', title: 'Comedy' },
  { slug: 'comics', title: 'Graphic Novels/Comics' },
  { slug: 'cookbooks', title: 'Cookbooks' },
  { slug: 'crime', title: 'Crime' },
  { slug: 'drama', title: 'Drama' },
  { slug: 'fantasy', title: 'Fantasy' },
  { slug: 'fiction', title: 'Fiction' },
  { slug: 'historical-fiction', title: 'Historical Fiction' },
  { slug: 'horror', title: 'Horror' },
  { slug: 'memoir', title: 'Memoir' },
  { slug: 'mystery', title: 'Mystery' },
  { slug: 'non-fiction', title: 'Non-fiction' },
  { slug: 'philosophy', title: 'Philosophy' },
  { slug: 'poetry', title: 'Poetry' },
  { slug: 'psychology', title: 'Psychology' },
  { slug: 'religion', title: 'Religion/Spirituality' },
  { slug: 'romance', title: 'Romance' },
  { slug: 'science', title: 'Science' },
  { slug: 'science-fiction', title: 'Science Fiction (Sci-Fi)' },
  { slug: 'self-help', title: 'Self-help' },
  { slug: 'suspense', title: 'Suspense' },
  { slug: 'thriller', title: 'Thriller' },
  { slug: 'travel', title: 'Travel' },
]

const fakeYears = async () => {
  const years: number[] = []
  for (let year = new Date().getFullYear(); year >= 1990; year--) {
    years.push(year)
  }

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(years)
    }, 750)
  })
}

const fakeCategories = async () => {
  const sortAscCategories = categories.sort((a, b) => {
    if (a.slug < b.slug) {
      return -1
    }
    if (a.slug > b.slug) {
      return 1
    }
    return 0
  })

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(sortAscCategories)
    }, 1000)
  })
}

const fakeBooks = async () => {
  const books = Array.from({ length: 16 }, (_, idx) => ({
    authors: ['James Clear'],
    rating: 4.5,
    title: `Gadis Kretek ${
      idx + 1
    } Gadis Kretek Gadis Kretek Gadis Kretek Gadis Kretek Gadis Kretek`,
    slug: `gadis-kretek-${idx + 1}`,
    image:
      'https://cdn.gramedia.com/uploads/picture_meta/2023/10/24/qsey9q69mtex5nshhdhjn6.jpg',
    pages: '288',
    weight: '0.2',
    height: '20',
    width: '13.5',
    isbn: '9789792281415',
    sku: '623202035',
    publishedAt: '2023-11-07T17:00:00',
    language: 'Indonesia',
    description:
      'Pak Raja sekarat. Dalam menanti ajal, ia memanggil satu nama perempuan yang bukan istrinya; Jeng Yah. Tiga anaknya, pewaris Kretek Djagad Raja, dimakan gundah. Sang ibu pun terbakar cemburu terlebih karena permintaan terakhir suaminya ingin bertemu Jeng Yah. Maka berpacu dengan malaikat maut, Lebas, Karim, dan Tegar, pergi ke pelosok Jawa untuk mencari Jeng Yah, sebelum ajal menjemput sang Ayah. Perjalanan itu bagai napak tilas bisnis dan rahasia keluarga. Lebas, Karim, dan Tegar bertemu dengan pelinting tua dan menguak asal-usul Kretek Djagad Raja hingga menjadi kretek nomor 1 di Indonesia. Lebih dari itu, ketiganya juga mengetahui kisah cinta ayah mereka dengar; Jeng Yah, yang ternyata adalah pemilik Kretek Gadis, kretek lokal Kota M yang terkenal pada zamannya. Apakah Lebas, Karim, dan Tegar akhirnya berhasil menemukan Jeng Yah?\nGadis Kretek tidak sekadar bercerita tentang cinta dan pencarian jati diri para tokohnya. Dengan latar Kota M, Kudus, Jakarta, dari periode penjajahan Belanda hingga kemerdekaan, Gadis Kretek akan membawa pembaca berkenalan dengan perkembangan industri kretek di Indonesia. Kaya akan wangi tembakau. Sarat dengan aroma cinta.',
  }))

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(books)
    }, 1)
  })
}

const loader = async () => {
  return defer({
    years: fakeYears(),
    categories: fakeCategories(),
    books: fakeBooks(),
  })
}

export { Component as default, loader }
