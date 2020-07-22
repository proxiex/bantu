import React from 'react';
import './styles.css';

function MainNav() {
  return (
    <div className="container-fluid border">
    <nav className="container navbar navbar-expand-lg navbar-light ">
    <a className="navbar-brand" href="/"><img src='https://static.coincap.io/assets/icons/eos@2x.png' alt="logo" /></a>
    Bantu
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a className="nav-link" href="/">Coins <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/chart">Chart</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/footprint">Footprint</a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link" href="/"><i className="fas fa-ellipsis-h"></i></a>
        </li>
      </ul>
    </div>
  </nav>
    </div>
  )
}

export default MainNav;
