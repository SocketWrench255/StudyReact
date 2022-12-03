import React from 'react'
import { Link } from 'react-router-dom'
import Table from './Table'

class Main extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Main</Link>
        <div className="main">
            <Table />
        </div>
      </div>
    )
  }
}

export default Main;