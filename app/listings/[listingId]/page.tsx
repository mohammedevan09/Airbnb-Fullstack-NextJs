import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

interface IParams {
  listingId: string
}

const page = async ({ params }: { params: IParams }) => {
  const { listingId } = params

  const listing = await getListingById({ listingId })
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  // console.log(reservations)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState
          title="No exact matches"
          subtitle="Go back and try again!"
        />
      </ClientOnly>
    )
  }
  return (
    <div>
      <ClientOnly>
        <ListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
        />
      </ClientOnly>
    </div>
  )
}

export default page
