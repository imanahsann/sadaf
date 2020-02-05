import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <nav className="main">
                        <ul>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/">Writing</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
                    <nav className="social">
                        <ul>
                            <li><a href="https://twitter.com/_sadafahsan" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
                            <li><a href="https://www.instagram.com/canadawhore/" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
                            <li><a href="https://www.linkedin.com/in/sadaf-ahsan-160a7b37/" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
                        </ul>
                    </nav>
                </div>
            </footer>
        )
    }
}

export default Footer;
