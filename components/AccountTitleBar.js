import Head from "next/head";
import React, {useEffect,useState} from 'react';
import { receiveUser } from "../api";
import EditInfo from "./EditInfo";
import nookies from 'nookies';

const AccountTitleBar = (props) => {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(props.edit);
    
    const userId = nookies.get().userId;

    const handleShow = () => setShow(true);

    useEffect(async () => {
        const res = await receiveUser(userId);
        setUser(res);
        if(!hide) setUser(props.profile);
    }, [user]);
    console.log(user);
    return (
        <div>
            <Head>
                <title>Account Manager</title>
                <link rel="icon" href="/didikIcon.ico" />
            </Head>
            <div>{show && <EditInfo handleClose={setShow} user = {user}/>}</div>
            <div className="flex flex-row gap-8 md:container md:mx-auto mt-10 columns-2 px-5 pb-7 border-b-4">
                <div className="basis-1/4">
                    <h1 className="px-3 text-lg font-medium">{user?.firstName} {user?.lastName}</h1><br></br>
                    <img
                        className=" border-black h-52 w-52 rounded-full border-2 object-fill scale-100 max-w-full h-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300"
                        src= {user?.profilePic}
                    />
                </div>
                <div className="basis-3/4 flex flex-col justify-around">
                    <div className="pb-3 pl-5 flex justify-between">
                        <p className="inline-block px-6 py-2.5 text-black font-small text-base leading-tight rounded">
                            My Information
                        </p>
                        {hide?<button onClick={handleShow} className="inline-block px-6 py-2.5 bg-yellow-200 text-black font-medium text-xs leading-tight rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Edit Information
                        </button>:null}
                        
                    </div>
                    <div className="flex flex-row justify-around">
                        <div>
                            <div className="text-center px-6 border-b border-slate-300 rounded-t-lg bg-orange-300">
                                Name
                            </div>
                            <div className="colors rounded-b-lg">
                                <p className="px-6 w-80 text-center p-2 text-black font-medium text-sm leading-tight rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="text-center px-6 border-b border-slate-300 rounded-t-lg bg-orange-300">
                                Description
                            </div>
                            <div className="colors rounded-b-lg">
                                <p className="px-6 w-80 text-center p-2 text-black font-medium text-sm leading-tight rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    {user?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-row justify-around">
                        <div>
                            <div className="text-center px-6 border-b border-slate-300 rounded-t-lg bg-orange-300">
                                Age
                            </div>
                            <div className="colors rounded-b-lg">
                                <p className="px-6 w-80 text-center p-2 text-black font-medium text-sm leading-tight rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    {user?.age}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="text-center px-6 border-b border-slate-300 rounded-t-lg bg-orange-300">
                                Email Address
                            </div>
                            <div className="colors rounded-b-lg">
                                <p className="px-6 w-80 text-center p-2 text-black font-medium text-sm leading-tight rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    {user?.emailAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountTitleBar;