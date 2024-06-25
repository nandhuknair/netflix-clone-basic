import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'





const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Moives</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse By Language</li>

        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="search-icon" className='icons'/>
        <p>Chiledren</p>
        <img src={bell_icon} alt="bell-icon"  className='icons'/>
        <div className="navbar-profile">
            <img src={profile_icon} alt="profile" className='profile'/>
            <img src={caret_icon} alt="caret" />
            <div className='dropdown'>
              <p>Signout on netflix</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
