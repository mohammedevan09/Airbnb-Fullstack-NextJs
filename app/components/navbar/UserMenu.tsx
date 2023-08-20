'use client'

import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { SafeUser } from '@/app/types'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-bold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            duration-200
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition duration-200
          "
        >
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={`
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            bg-[#ff9b9b75] 
            backdrop-blur-sm
            overflow-hidden 
            right-3
            md:right-0 
            top-12 
            text-sm
            transition duration-200 ${currentUser ? 'md:w-[83%]' : 'md:w-3/4'}`}
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {' '}
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label="Airbnb your home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut().then(() => toast.success('Log out successfully!'))
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
