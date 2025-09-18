'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoHomeOutline, IoGridOutline, IoCartOutline, IoPersonOutline } from 'react-icons/io5'

const navItems = [
  { label: 'Home', icon: IoHomeOutline, href: '/home' },
  { label: 'Category', icon: IoGridOutline, href: '/category' },
  { label: 'MyList', icon: IoCartOutline, href: '/basket' },
  { label: 'Me', icon: IoPersonOutline, href: '/me' },
]

export default function MobileFooter() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 secondbg z-50 md:hidden">
      <div className="flex justify-around items-center h-14">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href
          return (
            <Link key={label} href={href} className="flex flex-col items-center text-xs">
              <Icon size={24} className={`${isActive ? 'text-[#ac68ff]' : 'text-white/70'}`} />
              <span className={`mt-1 ${isActive ? 'text-[#ac68ff]' : 'text-white/70'} font-semibold`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
