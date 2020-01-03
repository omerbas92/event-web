import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Event = props => (
    <tr>
        <td>{props.event.name}</td>
        <td>{props.event.description}</td>
        <td>{props.event.startDate.substring(0, 10)}</td>
        <td>{props.event.endDate.substring(0, 10)}</td>
        <td>{props.event.keywords.join(',')}</td>
        <td>{props.event.url}</td>
        <td>
            <Link to={"/edit/"+props.event._id}>Edit</Link>
        </td>
    </tr>
)

export default class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    componentDidMount() {
        axios.get('http://localhost:3600/events/')
            .then(response => {
                this.setState({ events: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    eventList() {
        return this.state.events.map(function(currentEvent, i){
            return <Event event={currentEvent} key={i} />;
        })
    }

    render() {
        return (
            <div>
            <h3>Events</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Keywords</th>
                        <th>Url</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.eventList() }
                </tbody>
            </table>
        </div>
        )
    }
}