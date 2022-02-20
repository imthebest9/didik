import React, { useEffect, useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import { receiveUser } from '../api';

const Comment = (props) => {
  const [user, setUser] = useState(null);
  const row = [];
  const starNumber = (stars) => {
    for (var i = 0; i < stars; i++) {
      row.push(
        <div className="float-left">
          <AiOutlineStar size={30} />
        </div>
      );
    }
    return row;
  };

  return (
    <div className="mt-5">
      <div className="rounded-full overflow-hidden float-left">
        <Image src={props.image} width={50} height={50} />
      </div>
      <div className="text-xl ml-7 float-left pt-3">{props.username.firstName?props.username.firstName:"User1"}</div>
      <div className="float-left pt-3 ml-10">{starNumber(props.star)}</div>
      <div className="border-4 clear-left ml-10 p-5 mr-3 mt-3">{props.desc}</div>
    </div>
  );
};

export default Comment;
