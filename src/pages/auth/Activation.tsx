import Layout from '@layouts/Auth'
import React, { Suspense } from 'react'
import { Button } from '@components/Button'
import { Await, defer, Link, useLoaderData } from 'react-router-dom'
import { Typography } from '@components/Typograpy'
import { BadgeCheck, BadgeX } from 'lucide-react'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { Spinner } from '@components/Spinner'

interface IPromiseFilter {
  state: ReturnType<typeof getActivation>
}

const Component: React.FC = () => {
  const { state } = useLoaderData() as IPromiseFilter

  return (
    <Layout
      title='Activation'
      description='Tapping on the Activation menu initiates the process, unlocking additional features and benefits upon completion.'
      hasBack
      replaceBack
    >
      <Suspense
        fallback={
          <div className='mx-auto flex h-80 w-full max-w-sm items-center justify-center rounded-md bg-slate-200/50'>
            <Spinner size='lg' />
          </div>
        }
      >
        <Await resolve={state} errorElement='Error...'>
          {(state) => (
            <div className='mx-auto max-w-sm space-y-4 py-8 text-center'>
              {state.isSuccess ? (
                <BadgeCheck className='mx-auto size-20 text-emerald-500 dark:text-emerald-400' />
              ) : (
                <BadgeX className='mx-auto size-20 text-red-500 dark:text-red-400' />
              )}
              <Typography
                className='font-semibold dark:text-slate-200'
                type='description'
              >
                {state.message}
              </Typography>
            </div>
          )}
        </Await>
      </Suspense>
      <Button isFluid asChild>
        <Link to='/login' replace>
          Back to Login
        </Link>
      </Button>
    </Layout>
  )
}

interface LoaderProps {
  request: Request
}

const getActivation = async (code: string) => {
  return await alova
    .Post<IBaseResponse, { code: string }>('/v1/auth/activation', { code })
    .then((res) => {
      return {
        isSuccess: true,
        message: res.message,
      }
    })
    .catch((err) => {
      return {
        isSuccess: false,
        message: err.message,
      }
    })
}

const loader = async ({ request }: LoaderProps) => {
  const code = new URL(request.url).searchParams.get('code')

  if (code?.length !== 50) {
    return defer({
      state: {
        isSuccess: false,
        message: 'Invalid activation code',
      },
    })
  }

  return defer({
    state: await getActivation(code),
  })
}

export { Component as default, loader }
