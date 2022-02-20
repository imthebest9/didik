import React from 'react';

const InputField = ({
  label,
  type,
  errors,
  id,
  name,
  register,

  value,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={value}
        {...register(name)}
        class="block px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
      />

      {errors ? (
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          <span class="font-medium">Oops!</span> {errors?.message}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputField;
