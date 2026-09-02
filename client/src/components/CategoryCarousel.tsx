"use client"

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../state/store"
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { CategoryCardSkeleton } from "./CategoryCardSkeleton"

export const CategoryCarousel: React.FC = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  )

  const categoriesLoading = useSelector(
    (state: RootState) => state.category.isLoading
  )

  const categoriesFetched = useSelector(
    (state: RootState) => state.category.hasFetched
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  /* --------------------------------------------- */
  /* Responsive carousel                           */
  /* --------------------------------------------- */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () =>
      window.removeEventListener("resize", handleResize)
  }, [])

  const categoriesArray = Array.isArray(categories)
    ? categories
    : []

  const showSkeletons =
    categoriesLoading || !categoriesFetched

  const maxIndex = Math.max(
    0,
    categoriesArray.length - itemsPerPage
  )

  /* --------------------------------------------- */
  /* Carousel movement                             */
  /* --------------------------------------------- */

  const scroll = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      if (direction === "left") {
        return Math.max(0, prev - 1)
      }

      return Math.min(maxIndex, prev + 1)
    })
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f7f5]
        py-24
        text-primary-dark

        sm:py-28
        lg:py-32
      "
    >

      {/* ================================================= */}
      {/* BACKGROUND BRAND                                  */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          whitespace-nowrap
          text-[28vw]
          font-black
          leading-none
          tracking-[-0.08em]
          text-black/[0.025]
          select-none
        "
      >
        GIZMO
      </div>


      {/* ================================================= */}
      {/* TOP CONTENT                                       */}
      {/* ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-5

          sm:px-8
          lg:px-14
          xl:px-20
        "
      >

        <div
          className="
            mb-12
            flex
            flex-col
            justify-between
            gap-8

            md:flex-row
            md:items-end
          "
        >

          {/* Heading */}

          <div className="max-w-2xl">

            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span className="h-px w-10 bg-black/30" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-black/40
                "
              >
                Explore
              </span>
            </div>


            <h2
              className="
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.05em]

                sm:text-5xl

                md:text-6xl
              "
            >
              Find your
              <br />

              <span className="font-light italic text-black/40">
                next obsession.
              </span>
            </h2>


            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-6
                text-black/45

                sm:text-base
              "
            >
              Explore our collection of technology,
              entertainment and everyday essentials.
            </p>

          </div>


          {/* Carousel controls */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-5

              md:justify-end
            "
          >

            {/* Counter */}

            <div
              className="
                flex
                items-baseline
                gap-1
                font-mono
                text-xs
                text-black/40
              "
            >
              <span className="text-xl font-medium text-black">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>

              <span>/</span>

              <span>
                {String(Math.max(maxIndex + 1, 1)).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>


            {/* Arrows */}

            <div className="flex gap-2">

              <button
                onClick={() => scroll("left")}
                disabled={currentIndex === 0}
                aria-label="Previous categories"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  text-black
                  shadow-sm
                  transition-all
                  duration-300

                  hover:bg-black
                  hover:text-white

                  disabled:cursor-not-allowed
                  disabled:opacity-25
                  disabled:hover:bg-white
                  disabled:hover:text-black
                "
              >
                <ChevronLeft className="h-4 w-4" />
              </button>


              <button
                onClick={() => scroll("right")}
                disabled={currentIndex === maxIndex}
                aria-label="Next categories"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-black
                  text-white
                  shadow-sm
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:shadow-lg

                  disabled:cursor-not-allowed
                  disabled:opacity-25
                  disabled:hover:translate-y-0
                "
              >
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CAROUSEL                                         */}
        {/* ================================================= */}

        <div className="relative">

          {/* Track */}

          <div className="overflow-hidden">

            <div
              className="
                flex
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)
                  }%)`,
              }}
            >

              {showSkeletons

                ? Array.from({
                  length: itemsPerPage,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-none px-2 sm:px-3"
                    style={{
                      width: `${100 / itemsPerPage}%`,
                    }}
                  >
                    <CategoryCardSkeleton />
                  </div>
                ))

                : categoriesArray.map(
                  (category: any, index: number) => (

                    <div
                      key={category.CategoryId}
                      className="
                          flex-none
                          px-2
                          sm:px-3
                        "
                      style={{
                        width: `${100 / itemsPerPage}%`,
                      }}
                    >

                      {/* ================================= */}
                      {/* CATEGORY CARD                     */}
                      {/* ================================= */}

                      <NavLink
                        to={`Category/${category.CategoryId}`}
                        className="
                            group
                            relative
                            block
                            h-[430px]
                            overflow-hidden
                            rounded-[2rem]
                            bg-black

                            sm:h-[470px]

                            md:h-[500px]
                          "
                      >

                        {/* Image */}

                        <img
                          src={
                            category.Image ||
                            "/placeholder.svg"
                          }
                          alt={
                            category.CategoryName
                          }
                          onError={(event) => {
                            event.currentTarget.onerror =
                              null

                            event.currentTarget.src =
                              "/device-fallback.svg"
                          }}
                          className="
                              absolute
                              inset-0
                              h-full
                              w-full
                              object-cover
                              object-center

                              transition-transform
                              duration-[1200ms]
                              ease-out

                              group-hover:scale-105
                            "
                        />


                        {/* Dark gradient */}

                        <div
                          className="
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black
                              via-black/20
                              to-transparent
                              opacity-90
                            "
                        />


                        {/* Subtle hover wash */}

                        <div
                          className="
                              absolute
                              inset-0
                              bg-black/10
                              opacity-0
                              transition-opacity
                              duration-500

                              group-hover:opacity-100
                            "
                        />


                        {/* Number */}

                        <div
                          className="
                              absolute
                              left-5
                              top-5
                              flex
                              items-center
                              gap-2
                            "
                        >
                          <span
                            className="
                                font-mono
                                text-[10px]
                                tracking-widest
                                text-white/60
                              "
                          >
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span className="h-px w-8 bg-white/30" />
                        </div>


                        {/* Product count */}

                        <div
                          className="
                              absolute
                              right-5
                              top-5
                              rounded-full
                              border
                              border-white/20
                              bg-black/20
                              px-3
                              py-1.5
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.15em]
                              text-white/80
                              backdrop-blur-md
                            "
                        >
                          {category.ProductCount} products
                        </div>


                        {/* Content */}

                        <div
                          className="
                              absolute
                              inset-x-0
                              bottom-0
                              p-6

                              sm:p-8
                            "
                        >

                          <div className="flex items-end justify-between gap-4">

                            <div>

                              <p
                                className="
                                    mb-2
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.25em]
                                    text-white/50
                                  "
                              >
                                Collection
                              </p>


                              <h3
                                className="
                                    text-2xl
                                    font-semibold
                                    leading-none
                                    tracking-[-0.04em]
                                    text-white

                                    sm:text-3xl

                                    md:text-4xl
                                  "
                              >
                                {
                                  category.CategoryName
                                }
                              </h3>


                              <p
                                className="
                                    mt-3
                                    max-w-[280px]
                                    text-xs
                                    leading-5
                                    text-white/55

                                    sm:text-sm
                                  "
                              >
                                {
                                  category.Description
                                }
                              </p>

                            </div>


                            {/* Arrow */}

                            <div
                              className="
                                  flex
                                  h-12
                                  w-12
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-white
                                  text-black
                                  transition-all
                                  duration-500

                                  group-hover:-translate-y-1
                                  group-hover:rotate-45
                                "
                            >
                              <ArrowUpRight
                                className="
                                    h-5
                                    w-5
                                  "
                              />
                            </div>

                          </div>

                        </div>

                      </NavLink>

                    </div>

                  )
                )}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PAGINATION                                       */}
        {/* ================================================= */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            border-black/[0.07]
            pt-5
          "
        >

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-black/30
            "
          >
            Browse categories
          </p>


          <div className="flex items-center gap-1.5">

            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentIndex(index)
                }
                aria-label={`Go to slide ${index + 1
                  }`}
                className={`
                  h-1
                  rounded-full
                  transition-all
                  duration-500

                  ${index === currentIndex
                    ? "w-10 bg-black"
                    : "w-3 bg-black/15 hover:bg-black/30"
                  }
                `}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  )
}