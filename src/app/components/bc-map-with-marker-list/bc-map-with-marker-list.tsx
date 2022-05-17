import { useRef, useState, useEffect } from 'react';
import useSupercluster from "use-supercluster";
import Config from '../../../config';
import GoogleMapReact from 'google-map-react';
import styles from './bc-map-with-marker-list.style';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { bcMapStyle } from './bc-map-style';

import './bc-map-with-marker.scss';
import BCMapMarker from "../bc-map-marker/bc-map-marker";
import {useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import {CompanyProfileStateType} from "../../../actions/user/user.types";
import {DEFAULT_COORD} from "../../../utils/constants";

interface BCMapWithMarkerListProps {
  list: any,
  classes: any,
  lat?: any,
  lng?: any,
  showPins?: boolean,
  isTicket?: boolean,
}
function createMapOptions() {
  return {
    styles: bcMapStyle,
    'gestureHandling': 'greedy'
  };
}

const Marker = ({ children } : any) => children;

const superClusterOptions = { 
  radius: 75,
  maxZoom: 15,
  map: (props:any) => ({
    includeTicket: !!props.ticket?.ticketId,
    includeRequest: !!props.ticket?.requestId,
  }),
  reduce: (acc:any, props:any) => {
    if(!!props.includeTicket) {
      acc.includeTicket = true;
    }
    if(!!props.includeRequest) {
      acc.includeRequest = true;
    }
  },
}

const calculateColor = (cluster:any) => {
  if(cluster.properties?.includeRequest){
    return '#970505'
  }
  if(cluster.properties?.includeTicket){
    return '#2477FF'
  }
  return 'rgb(130,130,130)'
}
const calculateBorder = (cluster:any) => {
  if(cluster.properties?.includeTicket){
    return '3px solid #2477FF'
  }
  if(cluster.properties?.includeRequest){
    return '3px solid #970505'
  }
  return '3px solid rgb(130,130,130)'
}

function BCMapWithMarkerWithList({ classes, list, isTicket = false, showPins }: BCMapWithMarkerListProps) {
  const selected = useSelector((state: RootState) => state.map.ticketSelected);
  const {coordinates}: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const mapRef = useRef<any>();
  const [bounds, setBounds] = useState<any>(null);
  const [zoom, setZoom] = useState(11);

  let centerLat = coordinates?.lat || DEFAULT_COORD.lat;
  let centerLng = coordinates?.lng || DEFAULT_COORD.lng;

  // if (selected._id !== '') {
  //   if (selected.jobSite) {
  //     centerLat = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[1] ? selected.jobSite.location.coordinates[1] : centerLat;
  //     centerLng = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[0] ? selected.jobSite.location.coordinates[0] : centerLng;
  //     centerLat -= 0.004;
  //     centerLng += 0.002;
  //   } else if (selected.jobLocation) {
  //     centerLat = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[1] ? selected.jobLocation.location.coordinates[1] : centerLat;
  //     centerLng = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[0] ? selected.jobLocation.location.coordinates[0] : centerLng;
  //     centerLat -= 0.004;
  //     centerLng += 0.002;
  //   } else if (selected.customer) {
  //     centerLat = selected.customer.location && selected.customer.location.coordinates && selected.customer.location.coordinates[1] ? selected.customer.location.coordinates[1] : centerLat;
  //     centerLng = selected.customer.location && selected.customer.location.coordinates && selected.customer.location?.coordinates[0] ? selected.customer.location.coordinates[0] : centerLng;
  //     centerLat -= 0.004;
  //     centerLng += 0.002;
  //   }
  // }

  useEffect(() => {
    if(mapRef.current){
      if (selected._id) {
        let lat = centerLat;
        let lng = centerLng;
        if (selected.jobSite) {
          lat = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[1] ? selected.jobSite.location.coordinates[1] : lat;
          lng = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[0] ? selected.jobSite.location.coordinates[0] : lng;
          lat -= 0.002;
          lng += 0.002;
        } else if (selected.jobLocation) {
          lat = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[1] ? selected.jobLocation.location.coordinates[1] : lat;
          lng = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[0] ? selected.jobLocation.location.coordinates[0] : lng;
          lat -= 0.002;
          lng += 0.002;
        } else if (selected.customer) {
          lat = selected.customer.location && selected.customer.location.coordinates && selected.customer.location.coordinates[1] ? selected.customer.location.coordinates[1] : lat;
          lng = selected.customer.location && selected.customer.location.coordinates && selected.customer.location?.coordinates[0] ? selected.customer.location.coordinates[0] : lng;
          lat -= 0.002;
          lng += 0.002;
        }
        mapRef.current.setZoom(16);
        mapRef.current.panTo({ lat, lng })
      }
    }
  }, [selected])
  
  
  const points = list.map((ticket: any) => {
    let lat:any = centerLat;
    let lng:any = centerLng;
    if (ticket.jobSite) {
      lat = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[1] ? ticket.jobSite.location.coordinates[1] : centerLat;
      lng = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[0] ? ticket.jobSite.location.coordinates[0] : centerLng;
    } else if (ticket.jobLocation) {
      lat = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[1] ? ticket.jobLocation.location.coordinates[1] : centerLat;
      lng = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[0] ? ticket.jobLocation.location.coordinates[0] : centerLng;
    } else if (ticket.customer) {
      lat = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[1] ? ticket.customer.location.coordinates[1] : centerLat;
      lng = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[0] ? ticket.customer.location.coordinates[0] : centerLng;
    }
    return ({
      type: "Feature",
      properties: { cluster: false, ticketId: ticket._id, ticket },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(lng),
          parseFloat(lat)
        ]
      },
    })
  });

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: superClusterOptions
  });
  

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ 'key': Config.REACT_APP_GOOGLE_KEY }}
      center={{ 'lat': centerLat,
        'lng': centerLng }}
      defaultZoom={11}
      //onClick={event => console.log(event)}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map }) => {
        mapRef.current = map;
      }}
      onChange={({ zoom, bounds }) => {
        setZoom(zoom);
        setBounds([
          bounds.nw.lng,
          bounds.se.lat,
          bounds.se.lng,
          bounds.nw.lat
        ]);
      }}
      options={createMapOptions}>
      {
        clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const ticket = cluster.properties.ticket;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={lat}
                lng={lng}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: calculateColor(cluster),
                    borderRadius: '50%',
                    border: calculateBorder(cluster),
                    padding: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat, lng });
                  }}
                >
                  <span 
                    style={{
                      color: calculateColor(cluster),
                      marginTop: -40,
                      fontWeight: 'bold',
                    }}
                  >
                    {pointCount}
                  </span>
                </div>
              </Marker>
            );
          } else {
            return (
              <BCMapMarker
                key={`cluster-${cluster.properties.ticketId}`}
                lat={lat}
                lng={lng}
                ticket={ticket}
                isTicket={isTicket}
                classes={classes}
              />
            );
          }
        })
      }

    </GoogleMapReact>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapWithMarkerWithList);
