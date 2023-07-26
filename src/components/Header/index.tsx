import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'
import SocialList from '../SocialList'

const Header = () => {
  return (
    <div className='header'>
        <div className='headline'>
          <h1><Link href={'/'} >Mesut Tutsak</Link></h1>
          <h2><Link href={'/'} >Frontend Develoepr</Link></h2>
        </div>

        <Navbar />

        <SocialList />
    </div>
  )
}

export default Header