import './LoadSignals.css'
import BouncingCircles from '../../assets/animations/bouncing-circles.svg?react'

function LineLoadingSignal() {
  return (
    <div className="line-loading-signal signal-modal">
        <div>
            <span className="signal-modal-title">loading...</span>
            <BouncingCircles className="signal-icon" loading="eager" fetchPriority="high" alt="line loading animation" />
        </div>
    </div>
  )
}

export default LineLoadingSignal