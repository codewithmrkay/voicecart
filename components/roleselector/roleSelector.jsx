// components/RoleSelector.jsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoPersonOutline, IoStorefrontOutline } from 'react-icons/io5'
import Cookies from 'js-cookie'

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState(null)
  const router = useRouter()

  // Use useEffect to check for the role cookie on component mount
  useEffect(() => {
    const storedRole = Cookies.get('userRole')
    if (storedRole) {
      if (storedRole === 'customer') {
        router.push('/home')
      } else if (storedRole === 'shopkeeper') {
        router.push('/dashboard')
      }
    }
  }, [router])

  const handleNext = () => {
    if (selectedRole) {
      // Store the selected role in a cookie
      Cookies.set('userRole', selectedRole, { expires: 7 }) // Role will be stored for 7 days
      if (selectedRole === 'customer') {
        router.push('/home')
      } else if (selectedRole === 'shopkeeper') {
        router.push('/dashboard')
      }
    }
  }

  // If a role is found in the cookie, the useEffect will handle the redirect,
  // so we don't need to render the component.
  if (Cookies.get('userRole')) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl md:text-4xl selectcolor font-semibold mb-6">Define Your Role</h2>
      <div className="flex flex-col md:flex-row gap-4 w-[200px] md:w-full max-w-2xl mb-8">
        {/* Customer Card */}
        <div
          onClick={() => setSelectedRole('customer')}
          className={`
            flex-1 aspect-video cursor-pointer rounded-lg p-6 shadow-md shadow-[#8c3dee]
            flex flex-col justify-center items-center hover:bg-[#8c3dee]/50
            ${selectedRole === 'customer' ? 'bg-[#8c3dee]' : 'bg-[#161543]'}
          `}
        >
          <IoPersonOutline size={48} color="white" />
          <p className="text-white text-lg font-semibold ">Customer</p>
        </div>
        {/* Shopkeeper Card */}
        <div
          onClick={() => setSelectedRole('shopkeeper')}
          className={`
            flex-1 aspect-video cursor-pointer rounded-lg p-6 shadow-md shadow-[#8c3dee]
            flex flex-col justify-center items-center hover:bg-[#8c3dee]/50
            ${selectedRole === 'shopkeeper' ? 'bg-[#8c3dee]' : 'bg-[#161543]'}
          `}
        >
          <IoStorefrontOutline size={48} color="white" />
          <p className="text-white text-lg font-semibold">Shopkeeper</p>
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedRole}
        className={`
          px-6 py-2 rounded bg-[#8c3dee] text-white transition
          ${!selectedRole ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8c3dee]'}
        `}
      >
        Next
      </button>
    </div>
  )
}