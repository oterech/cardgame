import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Games extends React.Component {
render() {

  return (
    <div>
      <h3>Welcome To The Card Game!!</h3>
    </div>
  )
}
}

export default connect(null)(Games)