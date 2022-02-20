import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { addService, editService, getService, getServiceTutor } from '../api';
import editFiles from '../utils/editTask';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from '../components/Input/InputField';
import { toast } from 'react-toastify';
import TextArea from '../components/Input/TextArea';
import nookies from 'nookies';
import NavBar from '../components/Header';
import { useRouter } from 'next/router';

const EditServicePage = () => {
  const [alert, setAlert] = useState(false);
  const [services, setServices] = useState([]);
  const [hide, setHide] = useState(null);
  const [currService, setCurrService] = useState([]);
  const [currServiceId, setCurrServiceId] = useState(null);
  const tutorid = nookies.get().userId;

  const router = useRouter();

  useEffect(async () => {
    const res = await getServiceTutor(tutorid);
    setServices(res);
    const res2 = await getService(currServiceId);
    setCurrService(res2);
    setHide('1');
  }, [hide]);

  console.log(currService);

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
    // display form data on success

    const file = data.image[0];

    delete data.image;

    data = { ...data, tutor: nookies.get().userId };

    console.log(data);

    console.log(file);

    try {
      const addedService = await editFiles(currServiceId, file, data, editService);
      toast.success('Service edited');
    } catch (err) {
      toast.error('Failed to edit');
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
            autocomplete="on"
          >
            <div className="font-bold text-2xl">Edit A Service</div>
            <div className="my-3">Select the service that you want to edit</div>
            <div>
              {services !== [] ? (
                <div class="my-4">
                  <select
                    {...register('oriService')}
                    id="oriService"
                    name="oriService"
                    className="block px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
                    onChange={(e) => {
                      setCurrServiceId(e.target.value);
                      setHide('4');
                    }}
                  >
                    {services.map((service) => (
                      <option value={service._id}>{service.title}</option>
                    ))}
                  </select>
                </div>
              ) : (
                setHide('3')
              )}
            </div>

            <div class="my-4">
              <InputField
                label={'Title'}
                type={'text'}
                name={'title'}
                id={'title'}
                value={currService.title}
                errors={errors.title}
                register={register}
              />
            </div>
            <div class="mt-4">
              <TextArea
                label={'Description'}
                id={'description'}
                name={'description'}
                register={register}
                placeholder={currService.description}
                errors={errors.description}
              />
            </div>
            <div class="mb-4">
              <InputField
                label={'Pricing'}
                type={'text'}
                name={'pricing'}
                id={'pricing'}
                value={currService.pricing}
                errors={errors.pricing}
                register={register}
              />
            </div>
            <div class="mb-4">
              <InputField
                label={'Number of lessons'}
                type={'text'}
                name={'lessons'}
                id={'lessons'}
                value={currService.lessons}
                errors={errors.lessons}
                register={register}
              />
            </div>
            <div class="mb-4">
              <InputField
                label={'Mode (Online/ Physical)'}
                type={'text'}
                name={'mode'}
                id={'mode'}
                value={currService.mode}
                errors={errors.mode}
                register={register}
              />
            </div>
            <div class="mb-4">
              <InputField
                label={'Medium (English, Chinese, Malay, Others)'}
                type={'text'}
                name={'medium'}
                id={'medium'}
                value={currService.medium}
                errors={errors.medium}
                register={register}
              />
            </div>
            <div class="mb-4">
              <InputField
                label={'Upload image'}
                type={'file'}
                name={'image'}
                id={'image'}
                value={currService.img} // not sure
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
            </div>
          </form>
          {alert ? (
            <div
              class="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3"
              role="alert"
            >
              Service was edited
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

export default EditServicePage;
