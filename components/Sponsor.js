import React from 'react'

const Sponsor = ({content}) => {
  return (
    <div>
      <section className="w-[300px] h-[382px] md:w-[400px] md:h-[508px] lg:w-[450px] lg:h-[571px] 2xl:w-[22vw] 2xl:h-[28vw] bg-white/8 rounded-2xl backdrop-blur-md shadow-lg">
        {content}
      </section>
    </div>
  )
}

export default Sponsor
