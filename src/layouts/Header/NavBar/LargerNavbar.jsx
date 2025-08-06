import { Link } from "react-router-dom"
import './LargerNavbar.css'
import { useSiteNavigationContext } from "../../../contexts/SiteNavigationContext"

function LargerNavbar() {

    ////    SITE NAVIGATION LINKS FOR EASE NAVIGATING BETWEEN PAGES

    const {currentUrlPath, allUrls} = useSiteNavigationContext()

    return (
        <nav id="larger-navbar">
            <div className="site-nav-links">
                {allUrls.map((link, index) => {
                    return (
                        <Link key={index + link.value} to={`${link.value}`} className={`nav-link-btn ${currentUrlPath.text === link.text ? 'active-nav-link-btn' : ''}`}>{link.text}</Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default LargerNavbar