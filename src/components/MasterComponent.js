import React from 'react';
import Container from '@material-ui/core/Container';
import FormComponent from './FormComponent';
import MapCardComponent from './MapCardComponent';

import Firebase from '../resources/firebase';
import LogObject from '../data/LogObject';

import Utilities from '../resources/Utilities';


export default class MasterComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            location: {}
        }
        this.success = this.success.bind(this);
        this.submitData = this.submitData.bind(this);
        this.initializeData = this.initializeData.bind(this);
    }

    componentDidMount() {
        // this.initializeData();
        this.getUserData();
        Utilities.getLocation(this.success);
    }

    success(position) {
        //console.log("Position Updated");
        this.setState({
            location: position.coords
        })
    }

    initializeData = () => {
        let ref = Firebase.database().ref('/log');
        let data = ref.once('value').then(snapshot => {
            const state = snapshot.val();
            //console.log(state);
            let newMarks = [];
            for(var mark in state){
                newMarks.push({
                    time : mark,
                    coord : [state[mark].lo,state[mark].lt]
                })
            }
            this.setState({marks : newMarks});
          });
    }

    getUserData = () => {
        let ref = Firebase.database().ref('/log');
        ref.on('value', snapshot => {
          const state = snapshot.val();
          //console.log("Value updated" + state);
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
        //console.log({ data });
        let dbRef = Firebase.database();
        let d = new Date();
        let dData = new LogObject(data);
        dData = dData.getDetailObj();
        //console.log(dData);
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