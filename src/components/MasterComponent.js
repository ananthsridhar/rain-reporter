import React from 'react';
import Container from '@material-ui/core/Container';
import FormComponent from './FormComponent';
import MapCardComponent from './MapCardComponent';
import LogObject from '../data/LogObject';

import Firebase from '../resources/firebase';


export default class MasterComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            location: {}
        }
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount() {

        if ("geolocation" in navigator) {
            /* geolocation is available */
            console.log("Location Available");
            navigator.geolocation.getCurrentPosition(this.success, this.error);
        } else {
            /* geolocation IS NOT available */
            console.log("Location NOT Available");
        }
    }

    success(position) {
        this.setState({
            location: position.coords
        })
    }

    error() {
        alert('Unable to retrieve your location');
    }

    submitData(data) {
        console.log({ data });
        let lo = new LogObject(data);
        // console.log({lo});
        let dbRef = Firebase.database();
        console.log(lo.getTimestampObj());
        let d = new Date();
        let tData = {
            lt : data.location.latitude,
            lo : data.location.longitude
        }
        dbRef.ref('/log/' + d.getTime()).set(tData);
    }

    render() {
        return (

            <Container maxWidth="lg">
                <FormComponent sendData={this.submitData} location={this.state.location} />
                <MapCardComponent location={this.state.location} />
            </Container>
        );
    }
}