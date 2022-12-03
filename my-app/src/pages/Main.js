import React from 'react'
import { Link } from 'react-router-dom'
import Game from './Game'

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="main">
            <Game />
        </div>
      </div>
    )
  }
}

export default Main;