import React from 'react';

function Header({ onLogout }) {
  return (
    <header>
      <h1>Suchi Fashion House</h1>
      {onLogout && (
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
