import React from 'react';
import NameForm from './components/nameForm';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import PassForm from "./components/passForm";
import Success from "./components/success";

class App extends React.Component {

    render() {
        return (
            <div className="container">

                <Routes>
                    <Route path='/' element={<NameForm/>}/>
                    <Route path='/set-password' element={<PassForm/>}/>
                    <Route path='/success' element={<Success/>}/>
                </Routes>
            </div>

        )
    }
}

export default App;
