'use client'

import { useUser } from '@clerk/nextjs'
import { IoNotificationsOutline } from 'react-icons/io5'
import SearchBar from '../SearchLists/SearchBar'

export default function WelcomePage() {
    const { user, isLoaded } = useUser()

    if (!isLoaded) return null

    const displayName = user?.firstName || user?.fullName || 'User'

    return (
        <div className="w-full h-fit flex items-center justify-between px-4 py-2 sm:px-10 gap-8">
            <div className="flex flex-col items-start justify-center text-left">
                <h1 className="text-xl lg:text-2xl font-medium text-left flex items-center justify-center gap-2">Welcome
                    <span className="text-xl lg:text-2xl text-left font-semibold selectcolor"> {displayName}</span>
                </h1>
                <h2 className='text-white/70 text-xs lg:text-lg whitespace-nowrap'>Lets Create Grocery List</h2>
            </div>
            <div className='w-full hidden md:block'>
                <SearchBar/>
            </div>
            <div className="selectbg h-10 w-10 shrink-0 flex items-center justify-center rounded-md">
                <IoNotificationsOutline size={24} color="white"/>
            </div>
        </div>
    )
}
