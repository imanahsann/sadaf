import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './styles/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Four04 from './components/Four04';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fab);

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/page/:page" component={Writing} />
              <Route exact path="/" component={Writing} />
              <Route component={Four04} />
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
