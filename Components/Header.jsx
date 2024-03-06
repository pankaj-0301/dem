import React, { Fragment } from 'react'

const Header = () => {
  return (
   <Fragment>
    <div className=' h-16 flex justify-between px-6 items-center bg-gray-900 uppercase '>
        <div>
            <h1>logo</h1>
        </div>  
        <div className=' flex gap-6 '>
            <div>home</div>
            <div>services</div>
            <div>about us</div>
            <div>contact</div>
        </div>
    </div>
   </Fragment>
  )
}

export default Header