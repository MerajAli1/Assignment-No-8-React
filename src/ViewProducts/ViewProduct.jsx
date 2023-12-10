import { Button, Stack, Typography, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DATABASE, ref, onChildAdded } from '../Firebase/Firebase';
import { STORAGE, storageRef } from '../Firebase/Firebase';
import { listAll, getDownloadURL } from 'firebase/storage';
import Modal from '../modalButton/Modal';

const UploadProduct = () => {
  const [uploadData, setUploadData] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    (
      () => {
        var reference = ref(DATABASE, "productData");

        onChildAdded(reference, function (data) {
          // console.log('New Data Received:', data.val());
          setUploadData((prevData) => [...prevData, data.val()]);
        });
      }
    )()
  }, [])

  const handleAddToCart = (productData) => {
    console.log(productData)
    setCart(() => [...cart, productData]);
  }

  return (
    <>
      <Modal label={cart} />
      <Typography sx={{ fontSize: "40px" }}>Our Products</Typography>
      <Stack sx={{ justifyContent: 'center', flexDirection: 'row', gap: 10, textAlign: 'center' }} >
        {uploadData?.map((data, index) => (
          <div style={{ border: "2px solid skyblue", padding: 20 }} key={index}>
            <img src={data?.image} width={200} height={200} alt="" />
            <h1>{data?.title}</h1>
            <Typography>{data?.description}</Typography>
            <Button variant='outlined' type='submit' onClick={() => handleAddToCart(data)}>
              ADD TO CART {data?.price}Rs
            </Button>
          </div>
        ))}
      </Stack>
    </>
  );
};

export default UploadProduct;
