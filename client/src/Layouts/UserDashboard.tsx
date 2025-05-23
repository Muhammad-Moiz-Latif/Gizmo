import axios from "axios";
import { UserNavbar } from "../components/UserNavbar";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { setCategories } from '../state/features/categoriesSlice';
import { RootState } from '../state/store';
import { setDevices } from '../state/features/devicesSlice';
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../state/features/cartSlice";
import { Footer } from "../components/Footer";
import defaultImg from '../assets/user.png';
import { syncLocalStorage } from "../state/features/localwishSlice";
import { syncLocalCart } from "../state/features/localcartSlice";



export const UserDashboard = () => {
  const { UserId } = useParams<{ UserId?: string }>();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const devices = useSelector((state: RootState) => state.device.devices);
  const cart = useSelector((state: RootState) => state.cart.list);
  console.log(devices);
  useEffect(() => {
    if (categories.length === 0) {
      const getCategories = async () => {
        try {
          console.log(import.meta.env.VITE_PUBLIC_API_URL)
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/AdminDashboard/getCategory`);
          if (response && response.data) {
            dispatch(setCategories(response.data));
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      getCategories();
    }
  }, [dispatch, categories.length]);

  
  useEffect(() => {
    if (devices.length === 0) {
      const getDevices = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/AdminDashboard/GetDevices`);
          if (response && response.data) {
            dispatch(setDevices(response.data.fixedDevices));
            if (cart.length === 0) {
              dispatch(setCart(response.data.fixedDevices));
            }
          }
        } catch (error) {
          console.error("Error fetching devices:", error);
        }
      };
      getDevices();
    }
  }, [dispatch, devices.length]);
  useEffect(() => {
    const getData = async () => {
      try {
        if (UserId != undefined) {
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/UserDashboard/${UserId}`);
          if (response && response.data) {
            // console.log(response.data);
           
            setImage(response.data.UserInfo.img);
          }
        } else {
          setImage(defaultImg);
        }
      } catch (error) {
        setImage(defaultImg);
      }
    }
    getData();
  }, []);

  useEffect(()=>{
    if(UserId == undefined){
      syncLocalStorage();
      syncLocalCart();
    }
  },[])

  useEffect(()=>{
    window.scroll(0,0);
  },[])



  return (
    <div className="max-w-screen min-h-screen">
      <UserNavbar ImageURl={image} />
      <Outlet />
      <Footer />
    </div>
  );
};