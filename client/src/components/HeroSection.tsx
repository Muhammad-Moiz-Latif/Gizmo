import React, { useEffect, useState } from "react";
import HeadPhone from "../assets/HeadPhones.png";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export const HeroSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const [Category, setCategory] = useState({
        CategoryId: "",
        CategoryName: "",
        Description: "",
        Image: "",
    });

    const { UserId } = useParams();

    const category = useSelector(
        (state: RootState) => state.category.categories
    );

    const categoryArray = Array.isArray(category) ? category : [];

    useEffect(() => {
        setIsVisible(true);

        if (categoryArray && categoryArray.length > 0) {
            setCategory({
                CategoryId: categoryArray[0].CategoryId,
                //@ts-ignore
                CategoryName: categoryArray[0].CategoryName,
                //@ts-ignore
                Description: categoryArray[0].Description,
                //@ts-ignore
                Image: categoryArray[0].Image,
            });
        }
    }, [categoryArray]);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#f7f7f5] font-roboto text-primary-dark">

            {/* ------------------------------------------------ */}
            {/* Decorative background                            */}
            {/* ------------------------------------------------ */}

            <div className="pointer-events-none absolute inset-0">

                {/* subtle radial glow */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-[48%]
                        h-[550px]
                        w-[550px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-white
                        blur-3xl
                    "
                />

                {/* grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
                        [background-size:80px_80px]
                    "
                />

                {/* giant background brand */}
                <div
                    className={`
                        absolute
                        left-1/2
                        top-[52%]
                        -translate-x-1/2
                        -translate-y-1/2
                        whitespace-nowrap
                        text-[26vw]
                        font-black
                        leading-none
                        tracking-[-0.08em]
                        text-black/[0.035]
                        transition-all
                        duration-[1500ms]

                        ${isVisible
                            ? "scale-100 opacity-100"
                            : "scale-90 opacity-0"
                        }
                    `}
                >
                    GIZMO
                </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* Main hero                                        */}
            {/* ------------------------------------------------ */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-[1600px]
                    flex-col
                    px-5
                    pb-10
                    pt-28

                    sm:px-8

                    lg:px-14
                    lg:pt-32

                    xl:px-20
                "
            >

                {/* top content */}
                <div className="relative z-30 mx-auto max-w-4xl text-center">

                    {/* mini label */}
                    <div
                        className={`
                            mb-5
                            flex
                            items-center
                            justify-center
                            gap-3
                            transition-all
                            duration-700

                            ${isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-5 opacity-0"
                            }
                        `}
                    >
                        <span className="h-px w-8 bg-black/30" />

                        <span className="
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.35em]
                            text-black/50
                        ">
                            Buy · Sell · Discover
                        </span>

                        <span className="h-px w-8 bg-black/30" />
                    </div>

                    {/* headline */}
                    <h1
                        className={`
                            max-w-4xl
                            text-[2.8rem]
                            font-semibold
                            leading-[0.95]
                            tracking-[-0.055em]
                            text-primary-dark
                            transition-all
                            duration-1000

                            sm:text-6xl
                            md:text-7xl
                            lg:text-[5.5rem]

                            ${isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                            }
                        `}
                    >
                        Experience media
                        <br />

                        <span className="font-light italic text-black/45">
                            like never before.
                        </span>
                    </h1>

                    {/* description */}
                    <p
                        className={`
                            mx-auto
                            mt-6
                            max-w-xl
                            text-sm
                            font-normal
                            leading-7
                            tracking-wide
                            text-black/50
                            transition-all
                            delay-200
                            duration-1000

                            sm:text-base

                            ${isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                            }
                        `}
                    >
                        Buy and sell the latest gadgets with ease.
                        Discover technology worth experiencing.
                    </p>
                </div>

                {/* ------------------------------------------------ */}
                {/* Product stage                                    */}
                {/* ------------------------------------------------ */}

                <div
                    className="
                        relative
                        mx-auto
                        mt-4
                        flex
                        min-h-[430px]
                        w-full
                        max-w-6xl
                        flex-1
                        items-center
                        justify-center

                        md:min-h-[470px]
                    "
                >

                    {/* left note */}
                    <div
                        className={`
                            absolute
                            left-0
                            top-1/2
                            hidden
                            -translate-y-1/2
                            transition-all
                            delay-500
                            duration-1000

                            lg:block

                            ${isVisible
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-8 opacity-0"
                            }
                        `}
                    >
                        <div className="mb-4 h-px w-20 bg-black/20" />

                        <p className="
                            mb-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-black/35
                        ">
                            Featured
                        </p>

                        <p className="
                            max-w-[170px]
                            text-xl
                            font-medium
                            leading-tight
                            tracking-tight
                        ">
                            {Category.CategoryName || "Premium Audio"}
                        </p>

                        <p className="
                            mt-3
                            max-w-[180px]
                            text-xs
                            leading-5
                            text-black/45
                        ">
                            Find technology designed to elevate your
                            everyday experience.
                        </p>
                    </div>

                    {/* product glow */}
                    <div
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[330px]
                            w-[330px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-black/[0.04]
                            bg-white/60
                            shadow-[0_40px_100px_rgba(0,0,0,0.08)]

                            sm:h-[430px]
                            sm:w-[430px]

                            md:h-[480px]
                            md:w-[480px]
                        "
                    />

                    {/* circular rings */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-[390px]
                            w-[390px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-black/[0.04]

                            sm:h-[520px]
                            sm:w-[520px]
                        "
                    />

                    {/* headphone */}
                    <div
                        className={`
                            relative
                            z-20
                            flex
                            items-center
                            justify-center
                            transition-all
                            delay-300
                            duration-[1400ms]
                            ease-out

                            ${isVisible
                                ? "translate-y-0 scale-100 opacity-100"
                                : "translate-y-14 scale-90 opacity-0"
                            }
                        `}
                    >
                        <img
                            src={HeadPhone}
                            alt="Headphone"
                            className="
                                w-[290px]
                                select-none
                                mix-blend-multiply
                                drop-shadow-[0_35px_35px_rgba(0,0,0,0.18)]

                                sm:w-[390px]
                                md:w-[450px]
                                lg:w-[500px]

                                transition-transform
                                duration-700
                                ease-out

                                hover:-translate-y-3
                                hover:scale-[1.03]
                            "
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                    "/device-fallback.svg";
                            }}
                        />
                    </div>

                    {/* right detail */}
                    <div
                        className={`
                            absolute
                            right-0
                            top-1/2
                            hidden
                            -translate-y-1/2
                            text-right
                            transition-all
                            delay-700
                            duration-1000

                            lg:block

                            ${isVisible
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                            }
                        `}
                    >
                        <p className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-black/35
                        ">
                            Gizmo marketplace
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-light
                            tracking-[-0.05em]
                        ">
                            01
                        </p>

                        <div className="ml-auto mt-4 h-px w-20 bg-black/20" />
                    </div>
                </div>

                {/* ------------------------------------------------ */}
                {/* Actions                                          */}
                {/* ------------------------------------------------ */}

                <div
                    className={`
                        relative
                        z-30
                        mx-auto
                        flex
                        w-full
                        max-w-xl
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        transition-all
                        delay-700
                        duration-1000

                        sm:flex-row

                        ${isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }
                    `}
                >

                    <NavLink
                        className="w-full sm:w-auto"
                        to={
                            UserId
                                ? `/dashboard/${UserId}/Category/${Category.CategoryId}`
                                : `/dashboard/Category/${Category.CategoryId}`
                        }
                    >
                        <button
                            className="
                                group
                                flex
                                h-14
                                w-full
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                bg-black
                                px-9
                                text-sm
                                font-semibold
                                tracking-wide
                                text-white
                                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                                transition-all
                                duration-300

                                hover:-translate-y-1
                                hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]

                                sm:w-auto
                            "
                        >
                            Shop Collection

                            <span
                                className="
                                    text-lg
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </span>
                        </button>
                    </NavLink>

                    <NavLink
                        to="contactus"
                        className="
                            flex
                            h-14
                            w-full
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/15
                            bg-white/50
                            px-9
                            text-sm
                            font-semibold
                            tracking-wide
                            text-black/70
                            backdrop-blur-md
                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:border-black/30
                            hover:bg-white
                            hover:text-black

                            sm:w-auto
                        "
                    >
                        Contact Us
                    </NavLink>
                </div>

                {/* bottom line */}
                <div
                    className="
                        relative
                        z-20
                        mt-8
                        flex
                        items-center
                        justify-between
                        border-t
                        border-black/[0.07]
                        pt-5
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-black/35

                        sm:text-[10px]
                    "
                >
                    <span>Curated technology</span>

                    <span className="hidden sm:inline">
                        Scroll to explore ↓
                    </span>

                    <span>Gizmo © 2026</span>
                </div>
            </div>
        </section>
    );
};