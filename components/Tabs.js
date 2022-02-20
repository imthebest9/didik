import React from 'react';
import Tasks from './Tasks';

const Tabs = ({}) => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div className="md:p-0 p-4 mx-auto max-w-screen-lg box-content">
      <div className="flex flex-wrap ">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li
              className={
                openTab === 1
                  ? 'text-black '
                  : 'text-black ' +
                    '-mb-px mr-10px last:mr-0 text-center rounded-full'
              }
            >
              <a
                className={
                  'text-xs font-link px-5  block leading-normal text-black'
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Tasks
              </a>
            </li>
            <li
              className={
                openTab === 2
                  ? 'text-black '
                  : 'text-black ' +
                    '-mb-px mr-10px last:mr-0 text-center rounded-full gradient-header-logo'
              }
            >
              <a
                className={
                  'text-xs font-link px-5 rounded block leading-normal text-black'
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Chats
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
            <div className="px-4 py-5 flex">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <Tasks />
                  <Tasks />
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  Bye
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TabsRender({}) {
  return (
    <>
      <Tabs />
    </>
  );
}
