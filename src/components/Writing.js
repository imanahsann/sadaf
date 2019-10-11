import React, { Component } from 'react';
import Article from './Article'

class Writing extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="articleNav">
                    <ul>
                        <li>Featured</li>
                        <li className="current">Recent</li>
                        <li>Arts</li>
                        <li>Life</li>
                    </ul>
                </div>
                <div className="articleGrid">
                    {this.props.articles.map((article) => {
                        return <Article key={article.id} title={article.content.rendered} link={article.Link} publication={article.Publication} image={article.featured_image_url} date={article.date}  />
                    })}
                </div>
            </div>
        );
    }
}

export default Writing;
