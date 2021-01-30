import React from 'react'
import { Wrapper } from './styles'

const Loading = () => {
  return (
    <Wrapper>
      <div className='lds-ellipsis'>
        {
          Array.from(new Array(4)).map((_, index) => {
            return <div key={index} />
          })
        }
      </div>
    </Wrapper>
  )
}

export default Loading
