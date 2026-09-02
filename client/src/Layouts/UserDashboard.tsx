import axios from "axios";
import { UserNavbar } from "../components/UserNavbar";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { setCategories, setCategoriesLoading } from '../state/features/categoriesSlice';
import { RootState } from '../state/store';
import { setDevices, setDevicesLoading } from '../state/features/devicesSlice';
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../components/Footer";
import defaultImg from '../assets/user.png';
import { syncLocalStorage } from "../state/features/localwishSlice";
import { syncLocalCart } from "../state/features/localcartSlice";
import { AvatarSkeleton } from "../components/AvatarSkeleton";
import { getAvatarUrl } from "../utils/avatar";



export const UserDashboard = () => {
  const { UserId } = useParams<{ UserId?: string }>();
  const [image, setImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const devices = useSelector((state: RootState) => state.device.devices);

  useEffect(() => {
    const pingServer = () => {
      void axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/status`, { timeout: 10000 })
        .catch((error) => console.debug("Server keep-alive ping failed:", error.message));
    };

    pingServer();
    const intervalId = window.setInterval(pingServer, 10 * 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const categoriesArray = Array.isArray(categories) ? categories : []
    if (categoriesArray.length === 0) {
      const getCategories = async () => {
        dispatch(setCategoriesLoading(true));
        try {
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/AdminDashboard/getCategory`);
          if (response && response.data) {
            dispatch(setCategories(response.data));
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
          dispatch(setCategories([]));
        }
      };
      getCategories();
    }
  }, [dispatch, categories]);


  useEffect(() => {
    const devicesArray = Array.isArray(devices) ? devices : []
    if (devicesArray.length === 0) {
      const getDevices = async () => {
        dispatch(setDevicesLoading(true));
        try {
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/AdminDashboard/GetDevices`);
          if (response && response.data) {
            dispatch(setDevices(response.data.fixedDevices));
            // if (cart.length === 0) {
            //   dispatch(setCart(response.data.fixedDevices));
            // }
          }
        } catch (error) {
          console.error("Error fetching devices:", error);
          dispatch(setDevices([]));
        }
      };
      getDevices();
    }
  }, [dispatch, devices]);
  useEffect(() => {
    const getData = async () => {
      try {
        if (UserId != undefined) {
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/UserDashboard/${UserId}`);
          if (response && response.data) {
            console.log(response.data);

            setImage(response.data.UserInfo.img);
          }
        } else {
          setImage(defaultImg);
        }
        setIsImageLoading(false);
      } catch {
        setImage(defaultImg);
        setIsImageLoading(false);
      }
    }
    getData();
  }, [UserId]);

  useEffect(() => {
    if (UserId == undefined) {
      syncLocalStorage();
      syncLocalCart();
    }
  }, [UserId])

  useEffect(() => {
    window.scroll(0, 0);
  }, [])



  return (
    <div className="max-w-screen min-h-screen">
      {isImageLoading ? <div className="fixed right-4 top-4 z-[60]"><AvatarSkeleton /></div> : null}
      <UserNavbar ImageURl={getAvatarUrl(image)} />
      <Outlet />
      <Footer />
    </div>
  );
};