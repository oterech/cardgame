import React from 'react'
import {connect} from 'react-redux'
import { allCards, fetchCards } from '../store/cards'

/**
 * COMPONENT
 */
class Players extends React.Component {
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
    render() {
        return(
            <div className="position-relative text-center mt-5 pt-2 row row-cols-2">
                <h1>Player</h1>
                <h1 className="ps-5">Computer</h1>
            </div>
        )
    }
}
export default Players