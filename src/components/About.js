import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="wrapper about">
                <img src={this.props.image} alt="Sadaf Ahsan"/>
                <div className="about-container">
                    <div className="bio" dangerouslySetInnerHTML={{ __html: this.props.bio}}>
                    </div>
                    <div className="contact">
                        <h2>Contact</h2>
                        <p>Email: hello [at] sadafahsan.com</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
