import './LoadSignals.css'

function NoDataSignal({expectedData}) {

  return (
    <div className="no-data-signal signal-modal">
        <div>
            <span>No {expectedData} available</span>
        </div>
    </div>
  )
}

export default NoDataSignal