// Cards.tsx
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useState } from 'react'
import Card from './Card'
// import Deck from './Deck'
import { useDispatch } from 'react-redux'
import { updateCoords } from '../redux/locationSlice.ts'
import { Place } from '../redux/locationSlice.ts'
import Chat from './Chat.tsx'

function Cards() {
  const locationData = useSelector((state: RootState) => state.location.places) // Get data from Redux.

  const dispatch = useDispatch()

  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(0)

  function handler(data: Place, index: number) {
    dispatch(updateCoords({ lat: data.lat, lng: data.lng })) // Dispatch new coords
    // Toggle expanded state: if the same card is clicked, collapse it.
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? index : index))
  }

  return (
    <div className="bg-[#191f33] relative w-full">
      <div
        className="absolute top-0 w-full z-10 bg-[#191f33]/50 backdrop-blur-sm border-b-2 border-gray-400  rounded-b-2xl">
        <Chat />
      </div>
      <div className="overflow-auto pt-16 px-2">
        <ul className="grid grid-cols-3">
          {locationData.map((data, index) => (
            <li
              key={index}
              onClick={() => handler(data, index)}
              className={expandedCardIndex === index ? 'col-span-2 row-span-2' : ''}
            >
              <Card data={data} isExpanded={expandedCardIndex === index} />

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Cards
