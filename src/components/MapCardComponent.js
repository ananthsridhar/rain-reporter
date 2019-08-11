import React from 'react';
import { Constants } from '../resources/Constants';

import { Typography, Card, CardContent, Grid, Select, MenuItem } from '@material-ui/core';
import ReactMapboxGl, { Marker,Popup } from 'react-mapbox-gl';
import Utilities from '../resources/Utilities';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

const Mark = () => {
    return (<div style={{
        'backgroundColor': '#e74c3c',
        'borderRadius': '50%',
        'width': '15px',
        'height': '15px',
        'border': '4px solid #eaa29b'
    }}></div>);
};
const CurrMark = () => {
    return (<div style={{
        'backgroundColor': 'blue',
        'borderRadius': '50%',
        'width': '5px',
        'height': '5px',
        'border': '2px solid blue'
    }}></div>);
};

export default class MapCardComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log("Props : ");
        console.log(props);
        this.state = {
            mapFilter: Constants.MONTH,
            viewport: {
                width: '100%',
                height: 400,
                zoom: 12
            },
            markers: (props.markers ? props.markers : [])
        }
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //     markers: (this.props.markers ? this.props.markers : [])
        // })
    }

    componentWillReceiveProps(nextProps) {
        console.log("New Props");

        if (nextProps.markers) {
            this.filterMarkers(nextProps.markers, this.state.mapFilter);
        }
    }

    filterMarkers(newMarkers, val) {
        let low = Utilities.getTimeLowerBound((val ? val : Constants.ALL));
        let newMarks = this.state.markers;
        if (newMarkers) {
            newMarks = newMarkers.filter((mark) => {
                let tD = new Date(parseInt(mark.time));
                return (tD > low ? true : false);
            })
        }

        this.setState({
            lowerTimeBound: low,
            markers: newMarks
        })
    }

    handleFilter(e) {
        e.preventDefault();
        let key = e.target.name;
        if (e.target.value !== this.state[key]) {
            let low = Utilities.getTimeLowerBound(e.target.value);
            let newMarks = this.state.markers;
            //console.log(this.state.markers);
            if (this.props.markers) {

                newMarks = this.props.markers.filter((mark) => {
                    let tD = new Date(parseInt(mark.time));
                    return (tD > low ? true : false);
                })
                //console.log(newMarks);
            }

            this.setState({
                [key]: e.target.value,
                lowerTimeBound: low,
                markers: newMarks
            })
        }

    }

    render() {

        // console.log(centerC);
        let { longitude, latitude } = this.props.location;
        let centerC = [(typeof longitude != "undefined" ? longitude : 80.2209792), (typeof latitude != "undefined" ? latitude : 13.04576)];
        console.log("RE-render");
        return (
            <Card style={{ minWidth: 275, marginTop: 20, marginBottom: 20 }}>
                <CardContent>
                    <Grid container spacing={1}>
                        {/* <Grid item xs={2} align={'right'}>
                            <Typography variant="h6" component="h6" align={'right'}>
                                Show Data from :
                            </Typography>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6">
                                Show Data from :
                            </Typography>
                            <Select
                                value={this.state.mapFilter}
                                onChange={(e) => this.handleFilter(e)}
                                inputProps={{
                                    name: 'mapFilter',
                                    id: 'map-filters',
                                }}
                                style={{ width: '50%', border: '2px solid white' }}
                            >
                                {Constants.mapFilterList.map((d, i) => {
                                    return (<MenuItem value={d.value} key={i}>{d.label}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Map
                                style={"mapbox://styles/mapbox/streets-v8"}
                                containerStyle={{
                                    height: 400,
                                    width: '100%'
                                }}
                                center={centerC}
                            >
                                {this.state.markers &&
                                    this.state.markers.map((mark) => {
                                        return (<MapMarker mark={mark} key={mark.time} />
                                        );
                                    })
                                }
                                <Marker coordinates={centerC}>
                                    <CurrMark />
                                </Marker>
                            </Map>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

class MapMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false
        }

        this.toggleDetail = this.toggleDetail.bind(this);
    }

    toggleDetail() {
        this.setState((prevState)=>{
            return ({showDetail : !prevState.showDetail})
        })
    }

    render() {
        return (
            <div>
                
                    <Marker coordinates={this.props.mark.coord} onClick={this.toggleDetail}>
                        <Mark />                       
                    </Marker>
                {this.state.showDetail &&
                    <Popup
                        coordinates={this.props.mark.coord}
                        offset={{
                            'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                        }}
                        style={{zIndex : 999}}
                        onClick={this.toggleDetail}>
                        <div style={markerStyle}>
                                <h3>Time : {Utilities.getFormattedTime(this.props.mark.time)}</h3>
                                <p>Rain Level : {Utilities.getIntensity('rain',this.props.mark.rainIntensity)}</p>
                                <p>Waterlogging Level : {Utilities.getIntensity('flood',this.props.mark.floodIntensity)}</p>
                            </div>
                    </Popup>}
            </div>
        )
    }


}

const markerStyle = {
    color : 'black',
    backgroundColor: "white",
    padding: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5
}