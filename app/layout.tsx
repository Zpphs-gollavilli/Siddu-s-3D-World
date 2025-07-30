import { montserrat, poppins } from '@/constant/font'
import '../styles/globals.css';
import Navbar from '../components/Navbar'

export const metadata = {
  title: "Siddu's 3D World",
  description: 'G Siddharth 3D Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} lg:overflow-x-hidden`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
