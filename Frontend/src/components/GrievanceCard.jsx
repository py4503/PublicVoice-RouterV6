import React from 'react'
import '../index.css'
function GrievanceCard({complaint}) {
  return (
    <div>
      <div className='flex px-4 py-4 justify-center items-center '>
<div className="flex w-[1338px] bg-white/20 backdrop-filter bg-opacity-10 rounded-2xl shadow-md overflow-hidden hover:shadow-md hover:shadow-white/30 border border-gray-100/20 hover:scale-102 transform transition-transform duration-600">
      {/* Date and Priority Section */}
      <div className="bg-black/40 p-4 flex flex-col items-center justify-around w-35">
        <div className='flex flex-col items-center items-center]:]'>
        <div className="text-white/60 text-lg">Month</div>
        <div className="text-2xl font-bold text-white/60">day</div>
        <div className="text-white/60 text-sm">12:00 PM</div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center justify-center w-[80px] h-[80px] border-10 border-red-500 rounded-full font-[Montserrat]">
            <span className="text-white/60 text-sm font-bold">High</span>
          </div>
        </div>
      </div>

      {/* Complaint Details Section */}
      <div className="p-4 bg- flex flex-col justify-between">
        <h2 className="font-bold text-white/80 text-lg mb-2">Title: <span className='text-white'>Complaint 1</span></h2>
        <details>
  <summary className='list-none text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</summary>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quibusdam dolore, ex aliquam ipsam eligendi minima illo ipsum blanditiis voluptatibus. Commodi velit asperiores ullam, laudantium provident est aut sequi vitae voluptatem. Consequatur porro in quasi aliquid perspiciatis cum, sed consectetur commodi accusamus quos quae quod suscipit beatae corrupti dolorem libero labore nam! Porro in vel, a non assumenda nobis atque modi ea, recusandae, maiores maxime aspernatur illo. Molestias odio debitis, iure quia eum aliquid, blanditiis reprehenderit aperiam corrupti iste provident ab recusandae, error quasi architecto! Suscipit, natus numquam! Eligendi doloribus dolore debitis laudantium voluptates, soluta harum reiciendis nesciunt assumenda modi?
  </p>
</details>

        {/* Additional Info in List Format */}
        <ul className="text-gray-950/90 text-xs flex justify-around py-4 space-y-1">
          <li className='f'>
            <span className="font-bold">Source:</span>
            <div>Twitter</div>
          </li>
          <li>
            <span className="font-bold">Related tags:</span>
            <div>Text 2</div>
          </li>
          <li>
            <span className="font-bold">Type:</span>
            <div>Text 3</div>
          </li>
          <li>
            <span className="font-bold">Department:</span>
            <div>Text 4</div>
          </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  )
}

export default GrievanceCard
