import React, { Component } from 'react';
import axios from 'axios';
import {
    Route,
    Link
} from 'react-router-dom';
import Article from './Article';

class Writing extends Component {
    constructor() {
        super()
        this.state = {
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
            filter: 'featured'
        }
    }

    componentDidMount() {
        this.articleRetrieval(6, undefined, 1);
    }

    articleRetrieval = (category, tag, page) => {
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
                tag: tag
            });
        })
    };

    activeFilter = (filter) => {
        this.setState({
            filter: filter
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="articleNav">
                    <ul>
                        <li onClick={() => { this.articleRetrieval(6, undefined, 1); this.activeFilter('featured') }} className={(this.state.filter === 'featured' ? 'active' : '')}>Featured</li>

                        <li onClick={(e) => { this.articleRetrieval(undefined, undefined, 1); this.activeFilter('recent') }} className={(this.state.filter === 'recent' ? 'active' : '')}>Recent</li>

                        <li onClick={() => { this.articleRetrieval(undefined, 42, 1); this.activeFilter('reviews') }} className={(this.state.filter === 'reviews' ? 'active' : '')}>Reviews</li>
                    </ul>
                </div>
                <div className="articleGrid">
                    {this.state.articles.map((article) => {
                        return <Article key={article.id} title={article.content.rendered} link={article.Link} publication={article.Publication} image={article._embedded["wp:featuredmedia"] ? `${article._embedded["wp:featuredmedia"]["0"].source_url}` : ''} date={article.date} />
                    })}
                </div>
                <div className="pagination">
                    <ul>
                        <li className="link" onClick={()=>{this.articleRetrieval(this.state.category, this.state.tag, this.state.currentPage - 1)}}>{(this.state.currentPage !== 1) ? 'Previous' : ''}</li>
                        <li>{this.state.currentPage} of {this.state.totalPages}</li>
                        <li className="link" onClick={() => { this.articleRetrieval(this.state.category, this.state.tag, this.state.currentPage + 1)}}>{(this.state.currentPage < this.state.totalPages) ? 'Next' : ''}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Writing;
