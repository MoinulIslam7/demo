import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from '@phosphor-icons/react';
import CalendarComponent from './CalendarComponent';
import ModalWrapper from '../../Hooks/ModalWrapper';

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
          <ModalWrapper modalRef={modalRef}>
            <CalendarComponent
              onSelect={handleDateSelect}
            />
          </ModalWrapper>
          {/* <div>
            {showModal && createPortal(
              <CalendarComponent
                onSelect={handleDateSelect}
                onClose={() => setShowModal(false)}
              />,
              document.body,
            )}
          </div> */}
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
/*
import React, { useEffect, useRef } from 'react';
import PopperComponent from './PopperComponent'; // Assuming the component is in a separate file

function App() {
  const modalRef = useRef(null);

  return (
    <div>
      <h1>Example React App</h1>
      <button onClick={() => modalRef.current.classList.remove('hidden')}>Show Popper</button>

      <PopperComponent modalRef={modalRef}>
        <p>This is the content inside the PopperComponent.</p>
      </PopperComponent>
    </div>
  );
}

export default App;

*/
