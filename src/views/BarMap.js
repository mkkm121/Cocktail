import React, {useEffect, useState} from "react";
import {Row} from "reactstrap";
import {GoogleApiWrapper, Map} from 'google-maps-react';
const mapStyles = {
    width: '95%',
    height: '86%',
    margin: 'auto',
    top: '60px',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',

};

function BarMap(props) {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    let savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    const fetchWeather = async () => {
        console.log('key')
        console.log(process.env.REACT_APP_GOOGLE_MAP_PUBLIC)
        console.log(process.env.REACT_APP_GOOGLE_MAP_PUBLIC)
        try {
            window.navigator.geolocation.getCurrentPosition(savePositionToState);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [latitude, longitude])
    return (
        <>
            <div className="content">
                <Row>
                    {latitude && longitude &&
                    <Map
                        google={props.google}
                        zoom={16}
                        style={mapStyles}
                        initialCenter={
                            {
                                lat: latitude,
                                lng: longitude
                            }
                        }
                    />
                    }
                </Row>
            </div>
        </>
    );
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_PUBLIC
})(BarMap);
