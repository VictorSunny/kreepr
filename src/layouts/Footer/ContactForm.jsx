import { useRef } from 'react';
import emailjs from '@emailjs/browser'
import './ContactForm.css'

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ContactForm() {

    ////    CONTACT FORM
    const form = useRef()

    // declare references for form fields manipulation
    const nameField = useRef()
    const emailField = useRef()
    const messageField = useRef()
    const sendButton = useRef()

    // function to reset form values
    const resetFormValues = () => {
        nameField.current.value = '';
        emailField.current.value = '';
        messageField.current.value = '';
        sendButton.current.textContent = 'Send !'
    }

    // reset form on page navigation
    const location = useLocation()
    useEffect(() => {
        resetFormValues()
    }, [location.pathname])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // extract form values for logging
        const formData = e.target;
        const senderName = formData.sender_name.value
        const senderEmail = formData.sender_email.value
        const senderMessage = formData.message.value
        
        // decalare arguments for emailjs
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

        // send email
        emailjs.sendForm(
            serviceID,
            templateID,
            form.current,
            {
                publicKey: publicKey
            }
            ).then(
                () => {
                    // console.log(`contact email sent successfully\nfull name: ${senderName}\nsender nemail: ${senderEmail}`);
                    resetFormValues();
                    sendButton.current.textContent = 'sent !'
                },
                (error) => {
                    // console.log(`failed to send email from: ${senderEmail}\nerror: ${JSON.stringify(error)}\nmessage body: ${senderMessage}`)
                    sendButton.current.textContent = 'failed. retry'
                }  
            )

    }

    return (
        <div className="contact-form-container footer-section">
            <h3 className="footer-section-title">Message the Dev</h3>
            <form ref={form} name="contact-form" className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-field-container name-field-container">
                    <label htmlFor="sender_name">Full Name</label>
                    <input ref={nameField} name="sender_name" id="sender_name" type="text" placeholder="Joe Don" required></input>
                </div>
                <div className="form-field-container email-field-container">
                    <label htmlFor="sender_email">Email</label>
                    <input ref={emailField} name="sender_email" id="sender_email" type="email" placeholder="example@email.com" required></input>
                </div>
                <div className="form-field-container message-field-container">
                    <label htmlFor="message">Message</label>
                    <textarea ref={messageField} name="message" id="message" placeholder="what's on your mind?" required></textarea>
                </div>
                <button ref={sendButton} className="btn contact-form-btn" type="submit" aria-label="contact form sumbit">
                    Send !
                </button>
            </form>
        </div>
    )
}