'use client'

import { usePathname } from 'next/navigation'
import MobileFooter from './Mobilefooter'

export default function FooterWrapper() {
  const pathname = usePathname()

  // don’t render footer on the root ("/") page
  if (pathname === '/'||pathname === '/sign-in'||pathname === '/sign-up') return null

  return <MobileFooter />
}
