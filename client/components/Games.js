import React from "react";
import { connect } from "react-redux";
import { allCards, fetchCards } from "../store/cards";
import { Button } from "reactstrap";
/**
 * COMPONENT
 */
class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        hand: [],
      },
      computer: {
        hand: [],
      },
    };
    this.beginGame = this.beginGame.bind(this);
  }

  async componentDidMount() {
    await this.props.getCards();
    const cards = this.props.cards;
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    const playerHand = cards.slice(0, 26);
    const computerHand = cards.slice(26);

    this.setState({
      player: { hand: playerHand },
      computer: { hand: computerHand },
    });
  }
  async beginGame() {
    const pFirstCard =this.state.player.hand[this.state.player.hand.length - 1];
    const cFirstCard = this.state.computer.hand[this.state.computer.hand.length - 1];
    cFirstCard.value = parseInt(cFirstCard.value)
    pFirstCard.value = parseInt(pFirstCard.value)
    const winnerText = document.getElementById("winningText");
    if (pFirstCard.value > cFirstCard.value) {
      const currentHand = this.state.player.hand;
      const winningCard = currentHand.pop();
      const losingHand = this.state.computer.hand
      const losingCard = losingHand.pop()
      this.ntimer = setTimeout(() => {
      const ele =  document.getElementById(winningCard.id)
      ele.style.transform = "rotateY(180deg)"
      const lose = document.getElementById(losingCard.id)
      lose.style.transform = "rotateY(180deg)"
      winnerText.innerText = "Player";
      }, 100);
      this.timer = setTimeout(() => {
        currentHand.unshift(winningCard);
        currentHand.unshift(losingCard)
        this.setState({ player: { hand: currentHand }, computer: {hand: losingHand} });
        let newTop = this.state.player.hand[this.state.player.hand.length-1]
        newTop = document.getElementById(newTop.id)
        newTop.style.transform = ""
        let newLoserTop = this.state.computer.hand[this.state.computer.hand.length-1]
        newLoserTop = document.getElementById(newLoserTop.id)
        newLoserTop.style.transform = ""
        winnerText.innerText = "Who Won This Round?";
        let cardHist = document.getElementById("cardHistory");
        cardHist.innerText += "  " + winningCard.rank + winningCard.suit.name;
      }, 1000);
    } else if(cFirstCard.value > pFirstCard.value){
      //the computer wins
      const currentHand = this.state.computer.hand;
      const winningCard = currentHand.pop();
      const losingHand = this.state.player.hand
      const losingCard = losingHand.pop()
      this.ntimer = setTimeout(() => {
      const ele =  document.getElementById(winningCard.id)
      ele.style.transform = "rotateY(180deg)"
      const lose = document.getElementById(losingCard.id)
      lose.style.transform = "rotateY(180deg)"
      winnerText.innerText = "Computer";
      }, 100);
      this.timer = setTimeout(() => {
        currentHand.unshift(winningCard);
        currentHand.unshift(losingCard)
        this.setState({ computer: { hand: currentHand }, player: {hand: losingHand}});
        let newTop = this.state.computer.hand[this.state.computer.hand.length-1]
        newTop = document.getElementById(newTop.id)
        newTop.style.transform = ""
        let newLoserTop = this.state.player.hand[this.state.player.hand.length-1]
        newLoserTop = document.getElementById(newLoserTop.id)
        newLoserTop.style.transform = ""
        winnerText.innerText = "Who Won This Round?";
      }, 1000);
    } else if(cFirstCard.value == pFirstCard.value) {
      const computerHand = this.state.computer.hand;
      const playerHand = this.state.player.hand
      const computerCard = computerHand.pop();
      const playerCard = playerHand.pop()

      this.timer = setTimeout(() => {
        const ele =  document.getElementById(computerCard.id)
        ele.style.transform = "rotateY(180deg)"
        const lose = document.getElementById(playerCard.id)
        lose.style.transform = "rotateY(180deg)"
        winnerText.innerText = "tie";
        }, 100);
        this.timer = setTimeout(() => {
          computerHand.unshift(computerCard)
          playerHand.unshift(playerCard)
          this.setState({ computer: { hand: computerHand }, player: {hand: playerHand}})
          let newTop = this.state.computer.hand[this.state.computer.hand.length-1]
          newTop = document.getElementById(newTop.id)
          newTop.style.transform = ""
          let newLoserTop = this.state.player.hand[this.state.player.hand.length-1]
          newLoserTop = document.getElementById(newLoserTop.id)
          newLoserTop.style.transform = ""
          winnerText.innerText = "Who Won This Round?";
        }, 1000);
    }
  }

  render() {
    const playersHand = this.state.player.hand;
    const computersHand = this.state.computer.hand;
    return (
      <div className="container-fluid">
        <p id="winningText" className="text-center mt-5 display-4"> </p>
        <Button className="d-block mx-auto mb-5" onClick={this.beginGame}>War</Button>
        <div className="d-flex justify-content-around">
        </div>
       <div className="row row-cols-2 justify-content-around">
        <div id="playerDeck" className="d-flex flex-column">
        <p className ="text-center">Player Cards: {this.state.player.hand.length}</p>
          {playersHand.map((card, index) => {
            return (
              <div className="mt-5 pCard" key={index}>
                <div className="pCardInner" id={card.id}>
                <div className="pCardBack">
                  <p>CARDBACK</p>
                </div>
                  <div className="pCardFront">
                  <p>{card.rank}</p>
                  <p>{card.suit && card.suit.name}</p>
                  </div>
              </div>
              </div>
            );
          })}
        </div>
        <div id="computerDeck" className="d-flex flex-column">
        <p className ="cardsInDeck text-center">Computer Cards: {this.state.computer.hand.length}</p>
          {computersHand.map((card, index) => {
            return (
              <div className="mt-5 cCard" key={index}>
                <div className="cCardInner" id={card.id}>
                <div className="cCardBack">
                  <p>CARDBACK</p>
                </div>
                  <div className="cCardFront">
                  <p>{card.rank}</p>
                  <p>{card.suit && card.suit.name}</p>
                  </div>
              </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: () => dispatch(fetchCards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
