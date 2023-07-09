import React from 'react';
import Dropdown from '../../Shared/Dropdown/Dropdown';
import Tooltip from '../../Shared/Tooltip/Tooltip';
import './AdminHome.css';
import AdminNavbar from './AdminNavbar';
import Loading from '../../Shared/Loading/Loading';
import { useAuth } from '../../Contexts/AuthProvider';
import { useGlobalCtx } from '../../Contexts/GlobalProvider';
import ImageShow from '../../Shared/ImageShow/ImageShow';

/**
 * Renders the Admin Home component.
 * Show all users and all apps.
 * @returns {JSX.Element} Admin Home component.
 */
function AdminHome() {
  const { allusers, isLoading } = useAuth();
  const { allSoftwares, loading } = useGlobalCtx();

  if (isLoading || loading) return <Loading />;

  return (
    <div className="bg-bodyBg">
      <div>
        <AdminNavbar />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-white pt-8 flex justify-center items-center">
          <div>
            <div className="flex justify-center items-center mb-5">
              <p className="text-[20px] text-textPrimary leading-6 mr-[10px]">All Software</p>
              <Tooltip information="List of All software" />
            </div>
            <div className="overflow-y-scroll hide-scrollbar h-[85vh] flex flex-col px-96">
              {allSoftwares.map((software) => (
                <div key={software.id} className="py-5 bg-white w-[145px] h-auto px-2 mb-8 border border-borderColor rounded-3xl flex flex-col justify-center items-center cursor-pointer">
                  <div className="w-14 h-14">
                    <ImageShow path={software.image} />
                  </div>
                  <p className="text-heading pt-2">{software.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-10 mt-8 px-5">
          <div className="flex justify-start items-center mb-5">
            <p className="text-[20px] text-textPrimary leading-6 mr-[10px]">All User List</p>
            <Tooltip information="All User List" />
          </div>
          <div className="overflow-y-scroll hide-scrollbar h-[85vh] flex flex-col gap-8">
            {allusers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white px-5 py-3 hover:bg-background [&>*:nth-child(3)]:hover:bg-primary [&>*:nth-child(3)]:hover:text-white"
              >
                <div className="flex justify-start items-center w-full md:w-4/12">
                  <div className="w-20 h-20 mr-4 rounded-[50px] overflow-hidden">
                    <ImageShow path={user?.avatar} />
                  </div>
                  <div>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="flex justify-start items-center w-full md:w-6/12 gap-4">
                  {user.app.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="py-2 bg-white w-20 h-20 border border-borderColor rounded-3xl flex flex-col justify-start items-center"
                    >
                      <div className="w-16 h-16">
                        <ImageShow path={app.image} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-center rounded-md">
                  <Dropdown user={user} id={user.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
