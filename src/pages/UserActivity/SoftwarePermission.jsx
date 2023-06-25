import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import req from '../../utils/network/req';
import { useAuth } from '../../Contexts/AuthProvider';

export default function SoftwarePermission() {
  const [isLoading, setIsLoading] = useState(false);
  const [allSoftwares, setAllSoftwares] = useState([]);
  const { apps, setApps } = useAuth();
  console.log(apps);
  useEffect(() => {
    // const apps = user?.app.map((a) => a.id);
    // setSelectedApps(apps);
    setIsLoading(true);
    req({ target: 'app' })
      .then((res) => {
        setAllSoftwares(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleApps = (e, id) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setApps(([...prev]) => ([...prev, id]));
    } else {
      setApps(([...prev]) => (prev.filter((p) => p !== id)));
    }
    console.log(isChecked, id);
  };

  if (isLoading) return <Loading />;
  return (
    <div
      style={{ boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.09)' }}
      className="absolute m-auto right-0 left-0 top-48 bottom-0 w-[828px] h-[50vh] bg-white cursor-pointer rounded-[8px] p-8"
    >
      <div className="flex gap-8">
        <div className="w-6/12">
          <p className="pb-7 font-medium">Software Permission</p>
          <div className="overflow-y-scroll hide-scrollbar h-[40vh] flex flex-col gap-5">
            {allSoftwares.map((software) => (
              <div key={software.id} className="flex justify-between items-start">
                <div className="flex justify-start items-center">
                  <img className="w-10 h-10 mr-3" src={software?.image} alt="" />
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
                    onChange={(e) => handleApps(e, software.id)}
                    checked={apps?.includes(software.id)}
                  />
                  <label className="switch" htmlFor={software.id}>
                    <span className="slider">{ }</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-6/12">
          <p className="pb-7 font-medium">All Software</p>
          <div className="overflow-y-scroll hide-scrollbar h-[40vh] flex flex-col gap-5">
            {allSoftwares.map((software) => (
              <div key={software.id} className="flex justify-between items-start">
                <div className="flex justify-start items-center">
                  <img className="w-10 h-10 mr-3" src={software?.image} alt="" />
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
                    onChange={(e) => handleApps(e, software.id)}
                    checked={apps?.includes(software.id)}
                  />
                  <label className="switch" htmlFor={software.id}>
                    <span className="slider">{ }</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
