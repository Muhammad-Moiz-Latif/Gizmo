"use client"

import React, { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { NavLink } from "react-router-dom"

export const CategoryCarousel: React.FC = () => {
  const categories = useSelector((state: RootState) => state.category.categories)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Responsive items per page based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, categories.length - itemsPerPage)

  const scroll = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      if (direction === "left") {
        return Math.max(0, prev - 1)
      }
      return Math.min(maxIndex, prev + 1)
    })
  }

  return (
    <section className="relative w-full h-[34rem] bg-black text-white flex flex-col justify-center overflow-hidden py-6 md:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 font-roboto text-center text-white">
          Explore Our Categories
        </h2>
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className={`absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 text-white backdrop-blur-sm border border-white/20 rounded-full p-2 sm:p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/20"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-2 sm:px-0">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {categories.map((category: any) => (
                <div
                  key={category.CategoryId}
                  className="flex-none px-2 sm:px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="group relative h-[300px] sm:h-[350px] md:h-[400px] w-full overflow-hidden rounded-xl bg-gray-900 shadow-xl border border-white/10">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-10" />

                    {/* Image */}
                    <img
                      src={category.Image || "/placeholder.svg"}
                      alt={category.CategoryName}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-90 transition-all duration-500 ease-in-out h-1/2 group-hover:h-full" />

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end items-center p-4 sm:p-6 transition-all duration-500 ease-in-out">
                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white transform transition-all duration-500 ease-in-out translate-y-0 group-hover:-translate-y-16 sm:group-hover:-translate-y-20">
                        {category.CategoryName}
                      </h3>

                      {/* Description - slides up from bottom */}
                      <p className="text-gray-300 text-xs sm:text-sm opacity-0 transform translate-y-10 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 text-center max-w-full">
                        {category.Description}
                      </p>

                      {/* Button - slides up from bottom with delay */}
                      <NavLink
                        to={`Category/${category.CategoryId}`}
                        className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mt-3 sm:mt-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium opacity-0 transform translate-y-10 transition-all duration-500 delay-100 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        Explore Now
                        <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                      </NavLink>
                    </div>

                    {/* Product Count Badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
                      {category.ProductCount} Products
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 text-white backdrop-blur-sm border border-white/20 rounded-full p-2 sm:p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-white/20"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 sm:mt-4 space-x-1.5 sm:space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

