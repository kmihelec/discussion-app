import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './styles/app.module.css';
import "./styles/bootstrapStyles.css";
import Header from './components/header';
import Routes from './routes'
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Routes />
      </Router>
    </Container>

  );
}

export default App;