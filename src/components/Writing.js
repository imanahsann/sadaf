import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import Article from './Article';

class Writing extends Component {
    constructor() {
        super()
        this.state = {
            // loading
            loading: true,
            //retrieved articles
            articles: [],
            // total pages
            totalPages: undefined,
            // current page
            currentPage: undefined,
            // category
            category: undefined,
            // tag
            tag: undefined,
            // active filter
            filter: undefined
        }
    }

    componentDidMount() {
        this.articleRetrieval(this.props.category, this.props.tag, this.props.page, this.props.filter);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            this.articleRetrieval(this.props.category, this.props.tag, this.props.page, this.props.filter);
        }
    }

    articleRetrieval = (category, tag, page, filter) => {
        this.setState({
            loading: true
        })
        let url = '';
        if (category || tag) {
            url = `http://doorinthefloor.net/sadaf/wp-json/wp/v2/posts?${category ? `categories=${category}&` : ''}${tag ? `tags=${tag}&` : ''}${page ? `per_page=12&page=${page}&` : 'per_page=12&'}_embed`;
        }

        else {
            url = `http://doorinthefloor.net/sadaf/wp-json/wp/v2/posts?${page ? `per_page=12&page=${page}&` : ''}_embed`;
        }
        // ajax request
        axios({
            url: url,
            method: 'GET',
            dataType: 'json'
        }).then((response) => {
            this.setState({
                articles: response.data,
                totalPages: response.headers['x-wp-totalpages'],
                currentPage: page,
                category: category,
                tag: tag,
                filter: filter,
                loading: false
            });
        })
    };

    render() {
        return (
            <div className="wrapper">
                <div className="articleNav">
                    <ul>
                        <Link to="/"><li className={(this.state.filter === 'featured' ? 'active' : '')}>Featured</li></Link>
                        <Link to="/writing?page=1&filter=recent"><li className={(this.state.filter === 'recent' ? 'active' : '')}>Recent</li></Link>
                        <Link to="/writing?tag=42&page=1&filter=reviews"><li className={(this.state.filter === 'reviews' ? 'active' : '')}>Reviews</li></Link>
                    </ul>
                </div>
                <div className="loading-container">
                    <div className={this.state.loading ? 'loader loading' : 'loader'}>
                        <p>LOADING</p>
                    </div>
                </div>
                <div className={this.state.loading ? 'articleGrid loading' : 'articleGrid'}>
                    {this.state.articles.map((article) => {
                        return <Article key={article.id} title={article.content.rendered} link={article.Link} publication={article.Publication} image={article._embedded["wp:featuredmedia"] ? `${article._embedded["wp:featuredmedia"]["0"].source_url}` : ''} date={article.date} />
                    })}
                </div>
                <div className="pagination">
                    <ul>
                        <Link to={`/writing?${this.state.category ? `category=${this.state.category}&` : ''}${this.state.tag ? `tag=${this.state.tag}&` : ''}page=${parseInt(this.state.currentPage) - 1}&filter=${this.state.filter}`}><li>{(parseInt(this.state.currentPage) !== 1) ? String.fromCharCode(171) + ' Previous' : ''}</li></Link>

                        <li>{this.state.currentPage} of <Link to={`/writing?${this.state.category ? `category=${this.state.category}&` : ''}${this.state.tag ? `tag=${this.state.tag}&` : ''}page=${this.state.totalPages}&filter=${this.state.filter}`}>{this.state.totalPages}</Link></li>

                        <Link to={`/writing?${this.state.category ? `category=${this.state.category}&` : ''}${this.state.tag ? `tag=${this.state.tag}&` : ''}page=${parseInt(this.state.currentPage) + 1}&filter=${this.state.filter}`}><li>{(this.state.currentPage < this.state.totalPages) ? 'Next ' + String.fromCharCode(187) : ''}</li></Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Writing;
