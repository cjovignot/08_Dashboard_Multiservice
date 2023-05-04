import Image from 'next/image';
import { Inter } from 'next/font/google';

import NavBar from '../components/navbar';
import Frame from '../components/widget_frame';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="bg-white">
      <NavBar />
      <Frame />
    </div>
  )
}
