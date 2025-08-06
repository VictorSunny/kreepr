import './LoadSignals.css'

function LeftRightLoadingSignal() {
  return (
    <div className="left-right-loading-signal signal-modal">
        <div>
            <img src="../../assets/animations/tube-spiner.svg" className="signal-icon" loading="eager" fetchPriority="high" alt="circular loading animation"></img>
        </div>
    </div>
  )
}

export default LeftRightLoadingSignal