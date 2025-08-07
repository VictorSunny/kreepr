import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

function AnimatedPageWrapper({ children }) {

    //// WRAPPER TO ANIMATE PAGES ON NAVIGATION

    const location = useLocation()

    return (
        <motion.div
            key={location.pathname}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            exit={{
                opacity: 0,
                x: 400
            }}
            transition={{
                duration: 1,
            }}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedPageWrapper