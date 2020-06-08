import React, { Component } from 'react';
import Contact from './Contact';

class About extends Component {
    render() {
        return (
            <div className="wrapper about">
                <img src={this.props.image} alt="Sadaf Ahsan"/>
                <div className="about-container">
                    <div className="bio" dangerouslySetInnerHTML={{ __html: this.props.bio}}>
                    </div>
                    <Contact />
                </div>
            </div>
        );
    }
}

export default About;
