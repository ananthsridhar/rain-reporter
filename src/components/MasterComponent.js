import React from 'react';
import Container from '@material-ui/core/Container';
import FormComponent from './FormComponent';
import MapCardComponent from './MapCardComponent';

import Firebase from '../resources/firebase';
import LogObject from '../data/LogObject';


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
        this.getUserData();
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

    getUserData = () => {
        let ref = Firebase.database().ref('/log');
        ref.on('value', snapshot => {
          const state = snapshot.val();
          console.log(state);
          let newMarks = [];
          for(var mark in state){
              newMarks.push({
                  time : mark,
                  coord : [state[mark].lo,state[mark].lt]
              })
          }
          this.setState({marks : newMarks});
        });
        console.log('DATA RETRIEVED');
      }

    submitData(data) {
        console.log({ data });
        let dbRef = Firebase.database();
        let d = new Date();
        let dData = new LogObject(data);
        dData = dData.getDetailObj();
        console.log(dData);
        let tData = {
            lt : data.location.latitude,
            lo : data.location.longitude
        }
        dbRef.ref('/log/' + d.getTime()).set(tData);
        dbRef.ref('/detail/' + d.getTime()).set(dData);
    }

    render() {
        return (

            <Container maxWidth="lg">
                <FormComponent sendData={this.submitData} location={this.state.location} />
                <MapCardComponent location={this.state.location} markers={this.state.marks}/>
            </Container>
        );
    }
}