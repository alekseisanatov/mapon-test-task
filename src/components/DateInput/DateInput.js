import './DateInput.scss';
import { useSelector, useDispatch } from 'react-redux';
import {Calendar} from 'react-calendar';
import calendarIcon from '../../assets/Shape.png';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { setEndDate, setStartDate, toggleStartCalendar, toggleEndCalendar, turnOnButton } from '../../store/reducers/car.reducer';

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
    let dateText = (e.toLocaleString('lv-LV', {timezone: 'UTC'})).slice(0, 10);
    const dates = dateText.split('.');
    if (dates[0].length === 1) {
      dates[0] = 0 + dates[0];
    }
    dateText = dates[2] + '-' + dates[1] + '-' + dates[0];
    setStartValue(dateText);
    const stateValue = dateText + 'T12:17:21Z';
    console.log(stateValue);
    dispatch(setStartDate(stateValue));
    handleStartCalendarOpen();
  }

  const handleChangeEndDate = (e) => {
    let dateText = (e.toLocaleString('lv-LV', {timezone: 'UTC'})).slice(0, 10);
    const dates = dateText.split('.');
    if (dates[0].length === 1) {
      dates[0] = 0 + dates[0];
    }
    dateText = dates[2] + '-' + dates[1] + '-' + dates[0];
    setEndValue(dateText);
    const stateValue = dateText + 'T12:17:21Z';
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
