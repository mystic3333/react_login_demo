import React from 'react';
import Banner from './components/banner'

export default class App extends React.Component {
  render() {
    return (
      <div className="jumbotron-heading text-center">
        App
        <Banner/>
      </div>
    )
  }
}

