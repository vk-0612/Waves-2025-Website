import React from 'react'
import { useMediaQuery } from './useMediaQuery'

const Sponsor = ({content}) => {
  const isLargeScreen = useMediaQuery("(min-width: calc(115vh + 20vw))");
  return (
    <div className='backdrop-blur-lg'>
      <section className={`sponsor bg-[#d9d9d909] aspect-[1/1.3] ${isLargeScreen? `h-[56vh]`:`h-[28vh]`} rounded-md shadow-lg`}>
        {content}
      </section>
    </div>
  )
}

export default Sponsor
