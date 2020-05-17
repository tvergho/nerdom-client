import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <Container className="nav-bar">
      <div className="nav-logo">
        <div className="nav-title">Nerdom</div>
        <div className="nav-subtitle">Battle of the Fandoms</div>
      </div>
      <div className="link-wrapper">
        <NavLink exact to="/" className="nav-link">Duel</NavLink>
        <NavLink to="/rankings" className="nav-link">Rankings</NavLink>
      </div>
    </Container>
  );
};

export default NavBar;
