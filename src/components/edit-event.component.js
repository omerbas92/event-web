import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import axios from 'axios';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export default class EditEvent extends Component {
    

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
  
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            tags: [],
            url: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3600/events/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    startDate: response.data.startDate.substring(0, 19),
                    endDate: response.data.endDate.substring(0, 19),
                    tags: response.data.keywords,
                    url: response.data.url
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }
    
    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
    }

 
    handleChange(tags) {
        this.setState({tags})
      }

    onSubmit(e) {
        e.preventDefault();

        const event = {
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            keywords: this.state.tags,
            url: this.state.url
        };
        
        axios.patch('http://localhost:3600/events/' + this.props.match.params.id, event)
        .then(res => console.log(res.data));
        
        this.setState({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            tags: '',
            url: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Update Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea  
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Start Date: </label>
                        <input 
                                type="datetime-local" 
                                className="form-control"
                                value={this.state.startDate}
                                onChange={this.onChangeStartDate}
                                />
                    </div>
                    <div className="form-group">
                        <label>End Date: </label>
                        <input 
                                type="datetime-local" 
                                className="form-control"
                                value={this.state.endDate}
                                onChange={this.onChangeEndDate}
                                />
                    </div>
                    <div className="form-group">
                    <TagsInput value={this.state.tags} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>URL: </label>
                        <input 
                                type="url" 
                                className="form-control"
                                value={this.state.url}
                                onChange={this.onChangeUrl}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Event" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}