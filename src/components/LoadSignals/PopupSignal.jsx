import React from 'react'
import { useState } from 'react'

import useResetStates from '../../hooks/useResetStates'
import BackDrop from '../../components/Backdrop/Backdrop'

import sleep from '../../utilities/sleep'

import ErrorIcon from '../../assets/icons/red-x-line-icon.svg?react'
import SuccessIcon from '../../assets/icons/green-checkmark-line-icon.svg?react'
import { useEffect } from 'react'

function PopupSignal({ popupType, popupMessageContinuousVerb }) {

    ////    POPUP MODAL TO SIGNAL USER ON REQUEST RESPONSE.

    // takes a 'popuptype' parameter to display matching popup element

    // popupmessagecontinuous verb to take message in the form of a continuous verb that can be used in any context
    // e.g popupmessagecontinuousverb = 'sending message':
                                        // popuptype = 'success': message: 'success sending message'
                                        // popuptype = 'failed': message: 'failed sending message'
                                        // popuptype = 'processing': message: 'request is received. sending message'

    const [keepDisplayingModal, setKeepDisplayingModal] = useState(true)

    const autoCloseModal = async () => {
        await sleep(3000);
        return setKeepDisplayingModal(false)
    }

    useEffect(() => {
        autoCloseModal();
    }, [])

    const _resetMessaget = useResetStates([setKeepDisplayingModal,])

    return (
        <>
            {
                keepDisplayingModal &&
                <div className="popup-signal signal-modal">
                    <BackDrop setPopoverDisplayState={setKeepDisplayingModal} />
                    <div>
                        {
                            (popupType == 'failed') &&
                            <div>
                                <ErrorIcon className="signal-icon signal-action-response-icon" loading="eager" fetchPriority="high" alt="error icon" />
                                <p>Sorry. Failed {popupMessageContinuousVerb}.</p>
                            </div> ||
                            (popupType == 'success') &&
                            <div>
                                <SuccessIcon className="signal-icon signal-action-response-icon" loading="eager" fetchPriority="high" alt="success icon" />
                                <p>Success {popupMessageContinuousVerb} </p>
                            </div> ||
                            <div>
                                <p> Request has been processed. </p>
                            </div>
                        }
                    </div>
                    <CloseButton setModalDisplay={setKeepDisplayingModal} />
                </div>
            }
        </>
    )

}

export default PopupSignal


const CloseButton = ({ setModalDisplay }) => {
    
    const handleClick = () => {
        setModalDisplay(false)
    }
    
    return (
        <button className="btn signal-btn" type="button" aria-label="try reload" onClick={handleClick}>
            ok
        </button>
    )
}