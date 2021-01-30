import React, { useState } from 'react'
import InputWithSearch from '../../components/InputWithSearch'
import { Container, Row, Col } from 'reactstrap'
import { getDeck as getDeckRequest } from '../../services'
export const Home = () => {
  const [card, setCard] = useState(null)
  return (
    <Container>
      <Row>
        <Col>
          <InputWithSearch selectCard={setCard} />
        </Col>
        <hr />
        {
          card && (
            <Col xs={12} md={4}>
              <img src={card.card_images[0]} alt={card.name} />
            </Col>
          )
        }
      </Row>
    </Container>
  )
}

export default Home
