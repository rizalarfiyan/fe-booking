import { Card, CardContent } from '@components/Card'
import GraphicAboutInformation from '@components/Graphic/AboutInformation'
import GraphicAboutVision from '@components/Graphic/AboutVision'
import { Typography } from '@components/Typograpy'
import { Linkedin, Instagram, Github } from 'lucide-react'
import React from 'react'

const teamMembers = [
  {
    name: 'Muhamad Rizal Arfiyan',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/19503666?v=4',
    linkedin: '#',
    instagram: '#',
    github: '#',
  },
  {
    name: 'Gilang Nur Hidayat',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/130344101?v=4',
    linkedin: '#',
    instagram: '#',
    github: '#',
  },
  {
    name: 'Damar Galih',
    role: 'CO & Founder',
    image:
      'https://damar-glh.github.io/me/static/media/Damar.7d80677b81bb3c0271dc.jpg',
    linkedin: '#',
    instagram: '#',
    github: '#',
  },
  {
    name: 'Ahmad Mufied Nugroho',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/40788381?v=4',
    linkedin: '#',
    instagram: '#',
    github: '#',
  },
  {
    name: 'Wisnu Kusuma Dewa',
    role: 'CO & Founder',
    image: 'https://avatars.githubusercontent.com/u/154528514?v=4',
    linkedin: '#',
    instagram: '#',
    github: '#',
  },
]

const About = () => {
  return (
    <div className='space-y-20'>
      <section className='flex h-full min-h-dvh w-full flex-col items-center justify-center px-4 md:px-0'>
        <div className='mt-28 w-full'>
          <div className='flex flex-col-reverse items-center justify-between gap-10 md:flex-row'>
            <div className='max-w-2xl space-y-4'>
              <Typography as='h1' className='font-bold text-4xl'>
                How It Started?
              </Typography>
              <Typography as='h4' className='font-bold text-2xl'>
                Five people with a deep love of reading met and shared the same
                dream
              </Typography>
              <Typography
                as='p'
                className='pt-5 text-justify indent-8 leading-relaxed'
              >
                At Booking, we believe that everyone should have access to a
                world of knowledge, adventure, and imagination through books.
                Founded in 2024, our mission is to make reading accessible and
                affordable for everyone. We understand that reading is a gateway
                to new worlds, providing opportunities for unlimited learning,
                adventure, and dreaming. With a commitment to providing a
                diverse selection of books from a variety of genres, we want to
                ensure that everyone, regardless of age, background, or budget,
                can enjoy the benefits and happiness of reading. Through our
                flexible and affordable book rental services, we are committed
                to supporting and empowering communities of readers across the
                country, fostering a love of literacy, and building bridges of
                knowledge that connect diverse individuals and cultures.
              </Typography>
            </div>
            <GraphicAboutInformation className='order-first h-auto w-full max-w-xl md:order-last' />
          </div>
          <Typography
            as='p'
            className='pt-10 text-justify indent-8 leading-relaxed'
          >
            With backgrounds spanning education, technology, and community
            service, the five of us combined our expertise to create a platform
            that not only provides a wide selection of books but also offers an
            easy and enjoyable experience for users. We care about every detail,
            from curating a diverse book collection to easy pick-ups and easy
            returns. Our vision is to create a community where reading is an
            activity that can be enjoyed by anyone, anytime, and anywhere. We
            are committed to empowering readers across the country, fostering a
            love of literacy, and spreading knowledge through the books we
            provide.
          </Typography>
        </div>
      </section>

      <section className='flex w-full flex-wrap items-center justify-center gap-4 text-center'>
        <Card className='w-full max-w-xs p-5 shadow-lg'>
          <CardContent>
            <Typography as='h2' className='font-bold text-4xl'>
              10th
            </Typography>
            <Typography as='p' type='description'>
              Since Year
            </Typography>
          </CardContent>
        </Card>
        <Card className='w-full max-w-xs p-5 shadow-lg'>
          <CardContent>
            <Typography as='h2' className='font-bold text-4xl'>
              10k+
            </Typography>
            <Typography as='p' type='description'>
              Lots of Books
            </Typography>
          </CardContent>
        </Card>
        <Card className='w-full max-w-xs p-5 shadow-lg'>
          <CardContent>
            <Typography as='h2' className='font-bold text-4xl'>
              50k+
            </Typography>
            <Typography as='p' type='description'>
              Positive Reviews
            </Typography>
          </CardContent>
        </Card>
        <Card className='w-full max-w-xs p-5 shadow-lg'>
          <CardContent>
            <Typography as='h2' className='font-bold text-4xl'>
              50k+
            </Typography>
            <Typography as='p' type='description'>
              Books Borrowed
            </Typography>
          </CardContent>
        </Card>
      </section>

      <section className='flex h-full min-h-screen w-full items-center justify-center py-20'>
        <div className='mx-auto flex flex-col items-center justify-between gap-10 px-5 lg:flex-row'>
          <GraphicAboutVision className='h-auto w-full max-w-xl' />
          <div className='max-w-2xl space-y-6'>
            <Typography as='h2' className='font-bold text-4xl'>
              Our Vision
            </Typography>
            <Typography as='h4' className='font-bold text-2xl'>
              Five people with a deep love of reading met and shared the same
              dream
            </Typography>
            <Typography
              as='p'
              className='pt-5 text-justify indent-8 leading-relaxed'
            >
              Our vision is to create a world where everyone has easy and
              affordable access to books, so they can enjoy the joy of reading,
              increase their knowledge, and expand their imagination without
              limits. Our mission is to provide a diverse selection of books for
              everyone, ensuring that everyone, regardless of age, background,
              or budget, can find books they love. We support an active
              community of readers through events, discussions, and literacy
              initiatives, and offer a user-friendly platform with a simple and
              efficient book rental and return process. We encourage the reuse
              and sharing of books to support sustainability, and hold programs
              and campaigns to increase reading interest and literacy,
              especially in undeserved areas. In addition, we continue to
              improve our services by utilizing the latest technology to provide
              the best experience for users. With this vision and mission, we
              are determined to be a trusted partner in your literacy journey,
              helping you find happiness and knowledge through the world of
              books.
            </Typography>
          </div>
        </div>
      </section>

      <div className='min-h-screen w-full py-20'>
        <div className='container mx-auto'>
          <div className='mx-auto max-w-md space-y-4 text-center'>
            <Typography as='h2' className='font-bold text-4xl'>
              Get to Know Our Team
            </Typography>
          </div>
          <div className='flex w-full flex-wrap justify-center gap-10 pt-10'>
            {teamMembers.map((member, index) => (
              <div key={index} className='max-w-sm'>
                <Card className='border shadow-lg'>
                  <CardContent className='space-y-2 p-6'>
                    <img
                      src={member.image}
                      alt={member.name}
                      className='w-full rounded-lg object-cover grayscale'
                    />
                    <Typography as='h4' className='font-bold text-xl'>
                      {member.name}
                    </Typography>
                    <Typography as='p'>{member.role}</Typography>
                    <div className='flex justify-end space-x-4 pt-4'>
                      <a href={member.linkedin} aria-label='LinkedIn'>
                        <Linkedin className='h-6 w-6' />
                      </a>
                      <a href={member.instagram} aria-label='Instagram'>
                        <Instagram className='h-6 w-6' />
                      </a>
                      <a href={member.github} aria-label='GitHub'>
                        <Github className='h-6 w-6' />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
