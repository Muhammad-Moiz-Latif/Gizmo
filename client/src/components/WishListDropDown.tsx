import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { NavLink, useParams } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";

export const WishListDropDown = () => {
    const { UserId } = useParams();

    const wishList = useSelector(
        (state: RootState) => state.wishList.list
    );

    const localWishList = useSelector(
        (state: RootState) => state.localWishList.list
    );

    const devices = useSelector(
        (state: RootState) => state.device.devices
    );

    const devicesArray = Array.isArray(devices)
        ? devices
        : [];

    const wishListDevices =
        UserId === undefined
            ? devicesArray.filter((device) =>
                localWishList.includes(device.DeviceId)
            )
            : devicesArray.filter((device) =>
                wishList.includes(device.DeviceId)
            );

    return (
        <div className="absolute right-0 top-full z-[60] w-[340px]">
            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-black/[0.07]
                    bg-[#f7f7f5]/95
                    shadow-[0_20px_50px_rgba(0,0,0,0.13)]
                    backdrop-blur-2xl
                "
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                    <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-black/30">
                            Saved
                        </p>

                        <h3 className="mt-0.5 text-sm font-semibold text-black">
                            Your wishlist
                        </h3>
                    </div>

                    <Heart
                        size={15}
                        strokeWidth={1.5}
                        className="text-black/30"
                    />
                </div>

                {wishListDevices.length > 0 ? (
                    <>
                        <div className="max-h-[330px] overflow-y-auto">
                            {wishListDevices.map((item: any) => (
                                <NavLink
                                    key={item.DeviceId}
                                    to={`Device/${item.DeviceId}`}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-black/[0.05]
                                        px-4
                                        py-3
                                        transition-all
                                        duration-200
                                        hover:bg-black/[0.035]
                                    "
                                >
                                    {/* Image */}
                                    <div
                                        className="
                                            h-14
                                            w-14
                                            shrink-0
                                            overflow-hidden
                                            rounded-xl
                                            bg-white
                                        "
                                    >
                                        <img
                                            src={
                                                item.Images &&
                                                    item.Images.length > 1
                                                    ? item.Images[1]
                                                    : item.Images &&
                                                        item.Images.length > 0
                                                        ? item.Images[0]
                                                        : "/placeholder.svg"
                                            }
                                            alt={item.DeviceName}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="
                                                truncate
                                                text-xs
                                                font-semibold
                                                text-black
                                            "
                                        >
                                            {item.DeviceName}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-black/35">
                                            {item.Brand} · {item.Model}
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-black/60">
                                            ${item.Price}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        size={14}
                                        className="
                                            shrink-0
                                            text-black/20
                                            transition-all
                                            duration-300
                                            group-hover:-translate-y-0.5
                                            group-hover:translate-x-0.5
                                            group-hover:text-black
                                        "
                                    />
                                </NavLink>
                            ))}
                        </div>

                        {/* Footer */}
                        <NavLink
                            to={
                                UserId === undefined
                                    ? "/dashboard/wishlist"
                                    : `/dashboard/${UserId}/wishlist`
                            }
                            className="
                                flex
                                items-center
                                justify-between
                                px-4
                                py-3
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-black/50
                                transition-all
                                duration-300
                                hover:bg-black
                                hover:text-white
                            "
                        >
                            View all wishlist

                            <ArrowUpRight size={14} />
                        </NavLink>
                    </>
                ) : (
                    <div className="px-5 py-10 text-center">
                        <div
                            className="
                                mx-auto
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-black/[0.04]
                            "
                        >
                            <Heart
                                size={17}
                                strokeWidth={1.5}
                                className="text-black/25"
                            />
                        </div>

                        <p className="mt-3 text-sm font-medium text-black">
                            Nothing saved yet
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-black/35">
                            Products you save will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};