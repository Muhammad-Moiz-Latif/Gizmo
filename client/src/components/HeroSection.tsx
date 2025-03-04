import React, { useEffect, useState } from 'react';
import HeadPhone from '../assets/HeadPhones.jpg';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export const HeroSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [Category, setCategory] = useState({ CategoryId: "", CategoryName: "", Description: "", Image: "" });
    const { UserId } = useParams();
    const category = useSelector((state: RootState) => state.category.categories);
    useEffect(() => {
        setIsVisible(true);
        if (category && category.length > 0) {
            setCategory({
                CategoryId: category[0].CategoryId,
                //@ts-ignore
                CategoryName: category[0].CategoryName,
                //@ts-ignore
                Description: category[0].Description,
                //@ts-ignore
                Image: category[0].Image
            });
        }
    }, []);
    return (
        <div className="w-full min-h-screen bg-ghost_white-900 font-roboto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center justify-start relative overflow-hidden">
            {/* Main Content */}
            <div className={`max-w-4xl w-full flex flex-col justify-center items-center text-center relative z-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Title and Description */}
                <h1 className={`text-4xl sm:text-5xl md:text-5xl font-medium text-primary-dark tracking-tighter mb-4 z-40 mt-24 transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Experience Media Like Never Before
                </h1>
                <h2 className={`text-xl sm:text-2xl text-stone-600 mb-4 tracking-widest z-40 transition-all duration-1000 ease-in-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Buy and sell the latest gadgets with ease.<br /> Discover your next favorite device today!
                </h2>

                {/* Buttons */}
                <div className={`flex flex-col sm:flex-row gap-6 justify-center z-40 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    <NavLink to={`/UserDashboard/${UserId ? UserId : ""}/Category/${Category.CategoryId}` || ""}>
                        <button className="w-64 h-12 border-2 border-primary-dark rounded-lg bg-black text-ghost_white-900 text-xl font-semibold tracking-wide hover:bg-primary-dark hover:text-white transition-all duration-300 transform hover:scale-110 active:opacity-80 shadow-md hover:shadow-lg">
                            Shop Now
                        </button>
                    </NavLink>
                    <button className="w-64 h-12 border-2 border-primary-dark rounded-lg bg-primary-light text-primary-dark text-xl font-semibold tracking-wide hover:bg-primary-dark hover:text-primary-light transition-all duration-300 transform hover:scale-110 active:opacity-80 shadow-md hover:shadow-lg">
                        Contact Us
                    </button>
                </div>

                {/* Product Image */}
                <div className={`relative overflow-hidden -mt-24 transition-all duration-1000 ease-in-out delay-700 ${isVisible ? 'rotate-0 opacity-100' : '-rotate-12 opacity-0'}`}>
                    <img src={HeadPhone} alt="Headphone" className="w-[30rem] relative z-10" />
                </div>

                {/* Enlarged Company Name */}
                <div className={`text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[20rem] font-bold text-primary-dark z-30 opacity-5 tracking-widest -mt-[379px] transition-transform duration-1500 ease-in-out delay-1000 ${isVisible ? 'scale-100 opacity-5' : 'scale-90 opacity-0'}`}>
                    GIZMO
                </div>
            </div>

            {/* Background Animation */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
                <div className="animate-float absolute bottom-[45%] left-[23.7%] w-24 h-24 bg-stone-400 rounded-full opacity-15"></div>
            </div>
        </div>
    );
};