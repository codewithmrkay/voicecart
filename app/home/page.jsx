import CardSlider from '@/components/homepage/CardSlider'
import SearchBar from '@/components/SearchLists/SearchBar'
import WelcomPage from '@/components/welcomepage/welcomePart'
import React from 'react'

function HomePage() { 
  return (
    <div className='relative w-full h-screen flex items-center justify-center flex-col'>
      <div className='absolute top-5 left-0 w-full'>
        <WelcomPage/>
      </div>
      <div className='w-full md:hidden absolute top-20'>
        <SearchBar/>
        {/* <GrocerySearch/> */}
      </div>
      <div className="px-2 sm:px-4 w-full overflow-hidden absolute top-40 md:static">
        <CardSlider/>
      </div>
    </div>
  )
}

export default HomePage