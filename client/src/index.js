import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import BasePage from './pages/BasePage'

import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

render((
  <BrowserRouter>
      <Switch>
        <Route exact path='/' component={BasePage} />
      </Switch>
  </BrowserRouter>
), document.getElementById('root'))
