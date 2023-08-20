'use client'

import { useState, useEffect } from 'react'

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hashMounted, setHashMounted] = useState(false)

  useEffect(() => {
    setHashMounted(true)
  }, [])

  if (!hashMounted) {
    return null
  }

  return <>{children}</>
}

export default ClientOnly
