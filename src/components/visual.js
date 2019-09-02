import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as deliveryData from "../data/delivery";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

const useStyles =
    {
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
        color:'white',
    },
};

const months = [
    'Current',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May'
];

const zones = [
    'All',
    'North East',
    'North',
    'Central',
    'West',
    'East'
];

const timing = [
    'All',
    '9am - 1pm',
    '1pm - 5pm',
    '5pm - 9pm',
];

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const deliveryZoneData = [
    {'name' : 'North East'},
    {'name' : 'North'},
    {'name' : 'Central'},
    {'name' : 'West'},
    {'name' : 'East'}
];

export default class Visualization extends Component {

    state = {
        viewport: {
            latitude:  1.3457759999999999,
            longitude: 103.90000599999999,
            width:"100vw",
            height:"75vh",
            zoom:10
        },
        mapZone: 'All',
        mapTime: 'All',
        mapMonth: 'Current',
        data: deliveryData.data,
        selectedPark: null,
        setSelectedPark: null,
        zoneData: deliveryZoneData
    };

    handleClick = (e,value) => {
        e.preventDefault();
        this.setState({ selectedPark : value });
    }


    handleChange = (event) => {
        console.log(event.target.name);

        console.log(event.target.value);
        this.setState({   [event.target.name]: event.target.value}
        ,()=>{
            this.handleFilter();
        });

    }

    handleFilter = () =>{
        let newData = deliveryData.data;
        let newZoneData = deliveryZoneData;

        let time1 = new Date();
        let time2 = new Date();

        switch(this.state.mapTime){
            case '9am - 1pm':
                time1.setHours(9);
                time1.setMinutes(0);
                time1.setSeconds(0);

                time2.setHours(13);
                time2.setMinutes(0);
                time2.setSeconds(0);
                break;
            case '1pm - 5pm':
                time1.setHours(13);
                time1.setMinutes(0);
                time1.setSeconds(0);

                time2.setHours(17);
                time2.setMinutes(0);
                time2.setSeconds(0);
                break;

           default:
                time1.setHours(13);
                time1.setMinutes(0);
                time1.setSeconds(0);

                time2.setHours(17);
                time2.setMinutes(0);
                time2.setSeconds(0);
                break;
        }

        if(this.state.mapZone !== 'All'){
            newData = newData.filter(value => value.zone === this.state.mapZone);
        }

        if(this.state.mapTime !== 'All'){
            newData = newData.filter(value => (new Date(value.delivered_at).getHours()) >= time1.getHours() && (new Date(value.delivered_at).getHours()) <= time2.getHours() );
        }



        this.setState({  data: newData, zoneData: newZoneData}
            ,()=>{
            });
    }

    bgcColor =(zone) =>{
        switch(zone){
            case 'North East':
                return 'orange';
            case 'North':
                return 'red';
            case 'Central':
                return '#d0ffd0';
            case 'West':
                return '#a3ceea';
            default:
                return '#c390c3';
        }
    }

    setViewport = (viewport) => {
        this.setState({ viewport : viewport})
    }

    onClose = () =>{
        this.setState({ selectedPark : null })
    }

    render() {
        const {selectedPark, viewport,mapMonth,mapZone,mapTime, data, zoneData } = this.state;
        return (

            <div style={useStyles.root}>
                <AppBar position="static" style={{backgroundColor: 'black', color: 'white'}}>
                    <Toolbar>
                        <Typography variant="h6" style={useStyles.title}>
                            Failed Delivery
                        </Typography>
                        <Button color="inherit">Month:</Button>
                        <Select
                            style={{color: 'white', borderBottom: '0.5px solid grey'}}
                            value={mapMonth}
                            onChange={(e)=>this.handleChange(e)}
                            inputProps={{
                                name: 'mapMonth',
                            }}
                        >
                            {months.map(month => (
                                <MenuItem key={month} value={month}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button color="inherit">Zone:</Button>
                        <Select
                            style={{color: 'white', borderBottom: '0.5px solid grey'}}
                            value={mapZone}
                            onChange={(e)=>this.handleChange(e)}
                            inputProps={{
                                name: 'mapZone',
                            }}
                        >
                            {zones.map(zone => (
                                <MenuItem key={zone} value={zone}>
                                    {zone}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button color="inherit">Delivery Slot:</Button>

                        <Select
                            style={{color: 'white', borderBottom: '0.5px solid grey'}}
                            value={mapTime}
                            onChange={(e)=>this.handleChange(e)}
                            inputProps={{
                                name: 'mapTime',
                            }}
                        >
                            {timing.map(time => (
                                <MenuItem key={time} value={time}>
                                    {time}
                                </MenuItem>
                            ))}
                        </Select>
                    </Toolbar>
                </AppBar>

                <Grid container className="content">
                    <Grid item xs={3}>
                        <Grid container>
                            {zoneData.map(zone => (
                                <Grid item xs={12} >
                                    <Paper className="zone" style={{color:this.bgcColor(zone.name)}}>{zone.name}
                                        <Grid className="zone-content" container style={{textAlign:'center'}}>
                                            <Grid item xs={12}>
                                                <h1> {data.filter(value => value.zone === zone.name).length} </h1>
                                            </Grid>

                                        </Grid>
                                    </Paper>

                                </Grid>
                            ))}
                        </Grid>

                    </Grid>

                    <Grid item xs={9}>
                        <ReactMapGL
                            mapboxAPIAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                            mapStyle="mapbox://styles/rebgoh228/ck00zvjx94xpf1cs85pz4anyj"
                            {...viewport}
                            onViewportChange={(viewport) => this.setViewport(viewport)}
                        >
                            {data.map((delivery,key) => (
                                <Marker
                                    key={delivery.id+key}
                                    latitude={delivery.latitude}
                                    longitude={delivery.longitude}
                                >
                                    <svg
                                        height={20}
                                        viewBox="0 0 24 24"
                                        style={{
                                            cursor: 'pointer',
                                            fill: this.bgcColor(delivery.zone),
                                            stroke: 'none',
                                            transform: `translate(${-20 / 2}px,${-20}px)`
                                        }}
                                        onClick={(e)=> {
                                            this.handleClick(e, delivery)
                                        }}>
                                        <path d={ICON} />
                                    </svg>
                                </Marker>
                            ))
                            }
                            {selectedPark ? (
                                    <Popup  latitude={selectedPark.latitude}
                                            longitude={selectedPark.longitude}
                                            onClose={()=>
                                                this.onClose()
                                            }>
                                        <div style={{fontSize:'10px'}}>
                                            Reason: Nobody at home<br/>
                                            No. of package: {selectedPark.n_packages}
                                        </div>
                                    </Popup>
                                ):
                                null}
                        </ReactMapGL>
                    </Grid>
                </Grid>
            </div>
            );
        }
}