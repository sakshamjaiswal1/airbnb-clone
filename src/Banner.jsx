import React from 'react'
import './Banner.css'
import { Button } from '@material-ui/core'
import { useState } from 'react'

function Banner() {
    const [showSearch,setShowSearch]=useState(false)
    return (
        <div className='banner'>
            <div className="banner__search">
                {showSearch &&
                <Button variant='outlined' className='banner__searchButton'>Search Dates</Button>}
            </div>
       <div className="banner__info">
           <h1>Get out and strect your imagination</h1>
           <h5>Plan a different kind of gateway to uncover the hidden gems near you</h5>
           <Button variant='outlined'>Explore Nearby</Button>
       </div>
        </div>
    )
}

export default Banner
