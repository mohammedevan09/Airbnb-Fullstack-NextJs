'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  return (
    <Image
      onClick={() => router.push('/')}
      className="block cursor-pointer"
      width="100"
      height="100"
      alt="Logo"
      src="/images/logo.png"
    />
  )
}

export default Logo
