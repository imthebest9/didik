import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../Input/InputField';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Datepicker from '../Input/Datepicker';
import TextArea from '../Input/TextArea';
import Timepicker from '../Input/Timepicker';
import uploadFiles from '../../utils/uploadTask';

const AddSection = ({ handleAddSection, dashboardId }) => {
  const validationSchema = Yup.object().shape({
    sectionTitle: Yup.string().required('Section title is required'),
    sectionDesc: Yup.string().required('Section description is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, control, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const file = data.notesLink;
      console.log(file);
      delete data.notesLink;
      const details = { ...data, dashboard: dashboardId };
      const newService = uploadFiles(file, details, handleAddSection, true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="container mx-auto">
      <div class="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
        <div class="text-center mb-5">
          <h1 class="my-3 text-3xl font-semibold text-gray-700">
            Add New Section
          </h1>
          <p class="text-gray-400">Every section represent a class.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label class="block font-bold text-lg text-gray-700 mb-5">
              Section Info
            </label>
            <div class="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Class Date
              </label>
              <Datepicker control={control} />
            </div>
            <div class="mb-6">
              <InputField
                label={'Section Title'}
                type={'text'}
                name={'sectionTitle'}
                id={'sectionTitle'}
                errors={errors.sectionTitle}
                register={register}
              />
            </div>
            <div class="mb-6">
              <TextArea
                label={'Section Description'}
                id={'sectionDesc'}
                name={'sectionDesc'}
                register={register}
                errors={errors.sectionDesc}
              />
            </div>
            <label class="block font-bold text-lg text-gray-700 mb-5">
              Meeting Info
            </label>
            <div class="flex mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Start Time
                </label>

                <Timepicker name={'startTime'} control={control} />
              </div>
              <div class="ml-5">
                <label class="block text-sm font-medium text-gray-700">
                  End Time
                </label>

                <Timepicker name={'endTime'} control={control} />
              </div>
            </div>
            <div class="mb-6">
              <InputField
                label={'Meeting Link'}
                type={'text'}
                name={'meetingLink'}
                id={'meetingLink'}
                errors={errors.meetingLink}
                register={register}
              />
            </div>
            <label class="block text-sm font-medium text-gray-700">
              Meeting Platform
            </label>
            <select
              {...register('platform')}
              id="platform"
              name="platform"
              className="block px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
            >
              <option>Meet</option>
              <option>Zoom</option>
              <option>Teams</option>
              <option>Webex</option>
              <option>Others</option>
            </select>
            <label class="block font-bold text-lg text-gray-700 mb-5">
              Attachment Info
            </label>
            <div class="mb-6">
              <InputField
                label={'Attachment'}
                type={'file'}
                name={'notesLink'}
                id={'notesLink'}
                errors={errors.notesLink}
                register={register}
              />
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
              >
                Add Section
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
