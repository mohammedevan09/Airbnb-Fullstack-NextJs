'use client'

import Container from '../Container'
import Categories from './Categories'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

// import { useSession } from 'next-auth/react'
// import prisma from '@/app/libs/prismadb'

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // console.log(currentUser)
  // function getCurrentUser() {
  //   const { data: session } = useSession({
  //     required: true,
  //   })
  //   // const user = await prisma.user.findUnique({
  //   //   where: {
  //   //     email: session?.user?.email as string,
  //   //   },
  //   // })
  //   if (session) {
  //     console.log(session)
  //   }
  //   // return user
  // }
  // getCurrentUser()
  return (
    <div className="fixed w-full bg-white z-10">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
