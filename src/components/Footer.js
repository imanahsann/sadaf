import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <nav className="main">
                        <ul>
                            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                            <li><NavLink exact to="/" activeClassName="active">Writing</NavLink></li>
                            <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                        </ul>
                    </nav>
                    <nav className="social">
                        <ul>
                            <li><a href="https://twitter.com/_sadafahsan" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
                            <li><a href="https://www.instagram.com/canadawhore/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
                            <li><a href="https://www.linkedin.com/in/sadaf-ahsan-160a7b37/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
                        </ul>
                    </nav>
                </div>
            </footer>
        )
    }
}

export default Footer;
