import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 1.355025,
            lng: 103.858525
        },
        zoom: 16
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCSMkfRxGR31FAus6RJdroXDS0_fmIpFsk'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={1.355025}
                        lng={103.858525}
                        text="Augend & Addend"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;