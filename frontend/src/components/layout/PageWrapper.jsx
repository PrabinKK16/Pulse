import React from 'react'

function PageWrapper({ children }) {
  return (
    <div className='w-full'>
        { children }
    </div>
  )
}

export default PageWrapper