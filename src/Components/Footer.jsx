import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t text-center border-gray-300 my-6 py-3'>
       <p>
            &copy; {currentYear} FaceCast Vote. All rights reserved.
       </p>
    </footer>
  )
}

export default Footer