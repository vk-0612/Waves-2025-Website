import React from 'react'

const Sponsor = ({content}) => {
  return (
    <div>
      <section className="w-[300px] h-[400px] bg-white/8 rounded-2xl backdrop-blur-md shadow-lg">
        {content}
      </section>
    </div>
  )
}

export default Sponsor
