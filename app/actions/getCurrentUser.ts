import { getServerSession } from 'next-auth/next'
import prisma from '@/app/libs/prismadb'
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = (await getSession()) as {
      user: { email: string } | undefined
    }

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (error: any) {
    return null
  }
}
// import { useSession } from 'next-auth/react'
// import prisma from '@/app/libs/prismadb'

// export default async function getCurrentUser() {
//   const { data: session } = useSession({
//     required: true,
//   })
//   const user = await prisma.user.findUnique({
//     where: {
//       email: session?.user?.email as string,
//     },
//   })
//   if (!user) {
//     return session
//   }
//   return user
// }
