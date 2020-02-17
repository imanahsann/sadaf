import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <a href="http://sadafahsan.com">
                    <h1>
                        Sadaf.
                    </h1>
                </a>
                <span className="description">
                    writer/editor/web producer
                </span>
            </header>
        );
    }
}

export default Header;
