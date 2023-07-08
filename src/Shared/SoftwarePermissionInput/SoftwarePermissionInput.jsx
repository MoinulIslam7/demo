/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import Loading from '../Loading/Loading';
import '../Input/Input.css';
import { useGlobalCtx } from '../../Contexts/GlobalProvider';
import ImageShow from '../ImageShow/ImageShow';

export default function SoftwarePermissionInput({ label, selectApps, setSelectedApps }) {
  const { allSoftwares, loading } = useGlobalCtx();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input element

  const handleApps = (e, software) => {
    const isChecked = e.target.checked;
    setSelectedApps((prev) => {
      if (isChecked) {
        return [...prev, software];
      }
      return prev.filter((item) => item.id !== software.id);
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLabelClick = () => {
    inputRef.current.focus(); // Focus on the input when the label is clicked
    toggleDropdown();
  };
  if (loading) return <Loading />;

  return (
    <div>
      <div className="w-full inputDiv">
        <div className="border border-primary rounded-[50px] outerInput">
          <input
            type="text"
            value={selectApps?.map((selected) => selected.name)}
            onClick={toggleDropdown}
            className="w-full customInput"
            readOnly
            ref={inputRef} // Attach the ref to the input element
          />
          <label
            htmlFor="Input"
            className={`${selectApps?.length !== 0 ? ' customLabel' : 'absolute left-14 top-5 z-50 cursor-text'}`}
            onClick={handleLabelClick}
            onKeyDown={() => { }}
          >
            {label}
          </label>
          {isOpen && (
            <div className="absolute left-0 top-20 z-50 bg-white w-full overflow-y-scroll hide-scrollbar h-[8rem] flex flex-col gap-5">
              {allSoftwares?.map((software) => (
                <div key={software.id} className="flex justify-between items-start">
                  <div className="flex justify-start items-center">
                    <div className="w-[50px] h-[50px] mr-4">
                      <ImageShow path={software.image} />
                    </div>
                    <div>
                      <p className="font-semibold">{software.name}</p>
                      <p className="text-body">{software.path}</p>
                    </div>
                  </div>
                  <div className="container">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={software.id}
                      onChange={(e) => handleApps(e, software)}
                      checked={selectApps.some((item) => item.id === software.id)}
                    />
                    <label className="switch" htmlFor={software.id}>
                      <span className="slider" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
