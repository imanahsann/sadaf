import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <Link to="/">
                    <h1>
                        Sadaf
                    </h1>
                </Link>
                <span className="description">
                    writer/editor/web producer
                </span>
            </header>
        );
    }
}

export default Header;
