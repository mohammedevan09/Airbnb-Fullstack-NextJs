'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { SafeUser } from '@/app/types'

import useFavorite from '../hooks/useFavorite'
import { useState } from 'react'

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
  className?: number
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
  className,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  })
  const [liked, setLiked] = useState(hasFavorited)

  const handleLiked = (e: any) => {
    toggleFavorite(e)
    if (liked) {
      setLiked(false)
    } else {
      setLiked(true)
    }
  }

  return (
    <div
      onClick={handleLiked}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={className || 28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={(className && className - 4) || 24}
        className={liked ? 'fill-rose-500' : 'fill-none'}
      />
    </div>
  )
}

export default HeartButton
