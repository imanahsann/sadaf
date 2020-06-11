import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import Article from './Article';

class Writing extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            this.props.articleRetrieval(this.props.category, this.props.tag, this.props.currentPage, this.props.filter);
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="articleNav">
                    <ul>
                        <Link to="/"><li className={(this.props.filter === 'featured' ? 'active' : '')}>Featured</li></Link>
                        <Link to="/writing?page=1&filter=recent"><li className={(this.props.filter === 'recent' ? 'active' : '')}>Recent</li></Link>
                        <Link to="/writing?tag=42&page=1&filter=reviews"><li className={(this.props.filter === 'reviews' ? 'active' : '')}>Reviews</li></Link>
                        <Link to="/writing?tag=2&page=1&filter=arts"><li className={(this.props.filter === 'arts' ? 'active' : '')}>Arts</li></Link>
                        <Link to="/writing?tag=44&page=1&filter=news"><li className={(this.props.filter === 'news' ? 'active' : '')}>News</li></Link>
                        <Link to="/writing?tag=35&page=1&filter=interviews"><li className={(this.props.filter === 'interviews' ? 'active' : '')}>Interviews</li></Link>
                        <Link to="/writing?tag=49&page=1&filter=food"><li className={(this.props.filter === 'food' ? 'active' : '')}>Food</li></Link>
                    </ul>
                </div>
                <div className="loading-container">
                    <div className={this.props.loading ? 'loader loading' : 'loader'}>
                        <p>LOADING</p>
                    </div>
                </div>
                <div className={this.props.loading ? 'articleGrid loading' : 'articleGrid'}>
                    {this.props.articles.map((article) => {
                        return <Article key={article.id} title={article.content.rendered} link={article.Link} publication={article.Publication} image={article._embedded["wp:featuredmedia"] ? `${article._embedded["wp:featuredmedia"]["0"].source_url}` : ''} date={article.date} />
                    })}
                </div>
                <div className={this.props.loading ? 'pagination loading' : 'pagination'}>
                    <ul>
                        <Link to={`/writing?${this.props.category ? `category=${this.props.category}&` : ''}${this.props.tag ? `tag=${this.props.tag}&` : ''}page=${parseInt(this.props.currentPage) - 1}&filter=${this.props.filter}`} className={(parseInt(this.props.currentPage) !== 1) ? 'back' : 'invisible back'} ><li className="back">{String.fromCharCode(171) + ' Previous'}</li></Link>

                        <li className="page">{this.props.currentPage} of <Link to={`/writing?${this.props.category ? `category=${this.props.category}&` : ''}${this.props.tag ? `tag=${this.props.tag}&` : ''}page=${this.props.totalPages}&filter=${this.props.filter}`}>{this.props.totalPages}</Link></li>

                        <Link to={`/writing?${this.props.category ? `category=${this.props.category}&` : ''}${this.props.tag ? `tag=${this.props.tag}&` : ''}page=${parseInt(this.props.currentPage) + 1}&filter=${this.props.filter}`} className={(parseInt(this.props.currentPage) < parseInt(this.props.totalPages)) ? 'next' : 'invisible next' } ><li>{'Next ' + String.fromCharCode(187)}</li></Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Writing;
