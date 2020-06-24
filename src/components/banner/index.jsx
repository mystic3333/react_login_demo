import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Nav from '../nav'
import routes from '../../routes'
import './index.css'
import FlashList from './../message/FlashList'


export default class Banner extends React.Component {


    render() {
        return (
            <div className="container">
              
               <Router routes={routes}>
                    <Nav/>
                    <FlashList/>
                   {routes}
               </Router>
            </div>
        )
    }
}


