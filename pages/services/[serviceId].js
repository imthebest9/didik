import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import Comment from '../../components/Comment';
import { DETAILS } from '../../public/dummyData/DetailsServiceCommentData';
import { useRouter } from 'next/router';
import axios from 'axios';
import { addComment, getComments, getService, receiveUser } from '../../api';
import { addToCart } from '../../utils/cartutils';
import Link from 'next/link';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextArea from '../../components/Input/TextArea';
import nookies from 'nookies';
import NavBar from '../../components/Header';

const DetailsForService = () => {
  const [service, setService] = useState([]);
  const [comments, setComments] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [hide, setHide] = useState(null);

  const router = useRouter();
  const serviceId = router.query.serviceId;

  const role = nookies.get().userRole;

  useEffect(async () => {
    const res = await getService(serviceId);
    const tutorId = res.tutor;
    const resTutor = await receiveUser(tutorId);
    setTutor(resTutor);
    setService(res);
    setComments(res.comments);
    setHide("1")
    // console.log(role);
  }, [router, hide]);

  const handleAddCart = () => {
    const addedCart = addToCart(serviceId);
    if (addedCart) {
      router.push('/');
    }
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Required Field'),
    rating: Yup.string().required('Required Field'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);

  const { errors } = formState;

  const onSubmit = async (data) => {
    // display form data on success

    console.log(serviceId);
    data = { ...data, course: serviceId, student: nookies.get().userId };
    console.log(data);

    try {
      const addedComment = await addComment(data);
      toast.success('Comment added');
      setHide("2")
    } catch (err) {
      toast.error('Failed to add');
    }
  };

  return (
    <div>
      <NavBar />

      <div className="md:flex md:flex-row md:mx-5 lg:mx-10 mt-5">
        <div className="max-w-lg lg:max-w-5xl lg:mr-10">
          <div className="h1-font ml-6 mt-3 text-4xl">{service.title}</div>
          {/* <div className="mt-5 ml-3 mb-5 pb-3">
          <div className="rounded-full overflow-hidden float-left">
            <Image src="/images/profile.jpg" width={50} height={50} />
          </div>
          <div className="text-xl ml-5 float-left pt-3 mb-5 md:pr-5">Username</div>
        </div> */}
          {/* <div className="clear-left ml-3 mt-5 md:clear-none md:pt-3">
          <div className="float-left ">
            <AiOutlineStar size={30} />
          </div>
          <div className="float-left ml-3 font-bold text-xl">
            {generateRandom()}
          </div>
          <div className="float-left ml-3 text-lg">({generateRandom2()})</div>
        </div> */}
          <div className="my-7 clear-left flex justify-center">
            <Image
              src={service.img ? service.img : '/maths2.jpg'}
              width="940"
              height="520"
            />
          </div>
          <div className="border-4 border-dotted border-lime-700 p-10 h3-font text-xl mx-3">{service.description}</div>
          <div className="h2-font text-lg mt-10 ml-3 font-bold">Comments</div>
          <div className="mt-5 ml-3">
            {comments?.map((detail) => (
              <Comment
                image={'/images/profile.jpg'}
                username={detail.student}
                star={detail.rating}
                desc={detail.message}
              />
            ))}
          </div>
          {role !== 'Tutor' ? (
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div>
                  <TextArea
                    label={'Drop your comment..'}
                    id={'message'}
                    name={'message'}
                    register={register}
                    errors={errors.description}
                  />
                </div>
                <div className="pr-96">
                  <label
                    htmlFor="rating"
                    className="h2-font block text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <select
                    {...register('rating')}
                    id="rating"
                    name="rating"
                    autoComplete="rating"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="mt-5">
                  <button
                    class="h1-font bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className="border-2 rounded-xl m-3 p-3 border-black flex-auto px-12">
            <div className="h1-font flex justify-center font-bold">ABOUT THE TUTOR</div>
            <div className="flex justify-center mt-5">
              <div className="rounded-full overflow-hidden float-left">
                <Image src="/images/profile.jpg" width={50} height={50} />
              </div>
              <div className="h2-font text-xl ml-5 float-left pt-3 md:pr-5 font-bold">
                {(tutor.firstName ? tutor.firstName : 'Elon') +
                  ' ' +
                  (tutor.lastName ? tutor.lastName : 'Musk')}
              </div>
            </div>
            <button className="bg-teal-100 h2-font flex justify-center my-5 border-2 border-black rounded-xl py-2 mx-2 px-5">
              <Link href={"../profile/" + tutor._id}>Go to Tutor's profile page</Link>
            </button>
          </div>
          {role !== 'Tutor' ? (
            <div className="bg-green-200 h1-font flex justify-center my-5 border-2 border-black py-2 mx-3 rounded-md">
              <button onClick={handleAddCart}>
                CHECKOUT (RM{service.pricing})
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsForService;
