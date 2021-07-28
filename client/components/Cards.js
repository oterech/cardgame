import React from 'react'
import {connect} from 'react-redux'
import { allCards, fetchCards } from '../store/cards'

/**
 * COMPONENT
 */
class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player: {
                hand: []
            },
            computer: {
                hand: []
            }
        }
        
    }

async componentDidMount() {
   await this.props.getCards()
   const cards = this.props.cards

   for(let i = cards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = cards[i]
    cards[i] = cards[j]
    cards[j] = temp
  }
  console.log(cards)
  const playerHand = cards.slice(0, 27)
  const computerHand = cards.slice(27)
  this.setState({player: {hand: playerHand}, computer: {hand: computerHand}})
}
render() {
    const cards = this.props.cards || []
    console.log(this.state)
    console.log(this.props)
  return (
      
    <div>
      <h3>All The Cards</h3>
      {cards.map((card, index) => {
          return (
           <div height="200px" width="200px" key={card.id || index} style={{backgroundColor: 'green'}}>
              <p>{card.rank}</p>
              <p>{card.suit && card.suit.name}</p>
              <p>{card.value}</p>
           </div>
          );
      })}
    </div>
  )
}
}

const mapStateToProps = (state) => {
	return {
		cards: state.cards,
	};
};

const mapDispatchToProps = (dispatch) => {
 return {
     getCards: () => dispatch(fetchCards())
 }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards)