import { FC, useState } from 'react'
import { useBooking } from '../contexts/BookingContext'

const Step1: FC = () => {
  const [isDividerOpen, setIsDividerOpen] = useState(false)

  const { setStep /*setLanguage*/ } = useBooking()

  const handleDividerClick = () => {
    setIsDividerOpen(!isDividerOpen)
  }

  /* 
  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage)
  }
  */

  return (
    <div>
      <div className="langselectTBA-container">
        <h2>Table reservation</h2>
        {/*
        <select name="languages" id="langs" onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="hu">HU</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="it">IT</option>
        </select>
        */}
      </div>
      <h1>Ouroboros</h1>
      <h2>1065 Budapest, NAGYMEZŐ STREET 3.</h2>
      <div className="contactinfo-container">
        <div
          className="divider"
          style={{ borderBottom: '1px solid' }}
          onClick={handleDividerClick}
        >
          <i className="fas fa-clock"></i>
          <h3>Open hours and contact info</h3>
          <i className="fas fa-arrow-down"></i>
        </div>
        {isDividerOpen && (
          <div
            className="info-container"
            style={{ border: '1px solid', borderRadius: '5px' }}
          >
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <br />
            <div className="phone-container">
              <i className="fas fa-phone"></i>
              <p>phone number</p>
            </div>
            <div className="email-container">
              <i className="fas fa-at"></i>
              <p>email</p>
            </div>
          </div>
        )}
      </div>
      <button onClick={() => setStep(2)}>Next</button>
    </div>
  )
}
