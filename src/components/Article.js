import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Article extends Component {
    constructor() {
        super()
        this.state = {
            // article date
            date: ''
        }
    }

    componentDidMount() {
        // Convert date to 'month day, year' format
        let wp_date = this.props.date.split('T')[0].split('-');
        let day = wp_date[2];
        let year = wp_date[0];
        let month = '';

        switch(wp_date[1]) {
            case "01":
                month = "January";
                break;
            case "02":
                month = "February";
                break;
            case "03":
                month = "March";
                break;
            case "04":
                month = "April";
                break;
            case "05":
                month = "May";
                break;
            case "06":
                month = "June";
                break;
            case "07":
                month = "July";
                break;
            case "08":
                month = "August";
                break;
            case "09":
                month = "September";
                break;
            case "10":
                month = "October";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "December";
                break;
            default:
                month = '';
                break;
        }

        let date = month + ' ' + day + ', ' + year;
        this.setState ({
            date: date
        })
    }

    render() {
        return (
            <div className="article">
                <a href={this.props.link} target="_blank" rel="noopener noreferrer">
                    <div className="date">
                        {this.state.date}
                    </div>
                    <div className="image">
                        <div className="imageContainer">
                            <img src={this.props.image} alt={this.props.publication} title ={this.props.publication} />
                        </div>
                    </div>
                    <div className="title">
                        {ReactHtmlParser(this.props.title)}
                    </div>
                    <div className="publication">
                        <a href={this.props.link} target="_blank" rel="noopener noreferrer">@ {this.props.publication}</a>
                    </div>
                </a>
            </div>
        );
    }
}

export default Article;
