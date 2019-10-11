import React, { Component } from 'react';
import axios  from 'axios';
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fab);

class App extends Component {
  constructor() {
    super()
    this.state = {
      //empty array to hold all articles
      articles: [],
      // empty string to hold about page text
      about: ''
    }
  }

  componentDidMount() {
    // ajax request
    axios({
      url: `/wp-json/wp/v2/posts?_embed`,
      method: 'GET',
      dataType: 'json'
    }).then((response)=>{
        this.setState ({
          articles: response.data
        });
        console.log(response.data);
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/writing">
                <Writing articles={this.state.articles} />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/">

              </Route>
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
