import { useState } from 'react'
import '../App.css'

function Login({ onLoginSuccess, onBack }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const isPhoneValid = /^\d{10}$/.test(phone)
    const isPasswordValid = /^\d{4}$/.test(password)

    if (isPhoneValid && isPasswordValid) {
      setError('')
      onLoginSuccess()
    } else {
      setError('Phone must be 10 digits and password must be 4 digit numeric')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {onBack && (
          <button className="login-back-btn" onClick={onBack}>
            ← Back
          </button>
        )}
        <h1 className="login-title">Suchi Fashion House raviteja</h1>
        <p className="login-subtitle">Sign in to continue to your webstore</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="login-input"
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="login-input"
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-hint">
          Phone should be 10 digits &amp; password should be 4 digit number.
        </p>
      </div>
    </div>
  )
}

export default Login