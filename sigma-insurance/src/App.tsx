import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import DataAnalysis from './components/DataAnalysis';
import ServiceOfferings from './components/ServiceOfferings';
import Chatbot from './components/Chatbot';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/data-analysis" component={DataAnalysis} />
                    <Route path="/service-offerings" component={ServiceOfferings} />
                </Switch>
                <Chatbot />
            </div>
        </Router>
    );
};

export default App;