import { useThemeContext } from '../../../contexts/ThemeContext'
import './ThemeToggle.css'
import {useEffect} from 'react'

import LightThemeIcon from '../../../assets/icons/light-mode-icon.svg?react'
import DarkThemeIcon from '../../../assets/icons/dark-mode-icon.svg?react'

export default function ThemeToggle() {

    ////    BUTTON FOR TOGGLING LIGHT MODE/DARK MODE BY RESETTING DARK MODE CONTEXT VALUE

    const {darkTheme, setDarkTheme} = useThemeContext()

    // toggle dark mode/light mode each time darktheme context variable changes from button click
    useEffect(() => {
        document.body.classList.toggle('dark', darkTheme);
        document.documentElement.setAttribute('data-theme', darkTheme ? 'dark' : 'light')
    }, [darkTheme])

    const handleClick = () => {setDarkTheme(!darkTheme)}

    return (
        // theme toggle button
        <button className='theme-toggle-btn' onClick={handleClick}  type="button" aria-label="toggle theme">
            {darkTheme ? <DarkThemeIcon className="icon theme-icon"loading="eager" alt="theme icon"/> : <LightThemeIcon className="icon theme-icon" loading="eager" alt="theme icon"/> }
        </button>
    )
}