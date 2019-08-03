import React from 'react';
import { Card, CardContent, Grid, Button, Select, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Constants } from '../resources/Constants';


export default class FormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rainIntensity: 10,
            floodIntensity: 0
        }
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount() {
        this.intervalT = setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }, 1000);
       
    }
    componentWillUnmount() {
        clearInterval(this.intervalT);
    }

    handleChange(e) {
        e.preventDefault();
        let key = e.target.name;
        this.setState({
            [key]: e.target.value
        })
    }

    submitData() {
        let data = {
            timestamp : this.state.curTime,
            location: this.props.location,
            rainIntensity: this.state.rainIntensity,
            floodIntensity: this.state.floodIntensity
        }
        this.props.sendData(data);
    }

    render() {
        return (
            <Card style={{ minWidth: 275, marginTop: 20 }}>
                <CardContent>

                    {/* <Typography variant="h5" component="h2">
                        RAIN LOG
                            </Typography> */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>[Time]</Typography>
                            <Typography>{this.state.curTime}</Typography>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Typography>[Location]</Typography>
                            <Typography>{this.props.location != null ? this.props.location.latitude : 'Loading'}</Typography>
                            <Typography>{this.props.location != null ? this.props.location.longitude : 'Loading'}</Typography>
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <Typography>[Rain Intensity]</Typography>
                            <Select
                                value={this.state.rainIntensity}
                                onChange={(e) => this.handleChange(e)}
                                inputProps={{
                                    name: 'rainIntensity',
                                    id: 'rain-intensity',
                                }}
                                style={{width : '80%'}}
                            >
                                {Constants.rainIntensityList.map((d, i) => {
                                    return (<MenuItem value={d.value} key={i}>{d.label}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>[Waterlogging Intensity]</Typography>
                            <Select
                                value={this.state.floodIntensity}
                                onChange={(e) => this.handleChange(e)}
                                inputProps={{
                                    name: 'floodIntensity',
                                    id: 'flood-intensity',
                                }}
                                style={{width : '80%'}}
                            >
                                {Constants.floodIntensityList.map((d, i) => {
                                    return (<MenuItem value={d.value} key={i}>{d.label}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary" onClick={this.submitData}>Report</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}