import React, { useContext, useState } from 'react'
import {ThemeContext} from '../context/ThemeContext'

const ToggleBtn = () => {

    const {theme, setTheme} = useContext(ThemeContext);

    const handleTheme = () => {
        const themeValue = theme === 'light' ? 'dark' : 'light';
        setTheme(themeValue);
    }

    return (
        <div className=''>
            <input type="checkbox" className="toggle border-blueColor" onClick={handleTheme} />

        </div>
    )
}

export default ToggleBtn