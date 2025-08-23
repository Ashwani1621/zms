"use client"
import React, { useState } from 'react'

export const MapSection = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <section className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 min-h-[60vh]">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-3 drop-shadow">Zoo Map</h2>
      <p className="text-gray-700 mb-8 text-center max-w-xl text-lg">
        Explore the layout of our zoo and plan your visit!
      </p>
      <p className="text-gray-700 mb-8 text-center max-w-xl text-lg">
        Click on the map for a closer look.
      </p>
      <br />
      <div className="rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200 bg-white hover:shadow-blue-300 transition-shadow duration-300">
        <img
          src="/zoo_map.png"
          alt="Zoo Map"
          className="w-[500px] h-auto transition-transform duration-300 hover:scale-105 cursor-zoom-in"
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src="/zoo_map.png"
              alt="Zoo Map Large"
              className="max-w-[100vw] max-h-[100vh] rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
