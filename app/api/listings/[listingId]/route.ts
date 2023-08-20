import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
  listingId: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  const { listingId } = params

  if (!currentUser) {
    return NextResponse.json(
      { msg: 'current user not defined!' },
      { status: 404 }
    )
  }

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ msg: 'listing ID not found!' }, { status: 404 })
  }

  const listing = await prisma.listing.delete({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
