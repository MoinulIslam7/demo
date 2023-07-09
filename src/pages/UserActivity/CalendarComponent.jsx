import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

/**
 * Renders a calendar component with navigation buttons and selectable dates.
 *
 * This component displays a calendar
 * component with previous month and next month navigation buttons.
 * It allows selecting dates by clicking on specific days in the calendar. The selected date is
 * managed and passed to the `onSelect` callback prop for further processing.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onSelect - The function to be called when a date is selected.
 * @returns {JSX.Element} The rendered calendar component.
 */

function CalendarComponent({ onSelect }) {
  const [selectedDate, setSelectedDate] = useState();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    // eslint-disable-next-line no-shadow
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    onSelect(date);
  };

  const getMonthName = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  function renderCalendar() {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const getMonthDays = (month, year) => new Date(year, month + 1, 0).getDate();

    const monthDays = getMonthDays(currentMonth.getMonth(), currentMonth.getFullYear());
    const firstDayIndex = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const lastDayIndex = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    ).getDay();

    const emptyDaysStart = Array.from({ length: firstDayIndex }, (_, index) => (
      <div key={`empty-start-${index}`} className="flex justify-center items-center h-[30px] rounded cursor-pointer bg-white" />
    ));

    const monthDaysGrid = Array.from({ length: monthDays }, (_, index) => {
      const day = index + 1;
      const isSelectedDay = selectedDate;
      const isCurrentMonth = true;
      return (
        <div
          key={`day-${index}`}
          className={`flex justify-center items-center h-[30px] rounded cursor-pointer hover:bg-primary hover:text-white${isSelectedDay ? 'bg-primary' : ''} ${isCurrentMonth ? 'current-month' : ''}`}
          onClick={() => selectDate(new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
          ))}
          onKeyDown={() => { }}
          role="contentinfo"
        >
          {day}
        </div>

      );
    });

    const emptyDaysEnd = Array.from({ length: 6 - lastDayIndex }, (_, index) => (
      <div key={`empty-end-${index}`} className="flex justify-center items-center h-[30px] rounded cursor-pointer bg-white" />
    ));

    return (
      <>
        <div className="flex justify-between">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium w-[50%]">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...emptyDaysStart, ...monthDaysGrid, ...emptyDaysEnd]}
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-10 -right-40 z-10 bg-white w-[400px] p-5">
        <div className="flex justify-between items-center mb-3">
          <ArrowLeft onClick={prevMonth} className="w-5 h-5" />
          <div className="font-bold text-lg">{getMonthName(currentMonth)}</div>
          <ArrowRight onClick={prevMonth} className="w-5 h-5" />
        </div>
        <div className="calendar-body">{renderCalendar()}</div>
      </div>
    </div>
  );
}

export default CalendarComponent;
