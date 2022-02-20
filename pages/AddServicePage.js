import React, { useState } from 'react';
import Link from 'next/link';
import { addService } from '../api';
import uploadFiles from '../utils/uploadTask';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from '../components/Input/InputField';
import { toast } from 'react-toastify';
import TextArea from '../components/Input/TextArea';
import nookies from 'nookies';
import NavBar from '../components/Header';

const AddServicePage = () => {
  const [alert, setAlert] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required Field'),
    description: Yup.string().required('Required Field'),
    pricing: Yup.string().required('Required Field'),
    lessons: Yup.string().required('Required Field'),
    mode: Yup.string().required('Required Field'),
    medium: Yup.string().required('Required Field'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);

  const { errors } = formState;

  const onSubmit = async (data) => {

    const file = data.image[0];

    delete data.image;

    data = { ...data, tutor: nookies.get().userId };

    console.log(data);

    console.log(file);

    try {
      const addedService = await uploadFiles(file, data, addService);
      if (addedService) {
        toast.success('Service added');
      }
    } catch (err) {
      toast.error('Failed to add');
    }
    setAlert(true);
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center m-10">
        <div class="w-full max-w-3xl">
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
            enctype="multipart/form-data"
          >
            <div className="h1-font font-bold text-2xl">Add A Service</div>
            <div className="h3-font my-3">
              Briefly talks about your newly added service. This will attract
              students!
            </div>
            <div class="my-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title of service"
            /> */}
              <InputField
                label={'Title'}
                type={'text'}
                name={'title'}
                id={'title'}
                errors={errors.title}
                register={register}
              />
            </div>
            <div class="mt-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Description
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Enter description of service"
              rows={5}
              cols={5}
            /> */}
              <TextArea
                label={'Description'}
                id={'description'}
                name={'description'}
                register={register}
                errors={errors.description}
              />
            </div>
            <div class="mb-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="pricing"
            >
              Pricing
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pricing"
              type="text"
              placeholder="RM"
            /> */}
              <InputField
                label={'Pricing'}
                type={'text'}
                name={'pricing'}
                id={'pricing'}
                errors={errors.pricing}
                register={register}
              />
            </div>
            <div class="mb-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="lessons"
            >
              Number of lessons
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lessons"
              type="text"
              placeholder=""
            /> */}
              <InputField
                label={'Number of lessons'}
                type={'text'}
                name={'lessons'}
                id={'lessons'}
                errors={errors.lessons}
                register={register}
              />
            </div>
            <div class="mb-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="mode"
            >
              Mode
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mode"
              type="text"
              placeholder=""
            /> */}
              <InputField
                label={'Mode (Online/ Physical)'}
                type={'text'}
                name={'mode'}
                id={'mode'}
                errors={errors.mode}
                register={register}
              />
            </div>
            <div class="mb-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="medium"
            >
              Medium
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="medium"
              type="text"
              placeholder=""
            /> */}
              <InputField
                label={'Medium (English, Chinese, Malay, Others)'}
                type={'text'}
                name={'medium'}
                id={'medium'}
                errors={errors.medium}
                register={register}
              />
            </div>
            <div class="mb-4">
              {/* <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="image"
            >
              Upload image
            </label>
            <input
              class=" appearance-none rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              placeholder=""
            /> */}
              <InputField
                label={'Upload image'}
                type={'file'}
                name={'image'}
                id={'image'}
                errors={errors.image}
                register={register}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
              {/* <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Save as draft
            </a> */}
            </div>
          </form>
          {alert ? (
            <div
              class="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3"
              role="alert"
            >
              Service was added
              <Link href="/ResultsPage">
                <a class="font-bold text-green-800"> Go to Services page</a>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;
