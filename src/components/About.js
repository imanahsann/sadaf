import React, { Component } from 'react';
import Contact from './Contact';

class About extends Component {
    render() {
        return (
            <div className="wrapper about">
                <div className="avatar-container">
                    <img src={this.props.image} alt="Sadaf Ahsan"/>
                </div>
                <div className="about-container">
                    <div className="bio" dangerouslySetInnerHTML={{ __html: this.props.bio}}>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
