import { Link } from "react-router-dom"

export default function GoToPageButton({children, toUrlPath}) {

    ////    BUTTON FOR NAVIGATING PAGES USING URL PATH

    return (
        <button  className="btn page-nav-btn" type="button" aria-label="load more content">
            <Link className="btn-a page-nav-link" to={toUrlPath}>
                {children}
            </Link>
        </button>
    )
}