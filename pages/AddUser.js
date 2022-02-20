import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../auth';
import { addUser } from '../api';
import { useRouter } from 'next/router';
import Button from '../components/Button/Button';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import InputField from '../components/Input/InputField';
import uploadFiles from '../utils/uploadTask';

const AddUser = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required Field'),
    lastName: Yup.string().required('Required Field'),
    description: Yup.string().required("Require field!"),
    age: Yup.number().positive().integer().required("Require field!")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (data) => {
    // display form data on success
    
    const file = data.profpic[0];
    delete data.profpic;
    data = { ...data, uid: user.uid, emailAddress: user.email};
    console.log(data);

    console.log(file);
    try {
      setIsLoading(true);
      const userDetails = await uploadFiles(file,data,addUser);
      //const userDetails = { ...data, uid: user.uid, emailAddress: user.email };
      //console.log(userDetails);
      //setIsLoading(true);
      //const addedUser = await addUser(userDetails);
      setIsLoading(false);
      toast.success('User added');
      if (addUser) router.push('/');
    } catch (err) {
      toast.error('Failed to add');
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container mx-auto flex-1 flex items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-1/2">
            <div className="">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Tell us more about you
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid gap-6">
                      <div className="sm:col-span-6">
                        <InputField
                          label={'First Name'}
                          type={'text'}
                          name={'firstName'}
                          id={'firstName'}
                          errors={errors.firstName}
                          register={register}
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <InputField
                          label={'Last Name'}
                          type={'text'}
                          name={'lastName'}
                          id={'lastName'}
                          errors={errors.lastName}
                          register={register}
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <select
                          {...register('role')}
                          id="role"
                          name="role"
                          autoComplete="role"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Student</option>
                          <option>Tutor</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-5 sm:col-span-6">
                    <InputField
                          label={'Description'}
                          type={'text'}
                          name={'description'}
                          id={'description'}
                          errors={errors.description}
                          register={register}
                        />
                      {/* <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        {...register('description')}
                        type="text"
                        name="description"
                        id="description"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.description ? (
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          <span class="font-medium">Oops!</span>{' '}
                          {errors.description?.message}
                        </p>
                      ) : (
                        <></>
                      )} */}
                    </div>
                    <div className="mt-5 sm:col-span-6">
                      <InputField
                        label={'Age'}
                        type={'text'}
                        name={'age'}
                        id={'age'}
                        errors={errors.age}
                        register={register}
                      />
                      {/* <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>
                      <input
                        {...register('age')}
                        type="text"
                        name="age"
                        id="age"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.age ? (
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          <span class="font-medium">Oops!</span>{' '}
                          {errors.age?.message}
                        </p>
                      ) : (
                        <></>
                      )} */}
                    </div>
                    <div className="mt-5 sm:col-span-6">
                      <InputField
                        label={'Profile picture'}
                        type={'file'}
                        name={'profpic'}
                        id={'profpic'}
                        register={register}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <Button type={'submit'}>Create Account</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddUser;
