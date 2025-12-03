import { useState, useEffect } from 'react'
import '../App.css'

function SignUp({ onSignUpSuccess, onBack }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [showOtpSent, setShowOtpSent] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSendOtp()
    }
  }

  const handleSendOtp = () => {
    if (email.trim() && phone.trim()) {
      setShowOtpSent(true)
      setShowOtp(true)
      
      // Hide OTP sent message after 3 seconds
      setTimeout(() => {
        setShowOtpSent(false)
      }, 3000)
    }
  }

  const handleOtpChange = (e) => {
    const value = e.target.value
    // Only allow numeric input and max 4 digits
    if (/^\d*$/.test(value) && value.length <= 4) {
      setOtp(value)
    }
  }

  useEffect(() => {
    // When 4 digit OTP is entered, redirect to home
    if (otp.length === 4 && /^\d{4}$/.test(otp)) {
      setShowWelcome(true)
      setTimeout(() => {
        onSignUpSuccess()
      }, 500)
    }
  }, [otp, onSignUpSuccess])

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showWelcome])

  return (
    <div className="signup-page">
      <div className="signup-card">
        <button className="signup-back-btn" onClick={onBack}>
          ← Back
        </button>
        
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Join Suchi Fashion House</p>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <label className="signup-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signup-input"
            />
          </label>

          <label className="signup-label">
            Phone Number
            <div className="signup-phone-container">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleEnterPress}
                placeholder="Enter phone number"
                className="signup-input signup-phone-input"
              />
              <button
                type="button"
                className="signup-enter-btn"
                onClick={handleSendOtp}
              >
                Enter
              </button>
            </div>
          </label>

          {showOtpSent && (
            <div className="signup-otp-sent">
              OTP sent
            </div>
          )}

          {showOtp && (
            <label className="signup-label">
              OTP
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 4 digit OTP"
                className="signup-input signup-otp-input"
                maxLength={4}
              />
            </label>
          )}
        </form>

        <p className="signup-hint">
          Enter your email and phone number, then press Enter to receive OTP.
        </p>
      </div>

      {showWelcome && (
        <div className="signup-welcome-toast">
          Welcome to suchi fashion store
        </div>
      )}
    </div>
  )
}

export default SignUp

