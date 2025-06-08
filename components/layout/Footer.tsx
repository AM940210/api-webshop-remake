
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 50,
      }}
    >
      <p>Made with 🤍 by MAST group | © 2025</p>
    </footer>
  );
};

export default Footer;
