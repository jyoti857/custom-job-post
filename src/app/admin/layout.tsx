import {ClerkProvider} from '@clerk/nextjs'
import AdminNavbar from './AdminNavBar'
export default function Layout({children}: {children: React.ReactNode}) {
  return(
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  )
}