import './CarInput.scss';
import { useDispatch } from 'react-redux';
import { setActiveCar } from '../../store/reducers/car.reducer';
import { fetchData } from '../../store/reducers/car.reducer';
import { useEffect, useState } from 'react';

export const CarInput = () => {
  const dispatch = useDispatch();
  const [dataArr, setDataArr] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(fetchData())
    .unwrap()
    .then((data) => {setDataArr(data.data.units)})
  }, []);

  const handleActiveCar = (e) => {
    setValue(e.target.value);
    dispatch(setActiveCar(value))
  }

  return (
    <label className='car-input'>
        <div className='car-input__text'>Vehicle number<span className='car-input__label-span'>*</span></div>
        <select className='car-input__select' value={value} onChange={handleActiveCar}>
          <option>Select vehicle</option>
          {dataArr.map((item) => (
            <option key={item.unit_id} value={item.unit_id}>{item.number}</option>
          ))}
        </select>
      </label>
  )
}
