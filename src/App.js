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
            <div className='todo_footer text-center'>
                    <p className='drag_txt'>Developed By: <a href="https://github.com/aakash19090" target='_blank'>AKASH SHARMA</a> </p>
                </div>
        </div>
    )
}

export default App
