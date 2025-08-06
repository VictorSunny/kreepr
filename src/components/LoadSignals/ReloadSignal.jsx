import './LoadSignals.css'
import ErrorIcon from '../../assets/icons/browser-error-icon.svg?react'

function ReloadSignal({refreshActionName, refreshClickFn}) {

  return (
    <div className="reload-signal signal-modal">
        <div>
            <ErrorIcon className="signal-icon signal-action-response-icon" loading="eager" fetchPriority="high" alt="error sign" />
            <p>Sorry. An error occured while {refreshActionName}.</p>
            <button className="btn signal-btn" type="button" aria-label="try reload" onClick={refreshClickFn}>
                Try Again
            </button>
        </div>
    </div>
  )
}

export default ReloadSignal