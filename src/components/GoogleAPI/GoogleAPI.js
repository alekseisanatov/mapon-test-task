import {APIProvider, Map, Marker, useMapsLibrary,
  useMap, Polyline} from '@vis.gl/react-google-maps';
import { useSelector } from 'react-redux';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API;

function GoogleApi({isOpen}) {
  const position = {lat: 56.946285, lng: 24.105078};
  const cars = useSelector((state) => state.cars);
  const coords = cars.startCoords;

  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <Map className={`form__map ${isOpen ? '' : 'hidden'}`} defaultCenter={position} defaultZoom={10}>
        <Marker position={position} />
        {coords.map((item) => (
          <Marker key={Math.floor(Math.random() * 100)} position={item.coordsObj.start} />
        ))}
      </Map>
      <div className={`form__map-data ${isOpen ? '' : 'hidden'}`}>
        <div className='form__map-data-item'>
          <span className='form__map-data-item-number'>{cars.totalDistance}</span>
          <span className='form__map-data-item-info'>Km driven</span>
        </div>
        <div className='form__map-data-item'>
          <span className='form__map-data-item-number'>3h 20m</span>
          <span className='form__map-data-item-info'>Driving time</span>
        </div>
        <div className='form__map-data-item'>
          <span className='form__map-data-item-number'>1h 5m</span>
          <span className='form__map-data-item-info'>Driving time</span>
        </div>
      </div>
    </APIProvider>
  );
}

export default GoogleApi;