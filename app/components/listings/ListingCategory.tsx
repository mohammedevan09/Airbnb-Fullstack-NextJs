'use client'

import { IconType } from 'react-icons'

interface ListingCategoryProps {
  icon: IconType
  label: string
  description: string
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-rose-500" />
        <div className="flex flex-col">
          <div className="text-lg font-bold text-rose-500">{label}</div>
          <div className="text-black">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory
