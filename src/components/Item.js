import React from 'react'
import { useSelector } from 'react-redux'


function Item({ data }) {
 
  return (
    <div className='drop-shadow-2xl bg-yellow-100 font-mono hover:font-semibold hover:text-red-500 text-center cursor-pointer '>
      <h3 className='text-2xl p-10'>{data.setup}</h3>
      <p>{data.punchline}</p>
    </div>
  )
}

export default Item