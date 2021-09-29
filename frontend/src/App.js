import React from 'react';
import "tailwindcss/tailwind.css"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './routes/Home';
import StorageContextProvider from './contexts/StorageContext';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';

const App = () => {
    return (
        <Router>
            <StorageContextProvider>
                <div className="bg-indigo-900 text-gray-100 min-h-screen p-4 relative">
                    <Home />

                    <Switch>
                        <Route path="/login">
                            <LoginModal />
                        </Route>
                        <Route path="/register">
                            <RegisterModal />
                        </Route>
                    </Switch>
                
                </div>
            </StorageContextProvider>
        </Router>
    );
}

export default App;