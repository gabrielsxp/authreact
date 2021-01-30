import React, { useState, useEffect, useRef } from 'react'
import Loading from '../Loading'
import { searchCard } from '../../services'
import { buildSearch } from '../../helpers'
import { ResultWrapper, CardContainer } from './styles'
const InputWithSearch = ({ selectCard }) => {
  const ref = useRef(null)

  const [text, setText] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [cards, setCards] = useState([])

  useEffect(() => {
    const search = async () => {
      if (text !== '') {
        const cards = await searchCard(buildSearch(text), setIsFetching)
        setCards(cards)
        setShowResults(true)
      } else {
        setShowResults(false)
      }
    }
    search()
  }, [text])

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside (event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowResults(false)
      } else if (text !== '') {
        setShowResults(true)
      } else {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, text])

  const handleSelection = (card) => {
    setShowResults(false)
    selectCard(card)
  }

  return (
    <div ref={ref}>
      <input onChange={({ target }) => setText(target.value)} className='form-control' />
      {
        showResults && (
          <ResultWrapper>
            {
              isFetching
                ? <Loading />
                : cards && cards.length > 0 && cards.map((card) => {
                  return (
                    <CardContainer key={card._id} onClick={() => handleSelection(card)}>
                      <img
                        src={
                        card && card.card_images
                          ? card.card_images[0]
                          : 'https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1605722613/card-back_b4kypq.webp'
                        }
                        alt={card.name}
                      />
                      <p>{card.name}</p>
                    </CardContainer>
                  )
                })
            }
          </ResultWrapper>
        )
      }
    </div>
  )
}

export default InputWithSearch
