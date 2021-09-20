import './App.css'

import React from 'react'
import MainPage from './pages/Main'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={()=><MainPage />} />
                <Route exact path="/:id" render={()=><MainPage />} />
            </Switch>
        </Router>
    )
}

export default App
