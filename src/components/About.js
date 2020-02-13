import React, { Component } from 'react';
import axios from 'axios';

class About extends Component {
    constructor() {
        super()
        this.state = {
            // loading
            loading: true,
            //image
            image: '',
            // bio
            bio: ''
        }
    }

    componentDidMount() {
        let url = `http://doorinthefloor.net/sadaf/wp-json/wp/v2/pages/14?_embed`;
        // get page
        axios({
            url: url,
            method: 'GET',
            dataType: 'json'
        }).then((response) => {
            this.setState({
                image: response.data._embedded["wp:featuredmedia"]["0"].source_url,
                bio: response.data.content.rendered,
                loading: false
            });
        })
    }

    render() {
        return (
            <div className="wrapper about">
                <img src={this.state.image} alt="Sadaf Ahsan"/>
                <div className="bio" dangerouslySetInnerHTML={{ __html: this.state.bio}}>
                </div>
            </div>
        );
    }
}

export default About;
