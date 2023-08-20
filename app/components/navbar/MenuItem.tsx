'use client'

interface MenuItemProps {
  onClick: () => void
  label: string
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, className }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-[#ff8a8a5e] first-letter:transition font-bold md:text-xl text-sm ${className}`}
    >
      {label}
    </div>
  )
}

export default MenuItem
