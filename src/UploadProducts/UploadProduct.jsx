import { Button, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DATABASE, ref, push, set } from '../Firebase/Firebase';
import { STORAGE, storageRef } from '../Firebase/Firebase';
import { getDownloadURL, uploadBytes, } from 'firebase/storage';
const UploadProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploadData, setUploadData] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [error, setError] = useState('');
  const submitData = async () => {
    let productData = {
      title: title,
      description: description,
      price: price,

    };
    if (!title || !description || !price) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const imageRef = storageRef(STORAGE, `images/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
        console.log(snapshot)
        await getDownloadURL(snapshot?.ref)?.then((url) => {// get url
          console.log(url)
          productData = { ...productData, image: url }
        })
        setTitle('')
        setDescription('')
        alert("image Uploaded")
      })
        .then(() => {

          //DATABASE
          console.log(productData)
          const referId = ref(DATABASE);
          const ID = push(referId).key;
          productData.id = ID;
          const refer = ref(DATABASE, `productData/${productData.id}`);
          set(refer, productData);
        })
      // Update the state after submitting data
      setUploadData((prevData) => [...prevData, productData]);
      setTitle('');
      setDescription('');
      setPrice('');
      setError('');
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <Stack gap={2}>
      <TextField onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title...' />
      <TextField onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description...' />
      <TextField onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price...' />
      <TextField type='file' onChange={((e) => setImageUpload(e.target.files[0]))} accept='image/png, image/jpeg' placeholder='Enter Image....' />
      <Button variant='contained' onClick={submitData}>
        Submit
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Stack>
  );
};
export default UploadProduct;
