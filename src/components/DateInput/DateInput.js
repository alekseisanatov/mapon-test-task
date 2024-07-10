import './DateInput.scss';
import { useSelector, useDispatch } from 'react-redux';
import {Calendar} from 'react-calendar';
import calendarIcon from '../../assets/Shape.png';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { setEndDate, setStartDate, toggleStartCalendar, toggleEndCalendar } from '../../store/reducers/car.reducer';

export const DateInput = () => {
  const dispatch = useDispatch();
  const calendarObj = useSelector((state) => state.cars);
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');

  const handleStartCalendarOpen = () => {
    dispatch(toggleStartCalendar());
  }
  const handleEndCalendarOpen = () => {
    dispatch(toggleEndCalendar());
  }

  const handleChangeStartDate = (e) => {
    const dateText = (e.toLocaleString('lv-LV', {timezone: 'UTC'})).slice(0, 10);
    setStartValue(dateText.split('.').reverse().join('-'));
    const stateValue = startValue + 'T12:17:21Z';
    dispatch(setStartDate(stateValue));
    handleStartCalendarOpen();
  }

  const handleChangeEndDate = (e) => {
    const dateText = (e.toLocaleString('lv-LV', {timezone: 'UTC'})).slice(0, 10);
    setEndValue(dateText.split('.').reverse().join('-'));
    const stateValue = endValue + 'T12:17:21Z';
    dispatch(setEndDate(stateValue));
    handleEndCalendarOpen();
  }

  return (
    <div className='form__period'>
      <h3 className='form__period-title'>Period</h3>
      <div className='form__period-calendar'>
      <div className='form__period-calendar-item'>
        <h3 className='form__period-calendar-title'>From</h3>
        <div className='form__period-calendar-wrapper' onClick={handleStartCalendarOpen}>
          <span className='form__period-calendar-start-date'>{startValue}</span>
          <img src={calendarIcon} alt='calendar-icon'/>
        </div>
        <Calendar className={`form__period-calendar-custom ${calendarObj.isStartCalendarOpen ? '' : 'hidden'}`} value={calendarObj.startDate} onChange={handleChangeStartDate} />
      </div>
      <div className='form__period-calendar-item'>
        <h3 className='form__period-calendar-title'>To</h3>
        <div className='form__period-calendar-wrapper' onClick={handleEndCalendarOpen}>
          <span className='form__period-calendar-end-date'>{endValue}</span>
          <img src={calendarIcon} alt='calendar-icon'/>
        </div>
        <Calendar className={`form__period-calendar-custom ${calendarObj.isEndCalendarOpen ? '' : 'hidden'}`} value={calendarObj.endDate} onChange={handleChangeEndDate} />
      </div>
      </div>
    </div>
  )
}
