import { lazy } from "react";

import "./Header.css"
import SiteLogo from "../../components/SiteLogo/SiteLogo";

const Navbar = lazy(() => import('./NavBar/Navbar'))
const LargerNavbar = lazy(() => import('./NavBar/LargerNavbar'))
const SearchBar = lazy(() => import('./Searcher/SearchBar'))
const HamburgerMenu = lazy(() => import('./HamburgerMenu/HamburgerMenu'))
const SearchButton = lazy(() => import('./Searcher/SearchButton'))
const ThemeToggle = lazy(() => import("./ThemeToggle/ThemeToggle"))

function Header() {

    ////    SITE HEADER

    const mobileMode = screen.width < 481

    return (
        <>
            <header className="noselect primary-section">
                
                    <SiteLogo /> 
                    {
                        // return components depending on user device type
                        // mobile device returns smaller components
                        mobileMode ? <> <Navbar /> <SearchButton /> <HamburgerMenu /> </>
                                    : <> <SearchBar /> <LargerNavbar /> <ThemeToggle /> </>
                    }

           </header>
        </>
    )
}

export default Header