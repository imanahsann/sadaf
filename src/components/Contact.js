import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    onNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onMessageChange(event) {
        this.setState({ message: event.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        axios({
            method: 'post',
            dataType: "jsonp",
            url: "https://intense-scrubland-47998.herokuapp.com/https://formsubmit.co/ajax/05a97d1ec3e214cf35cdfa56f862c9ba",
            data: this.state
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: ''
        })
    }

    render() {
        return (
            <div id="contact" className="wrapper contact">
                <h2>Contact</h2>
                <p>Email: hello [at] sadafahsan.com</p>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" name="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea rows="5" name="message" value={this.state.message} onChange={this.onMessageChange.bind(this)}></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Contact;
