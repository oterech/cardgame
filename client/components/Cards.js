import React from 'react'
import {connect} from 'react-redux'
import { allCards, fetchCards } from '../store/cards'

/**
 * COMPONENT
 */
class Cards extends React.Component {
    constructor(props) {
        super(props)
    }

async componentDidMount() {
   await this.props.getCards()
}
render() {
 const cards = this.props.cards || []
  return (
    <div>
      <h3>All The Cards</h3>
      {cards.map((card, index) => {
          return (
           <div key={card.id || index} style={{backgroundColor: 'green'}}>
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