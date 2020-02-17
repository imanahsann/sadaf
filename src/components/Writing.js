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
        if ( this.state.articleCache[filter][page] ) {
            this.setState ({
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
                        <Link to={`/writing?${this.state.category ? `category=${this.state.category}&` : ''}${this.state.tag ? `tag=${this.state.tag}&` : ''}page=${parseInt(this.state.currentPage) - 1}&filter=${this.state.filter}`} className={(parseInt(this.state.currentPage) !== 1) ? 'back' : 'invisible back'} ><li className="back">{String.fromCharCode(171) + ' Previous'}</li></Link>

                        <li className="page">{this.state.currentPage} of <Link to={`/writing?${this.state.category ? `category=${this.state.category}&` : ''}${this.state.tag ? `tag=${this.state.tag}&` : ''}page=${this.state.totalPages}&filter=${this.state.filter}`}>{this.state.totalPages}</Link></li>

                        <Link to={`/writing?${this.state.category ? `category=${this.state.category}&` : ''}${this.state.tag ? `tag=${this.state.tag}&` : ''}page=${parseInt(this.state.currentPage) + 1}&filter=${this.state.filter}`} className={(parseInt(this.state.currentPage) < parseInt(this.state.totalPages)) ? 'next' : 'invisible next' } ><li>{'Next ' + String.fromCharCode(187)}</li></Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Writing;
