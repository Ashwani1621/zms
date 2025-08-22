import React from 'react'

export const MapSection = () => {
  return (
    <section className="flex flex-col items-center justify-center py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Zoo Map</h2>
      <p className="text-gray-600 mb-6 text-center max-w-xl">
        Explore the layout of our zoo and plan your visit! Click on the map for a closer look.
      </p>
      {/* <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200 bg-white"> */}
        <img
          src="/zoo_map.png"
          alt="Zoo Map"
          className="w-full h-auto transition-transform duration-300 hover:scale-105 cursor-pointer rounded-lg shadow-lg overflow-hidden border border-gray-200 bg-white"
        />
      {/* </div> */}
    </section>
  )
}
