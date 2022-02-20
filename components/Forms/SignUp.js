import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUpForm = ({ onSubmit, onClick }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      class="rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          {...register('email')}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
        {errors.email ? (
          <p class="text-red-500 text-xs italic">{errors.email?.message}</p>
        ) : (
          <></>
        )}
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          {...register('password')}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
        {errors.password ? (
          <p class="text-red-500 text-xs italic">{errors.password?.message}</p>
        ) : (
          <></>
        )}
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
        <div className="flex justify-center items-center ">
          Already have an account,{' '}
          <span>
            {' '}
            <button type="button" onClick={onClick} className="font-bold pl-2 hover:text-red-400">
              Login Now
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
