import React from 'react'
import './scss/app.css';
import Todo from './components/Todo'

const App = () => {


    return (
        <div id='app_wrapper'>
            <div className='inner'>

                {/* Hero Image */}
                <div className='hero'>
                    <div className='hero_img' ></div>
                </div>

                {/* Todo Container */}

                <div className='todo_container'>
                    <Todo />
                </div>

            </div>
        </div>
    )
}

export default App
