import React from 'react'
import GrievanceCard from '../components/GrievanceCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SearchFilter'

const HomePage = () => {
  return (
    <div className="relative z-10">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <GrievanceCard />
          </div>
        </div>
      </div>
  )
}

export default HomePage
