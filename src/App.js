import React, { Component } from 'react';
import axios from 'axios';
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
  constructor() {
    super()
    this.state = {
      // loading
      loading: true,
      // retrieved articles
      articles: [],
      //cached articles
      articleCache: {
        featured: {},
        recent: {},
        reviews: {}
      },
      // total pages
      totalPages: undefined,
      // current page
      currentPage: 1,
      // category
      category: 6,
      // tag
      tag: undefined,
      // active filter
      filter: 'featured'
    }
  }

  articleRetrieval = (category, tag, page, filter) => {
    // update state to loading
    this.setState({
      loading: true
    })

    // update url
    let url = '';
    if (category || tag) {
      url = `http://doorinthefloor.net/sadaf/wp-json/wp/v2/posts?${category ? `categories=${category}&` : ''}${tag ? `tags=${tag}&` : ''}${page ? `per_page=12&page=${page}&` : 'per_page=12&'}_embed`;
    }
    else {
      url = `http://doorinthefloor.net/sadaf/wp-json/wp/v2/posts?${page ? `per_page=12&page=${page}&` : ''}_embed`;
    }

    // check if articles already cached
    if (this.state.articleCache[filter][page]) {
      this.setState({
        articles: this.state.articleCache[filter][page].articles,
        totalPages: this.state.articleCache[filter][page].totalPages,
        currentPage: page,
        category: category,
        tag: tag,
        filter: filter,
        loading: false
      })
    }

    // if not, retreive articles and cache
    else {
      let articleCacheUpdate = this.state.articleCache;
      axios({
        url: url,
        method: 'GET',
        dataType: 'json'
      }).then((response) => {
        articleCacheUpdate[filter][page] = {
          articles: response.data,
          totalPages: response.headers['x-wp-totalpages']
        };
        this.setState({
          articles: response.data,
          totalPages: response.headers['x-wp-totalpages'],
          currentPage: page,
          category: category,
          tag: tag,
          filter: filter,
          loading: false,
          articleCache: articleCacheUpdate
        });
      })
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
            <Switch>

              <Route exact path="/" render={(props) => <Writing
                {...props}
                articleRetrieval={this.articleRetrieval}
                loading={this.state.loading}
                articles={this.state.articles}
                articleCache={this.state.articleCache}
                totalPages={this.state.totalPages}
                currentPage={1}
                category={6}
                tag={undefined}
                filter={'featured'}
              />} />

              <Route path="/about" component={About} />

              <Route path="/contact" component={Contact} />

              <Route path="/writing" render={(props) => <Writing
                {...props}
                articleRetrieval={this.articleRetrieval}
                loading={this.state.loading}
                articles={this.state.articles}
                articleCache={this.state.articleCache}
                totalPages={this.state.totalPages}
                currentPage={queryString.parse(props.location.search).page}
                category={queryString.parse(props.location.search).category} tag={queryString.parse(props.location.search).tag}
                filter={queryString.parse(props.location.search).filter}
              />} />

              <Route component={Four04} />
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
