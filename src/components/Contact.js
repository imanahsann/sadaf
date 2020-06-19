import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            disabled: '',
            sending: false,
            sent: false,
            error: false
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
        this.setState({
            disabled: 'disabled',
            sending: true
        })
        axios({
            method: 'post',
            dataType: "jsonp",
            url: "https://intense-scrubland-47998.herokuapp.com/https://formsubmit.co/ajax/25dbbd60f5ea0f52706e96cca2452419",
            data: {
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            }
        }).then((response) => {
            if (response.data.success) {
                console.log(response);
                this.resetForm()
            } else if (response.data.status === 'fail') {
                this.resetFormError()
            }
        })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: '',
            disabled: '',
            sending: false,
            sent: true,
            error: false
        })
    }

    resetFormError() {
        this.setState({
            name: '',
            email: '',
            message: '',
            disabled: '',
            sending: false,
            sent: false,
            error: true
        })
    }

    render() {
        return (
            <div id="contact" className="wrapper contact">
                <p>Email: hello [at] sadafahsan.com</p>
                <div className={this.state.error ? '' : 'invisible'}>
                    <p>Unfortunately, there was a problem submitting your message. Please try again or send me an email!</p>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST" className={this.state.sent ? 'invisible' : ''}>
                    <div className="name">
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div className="email">
                        <input type="email" name="email" placeholder="Email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div className="message">
                        <textarea rows="5" name=" Message" placeholder="Message" value={this.state.message} onChange={this.onMessageChange.bind(this)}></textarea>
                    </div>
                    <button className="submit" type="submit" disabled={this.state.disabled}>{this.state.sending ? "Sending..." : "Submit"}</button>
                </form>
                <div className={this.state.sent ? '' : 'invisible'}>
                    <p>Thank you for reaching out!</p>
                </div>
            </div>
        );
    }
}

export default Contact;
