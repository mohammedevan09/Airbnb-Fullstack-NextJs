import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import NextAuthSessionProvider from './providers/sessionProvider'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Airbnb',
    template: `%s | Airbnb`,
  },
  description: 'Best hotel renting App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <NextAuthSessionProvider>
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <RegisterModal />
            <LoginModal />
            <Navbar currentUser={currentUser} />
          </NextAuthSessionProvider>
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
