// This is a simple footer that stays at the bottom of the page.
// It shows the current year and a copyright message. 

import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-auto">
      <Container>
        <small>© {new Date().getFullYear()} React CRUD App. All rights reserved.</small>
      </Container>
    </footer>
  );
}

export default Footer;
