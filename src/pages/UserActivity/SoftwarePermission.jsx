import React from 'react';
import { useGlobalCtx } from '../../Contexts/GlobalProvider';
import { useAuth } from '../../Contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import ImageShow from '../../Shared/ImageShow/ImageShow';

export default function SoftwarePermission({ selectedUser, setSelectedUser }) {
  const { allSoftwares, loading } = useGlobalCtx();
  const { updateOne, allusers, setAllUsers } = useAuth();

  const handleApps = async (e, software) => {
    const isChecked = e.target.checked;
    let updatedUser;

    if (isChecked) {
      updatedUser = {
        ...selectedUser,
        app: [software, ...selectedUser.app],
      };
    } else {
      updatedUser = {
        ...selectedUser,
        app: selectedUser.app.filter((app) => app.id !== software.id),
      };
    }

    setSelectedUser(updatedUser);
    await updateOne(selectedUser.id, { app: updatedUser.app.map((app) => app.id) });

    // Update the selected user in setAllUsers
    const updatedAllUsers = allusers.map((user) => {
      if (user.id === selectedUser.id) {
        return updatedUser;
      }
      return user;
    });
    setAllUsers(updatedAllUsers);
  };

  const isAppSelected = (software) => selectedUser?.app?.some((app) => app.id === software.id);

  // Separate selected apps and unselected apps
  const selectedApps = allSoftwares.filter(isAppSelected);
  const unselectedApps = allSoftwares.filter((software) => !isAppSelected(software));

  // Sort selected apps by the reverse order of their appearance
  selectedApps.reverse();

  // Sort unselected apps by the reverse order of their appearance
  unselectedApps.reverse();

  if (loading) return <Loading />;
  return (
    <div
      style={{ boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.09)' }}
      className="absolute m-auto right-0 left-0 top-60 bottom-0 w-[828px] h-[50vh] bg-white cursor-pointer rounded-[8px] p-8"
    >
      <div className="flex gap-8">
        <div className="w-6/12">
          <p className="pb-7 font-medium">Software Permission</p>
          <div className="overflow-y-scroll hide-scrollbar h-[40vh] flex flex-col gap-5">
            {selectedApps.map((software) => (
              <div key={software.id} className="flex justify-between items-start">
                <div className="flex justify-start items-center">
                  <div className="w-10 h-10 mr-3">
                    <ImageShow path={software?.image} />
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
                    checked={isAppSelected(software)}
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
            {selectedApps.map((software) => (
              <div key={software.id} className="flex justify-between items-start">
                <div className="flex justify-start items-center">
                  <div className="w-10 h-10 mr-3">
                    <ImageShow path={software?.image} />
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
                    checked={isAppSelected(software)}
                  />
                  <label className="switch" htmlFor={software.id}>
                    <span className="slider">{ }</span>
                  </label>
                </div>
              </div>
            ))}
            {unselectedApps.map((software) => (
              <div key={software.id} className="flex justify-between items-start">
                <div className="flex justify-start items-center">
                  <div className="w-10 h-10 mr-3">
                    <ImageShow path={software?.image} />
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
                    checked={isAppSelected(software)}
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
