import ChooseBook from '@components/Graphics/ChooseBook'
import LoginFirst from '@components/Graphics/LoginFirst'
import PickingUpBook from '@components/Graphics/PickingUpBook'
import ReadAndEnjoy from '@components/Graphics/ReadAndEnjoy'
import ReturningBook from '@components/Graphics/ReturningBook'
import SuccessBorrowing from '@components/Graphics/SuccessBorrowing'
import { Typography } from '@components/Typograpy'
import { cn } from '@utils/classes'
import { Quote } from 'lucide-react'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@components/Accordion'
import { Accordion } from '@radix-ui/react-accordion'

const hero = {
  title: 'How It Works?',
  quote:
    '“Guidelines and rules pave the way for a seamless library experience.”',
  description:
    'Our library offers a wide selection of books for you to borrow and enjoy. Whether you are a bookworm or a casual reader, we have something for everyone. Here is a step-by-step guide on how to use our library and make the most of your reading experience.',
}

const tag = [
  {
    title: 'Login',
  },
  {
    title: 'Booking',
  },
  {
    title: 'Confirm Booking',
  },
  {
    title: 'Pick Up',
  },
  {
    title: 'Read and Enjoy',
  },
  {
    title: 'Return',
  },
]

const data = [
  {
    title: 'Login Or Register',
    description:
      'Create a new account if you’re a first-time user or log in to your existing account. This step allows you to access our library and manage your book rentals.',
    image: LoginFirst,
  },
  {
    title: 'Choose Book',
    description:
      'Browse through our extensive collection of books across various genres. Select the book you want to borrow by clicking on it.',
    image: ChooseBook,
  },
  {
    title: 'Confirm Booking',
    description:
      'Confirm your selection to complete the borrowing process. You will receive a confirmation message indicating that the book is successfully borrowed.',
    image: SuccessBorrowing,
  },
  {
    title: 'Pick Up Book',
    description:
      'Go to the designated pick-up location provided in your confirmation message. Bring your booking confirmation and any required identification to collect your book.',
    image: PickingUpBook,
  },
  {
    title: 'Read and Enjoy',
    description:
      'Enjoy your borrowed book during the loan period. Take your time to immerse yourself in the reading experience.',
    image: ReadAndEnjoy,
  },
  {
    title: 'Return and Earn Points',
    description:
      'Return the book to the specified location by the due date. Returning on time will earn you reward points, which can be used to level up your badge.',
    image: ReturningBook,
  },
]

const faqs = [
  {
    question: 'How do I create an account?',
    answer:
      'To create an account, click on the register button on the homepage and fill in the required details, including your name, email address, and a secure password. Once you have submitted the form, you will receive a confirmation email. Click on the link provided in the email to activate your account. After activation, you can log in using your email and password to start using our services. If you encounter any issues during registration, our support team is available to assist you.',
  },
  {
    question: 'How do I borrow a book?',
    answer:
      'Borrowing a book from our collection is simple and straightforward. First, browse our extensive catalog to find the book you wish to borrow. You can use the search bar or filter options to narrow down your choices. Once you have selected a book, click on the "Borrow" button. You will be prompted to confirm your booking, and the book will be added to your borrowed items list. You will receive a confirmation message with the due date and borrowing details. Remember to check the availability status, as some books might be on hold or reserved.',
  },
  {
    question: 'What are the return policies?',
    answer:
      'Our return policies are designed to ensure that books are returned in a timely manner so that others can enjoy them as well. Books must be returned by the due date specified in your confirmation message, which you will receive when you borrow the book. If you return the book on time, you will earn reward points that can be used for future borrowing or other perks. Late returns may incur a fine, and repeatedly late returns can affect your borrowing privileges. Always check your account for the due dates and return the books accordingly.',
  },
  {
    question: 'Can I renew a book?',
    answer:
      'Yes, you can renew a book if you need more time to finish reading it. To renew a book, log in to your account and navigate to the "My Borrowed Books" section. Select the book you wish to renew and click on the "Renew" option. The system will check if the book is eligible for renewal, which depends on factors such as whether there are pending reservations for the book. If eligible, your due date will be extended, and you will receive a confirmation message. Keep in mind that there may be a limit on the number of renewals allowed for each book.',
  },
]

const GuideAndRules = () => {
  return (
    <div className='mb-20 space-y-0'>
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
              <Typography variant='h4'>{hero.title}</Typography>
              <div className='h-1 w-10 rounded bg-primary' />
            </div>
            <Quote className='mb-8 inline-block size-8 text-muted-foreground' />
            <Typography as='h1' className='text-4xl leading-normal lg:text-5xl'>
              {hero.quote}
            </Typography>
            <div className='mt-8 mb-6 inline-block h-1 w-10 rounded bg-primary' />
            <Typography type='description' className='leading-snug'>
              {hero.description}
            </Typography>
          </div>
          <div className='mx-auto flex max-w-5xl flex-wrap justify-center gap-6 border-y py-8 md:justify-between'>
            {tag.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-2 rounded-md bg-slate-50 p-4 dark:bg-slate-950'
              >
                <Typography as='h3' className='font-semibold'>
                  {item.title}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='container mx-auto px-6'>
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              'my-14 flex w-full flex-col-reverse items-center gap-12 lg:gap-6',
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
            )}
          >
            <div className='my-12 flex w-full justify-center p-8 lg:w-1/2 lg:items-center lg:justify-center'>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <Typography
                    as='h3'
                    className='mr-4 font-bold text-7xl text-primary'
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <div className='flex flex-col'>
                    <Typography
                      as='h3'
                      className='mb-2 font-semibold text-2xl lg:text-3xl'
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      as='p'
                      type='description'
                      className='text-lg leading-snug'
                    >
                      {item.description}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col justify-center lg:w-1/2'>
              <div className='flex h-96 w-full items-center justify-center'>
                <item.image className='h-full w-full object-contain' />
              </div>
            </div>
          </div>
        ))}
        <Typography as='h2' className='text-center font-bold text-3xl'>
          Frequently Asked Questions
        </Typography>
        <div className='flex items-center justify-center bg-background py-16 text-justify dark:bg-slate-950'>
          <div className='w-full max-w-2xl'>
            <Accordion type='single' collapsible className='space-y-4'>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={index.toString()}
                  className='overflow-hidden rounded-md border'
                >
                  <AccordionTrigger className='relative z-10 flex cursor-pointer items-center justify-between p-4 dark:bg-slate-900'>
                    <Typography as='h3' className='font-semibold text-lg'>
                      {faq.question}
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent className='px-4 py-2 transition-max-height duration-500 ease-in-out dark:bg-slate-800'>
                    <Typography as='p' type='description'>
                      {faq.answer}
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GuideAndRules
