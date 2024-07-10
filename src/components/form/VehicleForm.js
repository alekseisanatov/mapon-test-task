import './VehicleForm.scss';
import 'react-calendar/dist/Calendar.css';
import { DateInput } from '../DateInput/DateInput';
import { CarInput } from '../CarInput/CarInput';
import { Button } from '../Button/Button';
import GoogleApi from '../GoogleAPI/GoogleAPI';
import { fetchRouteData } from '../../store/reducers/car.reducer';
import { toggleGoogleMap, countDistance, restartDistanceCount, setCoord, clearCoords } from '../../store/reducers/car.reducer';
import { useDispatch, useSelector } from 'react-redux';

export const VehicleForm = () => {
  const cars = useSelector((state) => state.cars);
  const isGoogleOpen = cars.isGoogleMapOpen;
  const dispatch = useDispatch();
  const filteredRoutes = [];
  console.log(cars);

  const handleGenerateRequest = () => {
    dispatch(clearCoords());
    dispatch(toggleGoogleMap());
    dispatch(fetchRouteData())
      .unwrap()
      .then((data) => {filteredRoutes.push(data.data.units[0].routes.filter((item) => item.type === 'route'))})
      .then(() => {
        console.log(filteredRoutes);
        dispatch(restartDistanceCount())
        filteredRoutes[0].forEach((item) => {
          console.log(item.start);
          const coordsObj = {
            start: {
              lat: item.start.lat, 
              lng: item.start.lng
            }, 
            end: {
              lat: item.end.lat, 
              lng: item.end.lng
            }
          }
          dispatch(setCoord({coordsObj}));
          dispatch(countDistance(item.distance));
        })
      })
  }

  return (
    <div className={`form ${isGoogleOpen ? 'form-active' : ''}`}>
      <h2 className="form__title">Route report</h2>
      <CarInput />
      <DateInput />
      <GoogleApi isOpen={isGoogleOpen}/>
      <div className='form__bottom-container'>
        <Button text={'Generate'} onClick={handleGenerateRequest} />
      </div>
    </div>
  )
}
