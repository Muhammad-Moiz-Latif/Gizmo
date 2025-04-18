import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { NavLink } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Trash2, CreditCard, X } from 'lucide-react';
import { clearCartAsync, RemoveFromCartAsync, setCartAsync, updateCartAsync } from "../state/features/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { clearLocalCart, removeCartItemfromLocalStorage, updateLocalCart, updateLocalCartItem } from "../state/features/localcartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

export const CartDropDown: React.FC = () => {
    const navigate = useNavigate();
    const { UserId } = useParams();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const Cart = useSelector((state: RootState) => state.cart.list);
    console.log(Cart);
    const localCart = useSelector((state: RootState) => state.localCart.list);
    const Devices = useSelector((state: RootState) => state.device.devices);
    let devicesInCart: any[] = [];
    if (UserId == undefined) {
        if (localCart.length > 0) {
            devicesInCart = localCart.map(cartItem => {
                const device = Devices.find(device => device.DeviceId === cartItem.deviceId);
                return { ...device, quantity: cartItem.quantity };
            });
        }
    } else {
        if (Cart.length > 0) {
            devicesInCart = Cart.map(cartItem => {
                const device = Devices.find(device => device.DeviceId === cartItem.DeviceId);
                return { ...device, quantity: cartItem.Quantity };
            });
        }
    }

    const totalPrice = devicesInCart?.reduce((total, item) => total + (item?.Price || 0) * (item?.quantity || 0), 0);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        // Fetch the latest cart data whenever Cart changes
        //@ts-ignore
        dispatch(setCartAsync(UserId));
    }, [Cart, dispatch, UserId]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleContainerClick = useCallback((e: React.MouseEvent) => {
        // Close the sidebar only if the click is on the container itself
        if (e.target === e.currentTarget) {
            handleClose();
        }
    }, [handleClose]);

    function toggleIncrementCart(deviceId: string) {
        if (UserId == undefined) {
            const CartItem = localCart.find((item) => item.deviceId == deviceId);
            if (CartItem) {
                const Quantity = CartItem.quantity + 1;
                dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: Quantity }));
                dispatch(updateLocalCart());
            }
        } else {
            const CartItem = Cart.find((item) => item.DeviceId === deviceId);
            if (CartItem) {
                const Quantity = CartItem.Quantity + 1;

                //@ts-ignore
                dispatch(updateCartAsync({ UserId, Quantity: Quantity, DeviceId: deviceId }));
            }
        }

    };

    function toggleDecrementCart(deviceId: string) {
        if (UserId == undefined) {
            const CartItem = localCart.find((item) => item.deviceId == deviceId);
            if (CartItem) {
                const Quantity = CartItem.quantity - 1;
                dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: Quantity }));
                dispatch(updateLocalCart());
            }
        } else {
            const CartItem = Cart.find((item) => item.DeviceId === deviceId);
            if (CartItem) {
                const Quantity = CartItem.Quantity - 1;

                //@ts-ignore
                dispatch(updateCartAsync({ UserId, Quantity: Quantity, DeviceId: deviceId }));
            }
        }

    }

    async function handlePayment() {
        const payDevices = Devices.filter((device) =>
            Cart.some((item: any) => item.DeviceId === device.DeviceId)
        ).map((device) => {
            const CartItem = Cart.find((item) => item.DeviceId == device.DeviceId)
            return {
                ...device,
                Quantity: CartItem?.Quantity
            }
        });


        if (UserId == undefined) {
            navigate('/Login');
            return;
        }

        const stripe = await loadStripe("pk_test_51QlxBiRq46mJj6NwaS3TFwq9HbiC1lzMdaNwLP1Le6qRngqtreZkxaEzGEQkaufspjRKNiWvM0h6geJJZTvhf8ds00hjD7d4xT");

        try {
            toast.success('Proceeding to checkout...');
            const response = await axios.post(
                `${import.meta.env.VITE_PUBLIC_API_URL}/dashboard/${UserId}/create-checkout-session`,
                payDevices
            );

            const { id: sessionId } = response.data;

            if (!stripe) {
                console.error("Stripe failed to initialize.");
                return;
            }

            // ✅ Correct function to redirect
            const result = await stripe.redirectToCheckout({ sessionId });

            if (result.error) {
                console.error("Stripe Checkout Error:", result.error.message);
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    }

    function handleRemoval(DeviceId: string) {
        if (UserId == undefined) {
            dispatch(removeCartItemfromLocalStorage({ deviceId: DeviceId }));
            toast.success('Item removed from cart');
        } else {
            //@ts-ignore
            dispatch(RemoveFromCartAsync({ DeviceId: DeviceId, UserId: UserId }));
            toast.success('Item removed from cart');
        }
    }

    function handleClear() {
        if (UserId == undefined) {
            dispatch(clearLocalCart());
            toast.success('Cleared Cart');
        } else {
            //@ts-ignore
            dispatch(clearCartAsync({ UserId }));
            toast.success('Cleared Cart');
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleContainerClick}
        >
            <div
                className={`fixed right-0 top-0 h-full w-96 bg-black text-white shadow-lg overflow-hidden flex flex-col transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the sidebar from closing it
            >
                <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={handleClose} className="text-white hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {devicesInCart.length > 0 ? (
                        <ul className="divide-y divide-gray-600">
                            {devicesInCart?.map((item: any, index) => (
                                <li
                                    key={`${item.id}-${index}`}
                                    className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800"
                                >
                                    {/* Device Image */}
                                    <img
                                        src={item.Images[1]}
                                        alt={item.DeviceName}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    {/* Device Info and Controls */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="font-bold">{item.DeviceName}</div>
                                                <div className="text-sm text-gray-400">
                                                    {item.Brand} - {item.Model}
                                                </div>
                                                <div className="text-sm text-gray-500">${item.Price}</div>
                                            </div>
                                            <button
                                                //@ts-ignore
                                                onClick={() => handleRemoval(item.DeviceId)}
                                                className="p-2 bg-red-600 rounded-full hover:bg-red-900 transition-colors duration-300"
                                                aria-label="Remove from cart"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            toggleDecrementCart(item.DeviceId);
                                                        }
                                                    }}
                                                    disabled={item.quantity === 1}
                                                    className={`p-1 rounded-full ${item.quantity === 1
                                                        ? "bg-gray-500 cursor-not-allowed"
                                                        : "bg-gray-700 hover:bg-gray-600"
                                                        }`}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => toggleIncrementCart(item.DeviceId)}
                                                    className="p-1 bg-gray-700 rounded-full hover:bg-gray-600"
                                                >
                                                    <Plus size={16} />
                                                </button>

                                            </div>
                                            <div className="text-sm font-bold">
                                                ${(item.Price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-400">No items in the cart</div>
                    )}
                </div>
                <div className="p-4 border-t border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2">
                        <button
                            //@ts-ignore
                            onClick={handleClear}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Cart
                        </button>
                        <NavLink to={UserId == undefined ? "/Login" : "cart"} className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            View Cart
                        </NavLink>
                        <button onClick={handlePayment} className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Proceed to Checkout
                        </button >
                    </div>
                </div>
            </div>
        </div>
    );
};

