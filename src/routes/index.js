import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from '../pages/login/SignIn'
import SignUp from '../pages/login/SignUp'
import Home from '../components/Home'
import Shop from '../components/shop/ShopPage'
import ComposeComponent from '../components/baseComponent/ComposeComponent'

export default (
    <div>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/shop" component={ComposeComponent(Shop)}></Route>
    </div>
)