import axios from 'axios';
import React, {useState} from 'react'
import { editUser } from '../api';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from 'next/router';


const EditInfo = ({handleClose, user}) => {
    console.log(user);
    const router = useRouter();
    const schema = yup.object().shape({
        firstName: yup.string().required("Required field!"),
        lastName: yup.string().required("Required field!"),
        age: yup.number().positive().integer().required("Require field!"),
        description: yup.string().required("Require field!")
    })

    const {register, handleSubmit, setError} = useForm({
        resolver: yupResolver(schema),
    })

    const submitForm = async (data) => {
        console.log(user._id);
        try{
            const userDetails = {uid:user.uid,role:user.role,emailAddress:user.emailAddress,...data};
            console.log(userDetails);
            const editedUser = await editUser(user._id, userDetails);
            if (editedUser) handleClose(false);
        } catch(err){console.log(err)}
    };
    
    return (
        <div className='fixed inset-0 backdrop-blur-sm z-50'>
            <div className='bg-amber-50 ml-80 mr-80 mt-3 flex items-center flex-col'>
                <div className='ml-96 pl-40'>
                    <button onClick={() => handleClose(false)} className='bg-black hover:bg-slate-200 rounded-full h-10 w-10 ordinal text-amber-600'>X</button>
                </div>
                <div className='text-4xl'>
                    <h1 className='font-medium text-zinc-500'>
                        Edit Profile Information
                    </h1>
                </div>
                <div className='mt-3 mb-5 flex justify-center p-6 rounded-lg shadow-lg bg-slate-200 max-w-md'>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First name
                        </label>
                        <input 
                            type="text" 
                            name= "firstName" 
                            className="rounded-full pl-3"
                            defaultValue={user?.firstName}
                            {...register('firstName')}
                        />
                        <p>{setError.firstName?.message}</p>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 pt-2"
                        >
                            Last name
                        </label>
                        <input 
                            type="text" 
                            name= "lastName" 
                            defaultValue= {user?.lastName}
                            {...register('lastName')} 
                            className="rounded-full pl-3"
                        />
                        <p>{setError.lastName?.message}</p>
                        <label
                            htmlFor="emailAddress"
                            className="block text-sm font-medium text-gray-700 pt-2"
                        >
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name= "emailAddress" 
                            disabled
                            value={user?.emailAddress}
                            className="rounded-full pl-3" 
                        />
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 pt-2"
                        >
                            description
                        </label>
                        <input 
                            type="text" 
                            name= "description" 
                            className="rounded-full pl-3"
                            defaultValue={user?.description}
                            {...register('description')}
                        />
                        <p>{setError.description?.message}</p>
                        <label
                            htmlFor="age"
                            className="block text-sm font-medium text-gray-700 pt-2"
                        >
                            Age
                        </label>
                        <input 
                            type="text" 
                            name= "age" 
                            className="rounded-full pl-3"
                            defaultValue={user?.age}
                            {...register('age')}
                        />
                        <p>{setError.age?.message}</p>
                        <div className="px-4 py-3 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditInfo
