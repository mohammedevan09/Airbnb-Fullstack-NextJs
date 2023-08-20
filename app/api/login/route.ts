import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const { email, password } = body

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user || !user?.hashedPassword) {
    NextResponse.json({ message: 'user not found!' }, { status: 404 })
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    user?.hashedPassword!
  )

  if (!isCorrectPassword) {
    throw new Error('Invalid credentials')
  }

  return NextResponse.json(user)
}
