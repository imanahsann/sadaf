import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div>
                <div className="loading-container">
                    <div className={this.props.loading ? 'loader loading' : 'loader'}>
                        <p>LOADING</p>
                    </div>
                </div>
                <div className={this.props.loading ? 'wrapper about loading' : 'wrapper about'}>
                    <div className="avatar-container">
                        <img src={this.props.image} alt="Sadaf Ahsan" />
                    </div>
                    <div className="about-container">
                        <div className="bio" dangerouslySetInnerHTML={{ __html: this.props.bio }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
