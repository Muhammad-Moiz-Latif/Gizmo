import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
    Plus,
    Minus,
    ShoppingCart,
    Trash2,
    CreditCard,
    X,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import {
    clearCartAsync,
    RemoveFromCartAsync,
    setCartAsync,
    updateCartAsync,
} from "../state/features/cartSlice";
import {
    clearLocalCart,
    removeCartItemfromLocalStorage,
    updateLocalCart,
    updateLocalCartItem,
} from "../state/features/localcartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export const CartDropDown: React.FC = () => {
    const navigate = useNavigate();
    const { UserId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [isOpen, setIsOpen] = useState(false);

    const Cart = useSelector((state: RootState) => state.cart.list);
    const localCart = useSelector((state: RootState) => state.localCart.list);
    const Devices = useSelector((state: RootState) => state.device.devices);

    const DevicesArray = Array.isArray(Devices) ? Devices : [];

    let devicesInCart: any[] = [];

    if (UserId === undefined) {
        if (localCart.length > 0) {
            devicesInCart = localCart
                .map((cartItem) => {
                    const device = DevicesArray.find(
                        (device) => device.DeviceId === cartItem.deviceId
                    );

                    return device
                        ? {
                            ...device,
                            quantity: cartItem.quantity,
                        }
                        : null;
                })
                .filter(Boolean);
        }
    } else {
        if (Cart.length > 0) {
            devicesInCart = Cart
                .map((cartItem) => {
                    const device = DevicesArray.find(
                        (device) => device.DeviceId === cartItem.DeviceId
                    );

                    return device
                        ? {
                            ...device,
                            quantity: cartItem.Quantity,
                        }
                        : null;
                })
                .filter(Boolean);
        }
    }

    const totalPrice = devicesInCart.reduce(
        (total, item) =>
            total + (item?.Price || 0) * (item?.quantity || 0),
        0
    );

    const totalItems = devicesInCart.reduce(
        (total, item) => total + (item?.quantity || 0),
        0
    );

    useEffect(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        //@ts-ignore
        dispatch(setCartAsync(UserId));
    }, [Cart, dispatch, UserId]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleContainerClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                handleClose();
            }
        },
        [handleClose]
    );

    function toggleIncrementCart(deviceId: string) {
        if (UserId === undefined) {
            const CartItem = localCart.find(
                (item) => item.deviceId === deviceId
            );

            if (CartItem) {
                const Quantity = CartItem.quantity + 1;

                dispatch(
                    updateLocalCartItem({
                        deviceId,
                        quantity: Quantity,
                    })
                );

                dispatch(updateLocalCart());
            }
        } else {
            const CartItem = Cart.find(
                (item) => item.DeviceId === deviceId
            );

            if (CartItem) {
                const Quantity = CartItem.Quantity + 1;

                //@ts-ignore
                dispatch(
                    updateCartAsync({
                        UserId,
                        Quantity,
                        DeviceId: deviceId,
                    })
                );
            }
        }
    }

    function toggleDecrementCart(deviceId: string) {
        if (UserId === undefined) {
            const CartItem = localCart.find(
                (item) => item.deviceId === deviceId
            );

            if (CartItem) {
                const Quantity = CartItem.quantity - 1;

                dispatch(
                    updateLocalCartItem({
                        deviceId,
                        quantity: Quantity,
                    })
                );

                dispatch(updateLocalCart());
            }
        } else {
            const CartItem = Cart.find(
                (item) => item.DeviceId === deviceId
            );

            if (CartItem) {
                const Quantity = CartItem.Quantity - 1;

                //@ts-ignore
                dispatch(
                    updateCartAsync({
                        UserId,
                        Quantity,
                        DeviceId: deviceId,
                    })
                );
            }
        }
    }

    async function handlePayment() {
        const payDevices = Devices.filter((device) =>
            Cart.some(
                (item: any) =>
                    item.DeviceId === device.DeviceId
            )
        ).map((device) => {
            const CartItem = Cart.find(
                (item) => item.DeviceId === device.DeviceId
            );

            return {
                ...device,
                Quantity: CartItem?.Quantity,
            };
        });

        if (UserId === undefined) {
            navigate("/Login");
            return;
        }

        const stripe = await loadStripe(
            "pk_test_51QlxBiRq46mJj6NwaS3TFwq9HbiC1lzMdaNwLP1Le6qRngqtreZkxaEzGEQkaufspjRKNiWvM0h6geJJZTvhf8ds00hjD7d4xT"
        );

        try {
            toast.success("Proceeding to checkout...");

            const response = await axios.post(
                `${import.meta.env.VITE_PUBLIC_API_URL}/dashboard/${UserId}/create-checkout-session`,
                payDevices
            );

            const { id: sessionId } = response.data;

            if (!stripe) {
                console.error("Stripe failed to initialize.");
                return;
            }

            const result = await stripe.redirectToCheckout({
                sessionId,
            });

            if (result.error) {
                console.error(
                    "Stripe Checkout Error:",
                    result.error.message
                );
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    }

    function handleRemoval(DeviceId: string) {
        if (UserId === undefined) {
            dispatch(
                removeCartItemfromLocalStorage({
                    deviceId: DeviceId,
                })
            );

            toast.success("Item removed from cart");
        } else {
            //@ts-ignore
            dispatch(
                RemoveFromCartAsync({
                    DeviceId,
                    UserId,
                })
            );

            toast.success("Item removed from cart");
        }
    }

    function handleClear() {
        if (UserId === undefined) {
            dispatch(clearLocalCart());
            toast.success("Cleared Cart");
        } else {
            //@ts-ignore
            dispatch(clearCartAsync({ UserId }));
            toast.success("Cleared Cart");
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                    onClick={handleContainerClick}
                >
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 35,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="
                            absolute
                            right-0
                            top-0
                            h-full
                            w-full
                            sm:w-[460px]
                            bg-[#f5f5f2]
                            text-black
                            shadow-2xl
                            flex
                            flex-col
                            overflow-hidden
                        "
                    >

                        {/* ================= HEADER ================= */}

                        <header className="relative px-6 pt-7 pb-5 border-b border-black/10">

                            <div className="flex items-start justify-between">

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles
                                            size={14}
                                            strokeWidth={1.5}
                                        />

                                        <span className="
                                            text-[10px]
                                            tracking-[0.3em]
                                            uppercase
                                            font-medium
                                        ">
                                            Gizmo Marketplace
                                        </span>
                                    </div>

                                    <h2 className="
                                        text-4xl
                                        font-semibold
                                        tracking-[-0.05em]
                                        leading-none
                                    ">
                                        Your Cart
                                    </h2>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        border
                                        border-black/10
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-black
                                        hover:text-white
                                        transition-all
                                    "
                                >
                                    <X size={18} strokeWidth={1.5} />
                                </button>

                            </div>

                            <div className="
                                flex
                                justify-between
                                items-center
                                mt-5
                                text-xs
                                uppercase
                                tracking-[0.15em]
                                text-black/45
                            ">
                                <span>
                                    {totalItems}{" "}
                                    {totalItems === 1 ? "item" : "items"}
                                </span>

                                <span>
                                    Cart / 01
                                </span>
                            </div>

                        </header>


                        {/* ================= CART CONTENT ================= */}

                        <div className="
                            flex-1
                            overflow-y-auto
                            px-5
                            py-5
                            scrollbar-thin
                            scrollbar-thumb-black/20
                        ">

                            {devicesInCart.length > 0 ? (

                                <div className="space-y-3">

                                    {devicesInCart.map(
                                        (item: any, index) => (

                                            <motion.div
                                                key={`${item.DeviceId}-${index}`}
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay:
                                                        index * 0.04,
                                                }}
                                                className="
                                                    group
                                                    relative
                                                    bg-white
                                                    rounded-2xl
                                                    border
                                                    border-black/[0.06]
                                                    p-3
                                                    shadow-sm
                                                    hover:shadow-md
                                                    transition-shadow
                                                "
                                            >

                                                <div className="flex gap-4">

                                                    {/* IMAGE */}

                                                    <div className="
                                                        relative
                                                        w-[88px]
                                                        h-[88px]
                                                        shrink-0
                                                        bg-[#f1f1ee]
                                                        rounded-xl
                                                        overflow-hidden
                                                    ">

                                                        <img
                                                            src={
                                                                item.Images &&
                                                                    item.Images.length >
                                                                    1
                                                                    ? item.Images[1]
                                                                    : item.Images &&
                                                                        item.Images.length >
                                                                        0
                                                                        ? item.Images[0]
                                                                        : "/placeholder.svg"
                                                            }
                                                            alt={
                                                                item.DeviceName
                                                            }
                                                            className="
                                                                w-full
                                                                h-full
                                                                object-cover
                                                                mix-blend-multiply
                                                                group-hover:scale-105
                                                                transition-transform
                                                                duration-500
                                                            "
                                                        />

                                                        <div className="
                                                            absolute
                                                            top-2
                                                            left-2
                                                            text-[8px]
                                                            tracking-widest
                                                            uppercase
                                                            bg-white/80
                                                            backdrop-blur
                                                            px-2
                                                            py-1
                                                            rounded-full
                                                        ">
                                                            {String(
                                                                index + 1
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </div>

                                                    </div>


                                                    {/* INFO */}

                                                    <div className="
                                                        flex
                                                        flex-1
                                                        min-w-0
                                                        flex-col
                                                    ">

                                                        <div className="
                                                            flex
                                                            justify-between
                                                            gap-2
                                                        ">

                                                            <div className="min-w-0">

                                                                <h3 className="
                                                                    font-semibold
                                                                    text-sm
                                                                    truncate
                                                                    tracking-tight
                                                                ">
                                                                    {
                                                                        item.DeviceName
                                                                    }
                                                                </h3>

                                                                <p className="
                                                                    mt-0.5
                                                                    text-[11px]
                                                                    text-black/40
                                                                    truncate
                                                                ">
                                                                    {
                                                                        item.Brand
                                                                    }{" "}
                                                                    /{" "}
                                                                    {
                                                                        item.Model
                                                                    }
                                                                </p>

                                                            </div>

                                                            <button
                                                                onClick={() =>
                                                                    handleRemoval(
                                                                        item.DeviceId
                                                                    )
                                                                }
                                                                className="
                                                                    shrink-0
                                                                    w-7
                                                                    h-7
                                                                    rounded-full
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    text-black/30
                                                                    hover:bg-black
                                                                    hover:text-white
                                                                    transition-all
                                                                "
                                                                aria-label="Remove from cart"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        14
                                                                    }
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                />
                                                            </button>

                                                        </div>


                                                        <div className="
                                                            mt-auto
                                                            flex
                                                            items-end
                                                            justify-between
                                                        ">

                                                            <div>
                                                                <span className="
                                                                    text-[10px]
                                                                    uppercase
                                                                    tracking-widest
                                                                    text-black/35
                                                                ">
                                                                    Unit
                                                                </span>

                                                                <p className="
                                                                    text-sm
                                                                    font-medium
                                                                    mt-0.5
                                                                ">
                                                                    $
                                                                    {Number(
                                                                        item.Price
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </p>
                                                            </div>


                                                            {/* QUANTITY */}

                                                            <div className="
                                                                flex
                                                                items-center
                                                                bg-[#f2f2ef]
                                                                rounded-full
                                                                p-1
                                                            ">

                                                                <button
                                                                    onClick={() => {
                                                                        if (
                                                                            item.quantity >
                                                                            1
                                                                        ) {
                                                                            toggleDecrementCart(
                                                                                item.DeviceId
                                                                            );
                                                                        }
                                                                    }}
                                                                    disabled={
                                                                        item.quantity ===
                                                                        1
                                                                    }
                                                                    className="
                                                                        w-7
                                                                        h-7
                                                                        rounded-full
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        hover:bg-white
                                                                        disabled:opacity-30
                                                                        transition-all
                                                                    "
                                                                >
                                                                    <Minus
                                                                        size={
                                                                            12
                                                                        }
                                                                    />
                                                                </button>

                                                                <span className="
                                                                    w-7
                                                                    text-center
                                                                    text-xs
                                                                    font-semibold
                                                                ">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>

                                                                <button
                                                                    onClick={() =>
                                                                        toggleIncrementCart(
                                                                            item.DeviceId
                                                                        )
                                                                    }
                                                                    className="
                                                                        w-7
                                                                        h-7
                                                                        rounded-full
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        hover:bg-white
                                                                        transition-all
                                                                    "
                                                                >
                                                                    <Plus
                                                                        size={
                                                                            12
                                                                        }
                                                                    />
                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* ITEM TOTAL */}

                                                <div className="
                                                    mt-3
                                                    pt-3
                                                    border-t
                                                    border-black/[0.06]
                                                    flex
                                                    justify-between
                                                    items-center
                                                ">

                                                    <span className="
                                                        text-[9px]
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-black/35
                                                    ">
                                                        Item total
                                                    </span>

                                                    <span className="
                                                        text-sm
                                                        font-semibold
                                                    ">
                                                        $
                                                        {(
                                                            item.Price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>

                                                </div>

                                            </motion.div>

                                        )
                                    )}

                                </div>

                            ) : (

                                /* ================= EMPTY CART ================= */

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="
                                        h-full
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        text-center
                                        px-8
                                    "
                                >

                                    <div className="
                                        w-24
                                        h-24
                                        rounded-full
                                        bg-black
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        mb-6
                                    ">
                                        <ShoppingCart
                                            size={30}
                                            strokeWidth={1.2}
                                        />
                                    </div>

                                    <p className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.3em]
                                        text-black/40
                                        mb-3
                                    ">
                                        Nothing here yet
                                    </p>

                                    <h3 className="
                                        text-3xl
                                        font-semibold
                                        tracking-[-0.04em]
                                    ">
                                        Your cart is empty.
                                    </h3>

                                    <p className="
                                        mt-3
                                        max-w-[270px]
                                        text-sm
                                        leading-6
                                        text-black/45
                                    ">
                                        Discover something worth adding
                                        to your setup.
                                    </p>

                                    <NavLink
                                        to={
                                            UserId === undefined
                                                ? "/Login"
                                                : "/categories"
                                        }
                                        onClick={handleClose}
                                        className="
                                            mt-7
                                            inline-flex
                                            items-center
                                            gap-2
                                            px-6
                                            py-3
                                            bg-black
                                            text-white
                                            rounded-full
                                            text-xs
                                            font-medium
                                            hover:bg-black/80
                                            transition-colors
                                        "
                                    >
                                        Explore Collection
                                        <ArrowRight size={14} />
                                    </NavLink>

                                </motion.div>

                            )}

                        </div>


                        {/* ================= FOOTER ================= */}

                        {devicesInCart.length > 0 && (

                            <footer className="
                                border-t
                                border-black/10
                                bg-[#f5f5f2]
                                px-5
                                pt-5
                                pb-6
                            ">

                                {/* SUMMARY */}

                                <div className="space-y-3 mb-5">

                                    <div className="
                                        flex
                                        justify-between
                                        text-xs
                                        text-black/45
                                    ">
                                        <span>
                                            Subtotal
                                        </span>

                                        <span>
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="
                                        flex
                                        justify-between
                                        text-xs
                                        text-black/45
                                    ">
                                        <span>
                                            Shipping
                                        </span>

                                        <span className="text-black">
                                            Calculated at checkout
                                        </span>
                                    </div>

                                    <div className="
                                        pt-3
                                        mt-3
                                        border-t
                                        border-black/10
                                        flex
                                        justify-between
                                        items-end
                                    ">

                                        <div>
                                            <p className="
                                                text-[9px]
                                                uppercase
                                                tracking-[0.2em]
                                                text-black/35
                                            ">
                                                Total
                                            </p>

                                            <p className="
                                                text-3xl
                                                font-semibold
                                                tracking-[-0.05em]
                                                mt-1
                                            ">
                                                ${totalPrice.toFixed(2)}
                                            </p>
                                        </div>

                                        <span className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.15em]
                                            text-black/30
                                            mb-1
                                        ">
                                            USD
                                        </span>

                                    </div>

                                </div>


                                {/* CHECKOUT */}

                                <button
                                    onClick={handlePayment}
                                    className="
                                        group
                                        w-full
                                        h-14
                                        bg-black
                                        text-white
                                        rounded-full
                                        flex
                                        items-center
                                        justify-between
                                        px-6
                                        hover:bg-black/85
                                        transition-all
                                    "
                                >

                                    <span className="
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                        font-medium
                                    ">
                                        <CreditCard size={17} />
                                        Proceed to Checkout
                                    </span>

                                    <span className="
                                        w-8
                                        h-8
                                        rounded-full
                                        bg-white/10
                                        flex
                                        items-center
                                        justify-center
                                        group-hover:bg-white
                                        group-hover:text-black
                                        transition-all
                                    ">
                                        <ArrowRight size={15} />
                                    </span>

                                </button>


                                {/* SECONDARY ACTIONS */}

                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-2
                                    mt-2
                                ">

                                    <NavLink
                                        to={
                                            UserId === undefined
                                                ? "/Login"
                                                : "cart"
                                        }
                                        onClick={handleClose}
                                        className="
                                            h-11
                                            rounded-full
                                            border
                                            border-black/10
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            text-xs
                                            font-medium
                                            hover:bg-white
                                            transition-colors
                                        "
                                    >
                                        <ShoppingCart size={14} />
                                        View Cart
                                    </NavLink>

                                    <button
                                        onClick={handleClear}
                                        className="
                                            h-11
                                            rounded-full
                                            border
                                            border-black/10
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            text-xs
                                            font-medium
                                            text-black/50
                                            hover:text-red-600
                                            hover:bg-white
                                            transition-colors
                                        "
                                    >
                                        <Trash2 size={14} />
                                        Clear Cart
                                    </button>

                                </div>


                                <p className="
                                    text-center
                                    text-[9px]
                                    text-black/25
                                    uppercase
                                    tracking-[0.15em]
                                    mt-4
                                ">
                                    Secure checkout · Gizmo Marketplace
                                </p>

                            </footer>

                        )}

                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};