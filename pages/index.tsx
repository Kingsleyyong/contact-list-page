import { Inter } from 'next/font/google'
import ContactsPage from './ contacts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
      return (
            <main className={`min-h-screen ${inter.className}`}>
                  <ContactsPage />
            </main>
      )
}
