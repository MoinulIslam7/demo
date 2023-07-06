import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from '@phosphor-icons/react';
import CalendarComponent from './CalendarComponent';
import Modal from '../../Hooks/Modal';

function DateComponent() {
  const [date, setDate] = useState(new Date());
  const modalRef = useRef(null);

  const goToPreviousDay = () => {
    setDate((prevDate) => {
      const previousDay = new Date(prevDate);
      previousDay.setDate(previousDay.getDate() - 1);
      return previousDay;
    });
  };

  const goToNextDay = () => {
    setDate((prevDate) => {
      const nextDay = new Date(prevDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    });
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <div className="flex justify-start items-center py-3 px-2 bg-white cursor-pointer">
        <ArrowLeft size={32} onClick={goToPreviousDay} />
      </div>

      <div>
        <div className="flex justify-start items-center py-3 px-2 bg-white cursor-pointer w-[200px]" onClick={() => modalRef.current.classList.remove('hidden')} onKeyDown={() => { }} role="contentinfo">
          <Calendar color="#50AB27" size={32} />
          <Modal modalRef={modalRef}>
            <CalendarComponent
              onSelect={handleDateSelect}
            />
          </Modal>
          <p className="ml-2 text-body">{date.toDateString()}</p>
        </div>
      </div>

      <div className="flex justify-start items-center py-3 px-2 bg-white cursor-pointer">
        <ArrowRight size={32} onClick={goToNextDay} />
      </div>
    </div>
  );
}

export default DateComponent;
