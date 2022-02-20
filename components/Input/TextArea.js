import React from 'react';

const TextArea = ({
  label,
  placeholder,
  errors,
  id,
  name,
  register,
  ...textProps
}) => {
  return (
    <>
      <label for={id} class="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        {...register(name)}
        rows="4"
        class="block p-2 w-full text-sm text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        {...textProps}
      ></textarea>
      {errors ? (
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          <span class="font-medium">Oops!</span> {errors?.message}
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default TextArea;
