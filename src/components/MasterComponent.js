import React from 'react';
import Container from '@material-ui/core/Container';
import FormComponent from './FormComponent';
import MapCardComponent from './MapCardComponent';


export default class MasterComponent extends React.Component {
    constructor() {
        super();
        this.submitData = this.submitData.bind(this);
    }

    submitData(data){
        console.log({data});
    }

    render() {
        return (

            <Container maxWidth="lg">
                <FormComponent sendData={this.submitData}/>
                <MapCardComponent />
            </Container>
        );
    }
}