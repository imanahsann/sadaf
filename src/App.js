import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import queryString from 'query-string';
import './styles/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Four04 from './components/Four04';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
            <Switch>
              <Route exact path="/" render={(props) => <Writing {...props} category={6} page={1} filter={'featured'} />} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/writing" render={(props) => <Writing {...props} category={queryString.parse(props.location.search).category} tag={queryString.parse(props.location.search).tag} page={queryString.parse(props.location.search).page} filter={queryString.parse(props.location.search).filter} />} />
              <Route component={Four04} />
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
