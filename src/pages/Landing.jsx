import '../App.css'

function Landing({ onLoginClick, onSignUpClick }) {
  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Left Half - Image and Logo */}
        <div className="landing-left">
          <div className="landing-logo-container">
            <div className="landing-logo">
              <h1>Suchi Fashion House</h1>
              <p className="landing-tagline">Style That Speaks Your Language</p>
            </div>
          </div>
          <div className="landing-image-container">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop" 
              alt="Fashion shopping"
              className="landing-image"
            />
          </div>
        </div>

        {/* Right Half - Sign Up and Login Options */}
        <div className="landing-right">
          <div className="landing-actions">
            <h2 className="landing-welcome">Welcome to Suchi Fashion</h2>
            <p className="landing-description">
              Discover your style with our curated collection of fashion pieces
            </p>
            
            <div className="landing-buttons">
              <button 
                className="landing-btn landing-btn-primary"
                onClick={onSignUpClick}
              >
                Sign Up
              </button>
              
              <button 
                className="landing-btn landing-btn-secondary"
                onClick={onLoginClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

