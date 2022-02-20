import Link from "next/link";
import React, {useEffect, useState} from "react";
import nookies from 'nookies';

const ManagerCard = ({ title, img, student, dash_ID }) => {
  const [hide, setHide] = useState();
  const userRole = nookies.get().userRole;

  useEffect(() => {
    if(userRole == "Tutor") setHide(false);
    else setHide(student);
  }, [hide]);

  return (
    <div class="max-w-sm bg-slate-400 rounded-lg border border-gray-200 shadow-md mr-6">
      <div class="flex flex-col items-center pt-10">
        <img class="mb-3 w-32 h-32" src={img} />
        <h3 class="mt-3 mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        {hide?<Link href={'/dashboard/' + dash_ID}>
          <button className="bg-yellow-200 py-1 px-6 rounded hover:bg-yellow-700">
              Visit
          </button>
        </Link>:null}
      </div>
    </div>
  );
};

export default ManagerCard;
