import React from 'react'
import DashboardLeaderboard from '@components/Loaderboard/Dashboard'

const Component: React.FC = () => {
  return (
    <div className=''>
      <DashboardLeaderboard point={6023} total={52} borrow={2} maxBorrow={5} />
      {/*<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>*/}
      {/*  <Card className='col-span-4'>*/}
      {/*    <CardHeader>*/}
      {/*      <CardTitle>Overview</CardTitle>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent className='pl-2'>*/}
      {/*      <Overview />*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*  <Card className='col-span-3'>*/}
      {/*    <CardHeader>*/}
      {/*      <CardTitle>Recent Sales</CardTitle>*/}
      {/*      <CardDescription>You made 265 sales this month.</CardDescription>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      <RecentSales />*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</div>*/}
    </div>
  )
}

export { Component as default }
