import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import * as deliveryData from '../data/delivery.json';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

export default class Map extends Component {

    state = {
        viewport: {
            latitude:  1.3557759999999999,
            longitude: 103.82000599999999,
            width:"60vw",
            height:"100vh",
            zoom:10
        },

        selectedPark: null,
        setSelectedPark: null

    };

    handleClick = (e,value) => {
        e.preventDefault();
        this.setState({ selectedPark : value });
    }

    bgcColor =(zone) =>{
        switch(zone){
            case 'North East':
                return 'orange';
                break;
            case 'North':
                return 'red';
                break;
            case 'Central':
                return '#d0ffd0';
                break;
            case 'West':
                return '#a3ceea';
                break;
            default:
                return '#c390c3';
                break;
        }
    }

    render() {
        const {selectedPark} = this.state;
        return (
            <ReactMapGL
                mapboxAPIAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/rebgoh228/ck00zvjx94xpf1cs85pz4anyj"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
                >
                {deliveryData.data.map((delivery) => (
                    <Marker
                        key={delivery.id}
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
                                this.setState({ selectedPark : null })
                            }>
                        <div>
                            {selectedPark.n_packages}
                        </div>
                    </Popup>
                ):
                null}

            </ReactMapGL>
        );
    }
}