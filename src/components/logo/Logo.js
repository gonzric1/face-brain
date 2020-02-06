import React from 'react'
import logo from './logo.png'

function Logo() {
    return (
        <div className='ma4 mt3 center'>
            <div className="">
                <img alt="facebrain logo" src={logo} />
            </div>
            <div className="center">
                <h1 className="light-blue">Enter a picture to detect faces</h1>
            </div>
        </div>
    )
}

export default Logo
