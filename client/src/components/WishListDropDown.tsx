import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { NavLink, useParams } from "react-router-dom";

export const WishListDropDown = () => {
    const { UserId } = useParams();
    const wishList = useSelector((state: RootState) => state.wishList.list);
    const localWishList = useSelector((state: RootState) => state.localWishList.list);
    const devices = useSelector((state: RootState) => state.device.devices);
    const devicesArray = Array.isArray(devices) ? devices : []
    const wishListDevices = (UserId == undefined) ? devicesArray.filter((device) => localWishList.includes(device.DeviceId)) : devicesArray.filter((device) => wishList.includes(device.DeviceId));

    return (
        <div className="absolute -left-40 top-8">
            <div className="w-64 bg-black text-white rounded-lg shadow-lg overflow-hidden">
                {wishListDevices.length > 0 ? (
                    <ul className="divide-y divide-gray-600">
                        {wishListDevices.map((item: any) => (
                            <NavLink to={`Device/${item.DeviceId}`}
                                //@ts-ignore
                                key={item.DeviceId}
                                className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800 cursor-pointer"

                            >
                                {/* Device Image */}
                                <img
                                    //@ts-ignore
                                    src={item.Images && item.Images.length > 1 ? item.Images[1] : (item.Images && item.Images.length > 0 ? item.Images[0] : "/placeholder.svg")}
                                    //@ts-ignore
                                    alt={item.DeviceName}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                                {/* Device Info */}
                                <div className="flex-1">
                                    <div className="font-bold">{item.DeviceName}</div>
                                    <div className="text-sm text-gray-400">
                                        {item.Brand} - {item.Model}
                                    </div>
                                    <div className="text-sm text-gray-500">${item.Price}</div>
                                </div>
                            </NavLink>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 text-center text-gray-400">No items in the wishlist</div>
                )}
            </div>
        </div>
    );
};
