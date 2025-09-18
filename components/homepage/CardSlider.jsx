'use client'
import { useState, useEffect, useRef } from 'react'

export default function CardSlider() {
  const cards = [
    {
      title: <>Dairy <br /> & Bakery</>,
      example: 'milk, eggs, cheese, yogurt',
      img: '/homepage/dairy&bakery.png',
      button: 'Create List'
    },
    {
      title: <>Snacks <br />& Beverages</>,
      example: 'chips, cookies, juices',
      img: '/homepage/snacks&beverage.png',
      button: 'Create List'
    },
    {
      title: <>Household <br /> Goods</>,
      example: 'detergents, soaps, toilet paper',
      img: '/homepage/household&goods.png',
      button: 'Create List'
    },
    {
      title: <>Fruits <br /> & Vegetables</>,
      example: 'fruits, vegetables, greens',
      img: '/homepage/fruits&vegetables.png',
      button: 'Create List'
    },
    {
      title: <>Cooking <br /> Essentials </>,
      example: 'rice, aata, spices, oil',
      img: '/homepage/cookingessentials.png',
      button: 'Create List'
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const timeoutRef = useRef(null)
  const delay = 2500

  // append first card to end for seamless loop
  const extended = [...cards, cards[0]]

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    // 1) safety reset if we somehow overflow the clone
    if (currentIndex >= extended.length) {
      setIsTransitioning(false)
      setCurrentIndex(0)
      return
    }

    // 2) normal autoplay tick
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((i) => i + 1)
      setIsTransitioning(true)
    }, delay)

    return () => resetTimeout()
  }, [currentIndex, extended.length])

  const onTransitionEnd = () => {
    // when reaching the cloned slide, jump back to start without animation
    if (currentIndex === extended.length - 1) {
      setIsTransitioning(false)
      setCurrentIndex(0)
    }
  }

  return (
    <div className="relative overflow-hidden w-full sm:w-[500px] md:w-[700px] m-auto rounded-lg">
      <div
        className={`flex rounded-lg ${isTransitioning ? 'transition-transform duration-500 ease-linear' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {extended.map((card, idx) => (
          <div key={idx} className="flex-shrink-0 secondbg aspect-video w-full rounded-lg">
            <div className={`h-full ${card.bg} rounded-lg shadow-md p-4 flex justify-center`}>
              <div className="flex flex-1/2">
                <img
                  className="w-full h-full object-center object-contain"
                  src={card.img}
                  alt={typeof card.title === 'string' ? card.title : 'slide image'}
                />
              </div>
              <div className="relative flex flex-col flex-1/2 justfy pl-3 sm:pt-3 sm:pl-5 md:pt-5 md:pl-7">
                <h3 className="selectcolor text-custom-size-on-mobile text-lg sm:text-2xl md:text-4xl font-semibold mb-2 text-left">
                  {card.title}
                </h3>
                <p className="text-xs opacity-80 sm:text-lg">{card.example}</p>
                <button className="absolute bottom-2 right-2 sm:text-lg sm:px-3 sm:py1.5 sm:rounded-lg md:rounded-xl md:text-xl md:px-4 md:py-2 text-white selectbg text-xs rounded-md font-semibold sm:font-medium px-2 py-1 w-fit">
                  {card.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
