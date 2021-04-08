import React, { useState } from 'react'
import './scss/app.css';
import Todo from './components/Todo'

const App = () => {

    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div id='app_wrapper'>
            <div className='inner'>

                {/* Hero Image */}
                <div className='hero'>
                    <div className={`hero_img ${isDarkMode ? 'dark_hero_img' : 'light_hero_img'}`} ></div>
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
