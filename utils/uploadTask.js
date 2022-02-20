import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

const uploadFiles = async (
  file,
  details,
  createFunction,
  dashboard = false
) => {
  if (!file) return;
  const storageRef = ref(
    storage,
    `/files/${dashboard ? file[0].name : file.name}`
  );
  const uploadTask = dashboard
    ? uploadBytesResumable(storageRef, file[0], {
        contentType: 'application/pdf',
      })
    : uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (err) => console.log(err),
    async () => {
      // getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      //   return url;
      // });
      try {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(details);
        const addedDetails = await createFunction(
          dashboard
            ? { notesLink: url, ...details }
            : { imgUrl: url, ...details }
        );
        console.log('hello');
        return url;
      } catch (err) {
        console.log(err);
      }
    }
  );
};

export default uploadFiles;
