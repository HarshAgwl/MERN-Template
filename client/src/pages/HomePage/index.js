import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css';
import './style.scss'

function BasePage(props) {
    return (
        <div className="home-page">
            <h1>This is the Home Page</h1>
        </div>
    )
}

export default BasePage
