import React, { useState } from 'react'
import { Typography } from '@components/Typograpy'
import { Button } from '@components/Button'
import { Stars } from '@components/Star'

interface BookDetailProps {
  book: {
    authors: string[]
    rating: number
    title: string
    slug: string
    image: string
    pages: string
    weight: string
    height: string
    width: string
    isbn: string
    sku: string
    publishedAt: string
    language: string
    description: string
  }
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const {
    authors,
    rating,
    title,
    image,
    pages,
    weight,
    height,
    width,
    isbn,
    publishedAt,
    language,
    description,
  } = book

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const getShortDescription = (desc: string) => {
    const charLimit = 500 // Limit character count for short description
    return desc.length > charLimit ? `${desc.slice(0, charLimit)}...` : desc
  }

  return (
    <div className='mx-auto mt-28 mb-20 max-w-4xl space-y-10 p-4'>
      <div className='flex w-full items-start justify-between'>
        <div className='h-full w-1/3 object-fill transition-transform duration-300 group-hover:scale-105'>
          <div className='overflow-hidden rounded-lg shadow-lg'>
            <img src={image} alt={title} className='w-full' />
          </div>
        </div>
        <div className='w-2/3 pl-6'>
          <Typography className='font-bold text-2xl'>{title}</Typography>
          <Typography className='text-gray-600 text-lg'>
            by {authors.join(', ')}
          </Typography>
          <div className='mt-2'>
            <Stars rating={rating} disabled />
          </div>
          <div className='mt-7'>
            <Typography className='font-bold text-xl'>Details</Typography>
            <table className='mt-2 w-full border-collapse'>
              <tbody>
                <tr>
                  <td className='w-1/3 pr-2 align-top font-semibold'>ISBN:</td>
                  <td className='pl-2 align-top'>{isbn}</td>
                </tr>
                <tr>
                  <td className='w-1/3 pr-2 align-top font-semibold'>
                    Publish Date:
                  </td>
                  <td className='pl-2 align-top'>
                    {new Date(publishedAt).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td className='w-1/3 pr-2 align-top font-semibold'>
                    Language:
                  </td>
                  <td className='pl-2 align-top'>{language}</td>
                </tr>
                <tr>
                  <td className='w-1/3 pr-2 align-top font-semibold'>Pages:</td>
                  <td className='pl-2 align-top'>{pages}</td>
                </tr>
                <tr>
                  <td className='w-1/3 pr-2 align-top font-semibold'>
                    Weight:
                  </td>
                  <td className='pl-2 align-top'>{weight} kg</td>
                </tr>
                <tr>
                  <td className='w-1/3 pr-2 align-top font-semibold'>
                    Dimensions:
                  </td>
                  <td className='pl-2 align-top'>
                    {height} cm x {width} cm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button className='mt-3'>Borrow Now!</Button>
        </div>
      </div>
      <div className='my-10 flex flex-col'>
        <Typography className='font-bold text-xl'>Description</Typography>
        <Typography className='mt-2.5 text-justify leading-relaxed'>
          {isExpanded ? description : getShortDescription(description)}
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={toggleDescription}
            className='ml-2 font-semibold text-yellow-600'
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </Typography>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const bookData = {
    authors: ['James Clear'],
    rating: 4.5,
    title: 'Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa',
    slug: 'atomic-habits-perubahan-kecil-yang-memberikan-hasil-luar-bi',
    image:
      'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B600%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&source=url%5Bhttps://prodimage.images-bn.com/pimages/9780735211292_p0_v27_s600x595.jpg%5D&scale=options%5Blimit%5D,size%5B600x10000%5D&sink=format%5Bwebp%5D',
    pages: '352.0',
    weight: '0.37',
    height: '23.0',
    width: '15.0',
    isbn: '9786020633176',
    sku: '619221069',
    publishedAt: '2019-09-15T17:00:00',
    language: 'Indonesia',
    description: `Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa adalah buku kategori self improvement karya James Clear. Pada umumnya, perubahan-perubahan kecil seringkali terkesan tak bermakna karena tidak langsung membawa perubahan nyata pada hidup suatu manusia. Jika diumpamakan sekeping koin tidak bisa menjadikan kaya, suatu perubahan positif seperti meditasi selama satu menit atau membaca buku satu halaman setiap hari mustahil menghasilkan perbedaan yang bisa terdeteksi. Namun hal tersebut tidak sejalan dengan pemikiran James Clear, ia merupakan seorang pakar dunia yang terkenal dengan 'habits' atau kebiasaan. Ia tahu bahwa tiap perbaikan kecil bagaikan menambahkan pasir ke sisi positif timbangan dan akan menghasilkan perubahan nyata yang berasal dari efek gabungan ratusan bahkan ribuan keputusan kecil. Ia menamakan perubahan kecil yang membawa pengaruh yang luar biasa dengan nama atomic habits.
    Dalam buku ini James Clear, seorang penulis sekaligus pembicara yang sangat terkenal akan topik 'habit' memaparkan bahwa pada hakikatnya sebuah perubahan kecil (Atomic Habit) sering dianggap remeh, sebenarnya akan memberikan hasil yang sangat menjanjikan dalam hidup. Yang dipandang penting dalam perubahan perilaku bukan satu persen perbaikan tunggal, melainkan ribuan perbaikan atau sekumpulan atomic habits yang saling bertumpuk dan menjadi unit dasar dalam suatu sistem yang penting.
    James Clear menjelaskan bahwa terdapat tiga tingkat perubahan yaitu perubahan hasil, perubahan proses, dan perubahan identitas. Cara paling efektif dalam mengubah kebiasaan adalah bukan berfokus pada apa yang ingin dicapai, melainkan tipe orang seperti apa yang diinginkan. Identitas seseorang muncul dari kebiasaan yang dilakukan setiap harinya. Alasan utama kebiasaan penting karena kebiasaan dapat mengubah keyakinan tentang diri sendiri.
    Clear juga memperkenalkan empat Kaidah Perubahan Perilaku untuk membantu mengubah perilaku manusia yaitu menjadikannya terlihat, menjadikannya menarik, menjadikannya mudah, menjadikannya memuaskan. Keempat kaidah ini tidak hanya mengajari kita cara menciptakan kebiasaan-kebiasaan baru, melainkan menyingkapi sejumlah wawasan menarik tentang perilaku manusia.`,
  }

  return (
    <div className='App'>
      <BookDetail book={bookData} />
    </div>
  )
}

export default App
