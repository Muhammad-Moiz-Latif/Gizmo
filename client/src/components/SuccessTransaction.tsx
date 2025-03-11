import checked from '../assets/checked.png';
import home from '../assets/home.png';

export const SuccessTransaction = () => {
    return (
        <div className="max-w-screen min-h-screen flex justify-center items-center font-roboto">
            <div className="h-96 w-96 rounded-3xl flex flex-col items-center px-10 py-4 border border-green-200 bg-green-50">
                <h1 className='text-2xl font-roboto font-semibold pb-3'>Transaction Successful!</h1>
                <div className='bg-green-300 rounded-full p-2 mb-5'>
                    <div className='bg-green-400 rounded-full p-2 '>
                        <div className='bg-green-500 rounded-full p-2'>
                            <img src={checked || "/placeholder.svg"} className='w-24 h-24' />
                        </div>
                    </div>
                </div>
                <p className='text-justify mb-5 text-sm/5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, nisi perspiciatis iste tempora est officia!</p>
                <div className='flex gap-3'>
                    <button className='w-40 h-10 border border-green-700 rounded-md text-green-700 overflow-hidden group relative active:opacity-50'>
                        <span className="flex items-center justify-center absolute inset-0 transition-transform duration-300 transform group-hover:-translate-x-full">
                            Continue Shopping
                        </span>
                        <span className="flex items-center justify-center absolute inset-0 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
                            <img src={home} className="w-6 h-6" />
                        </span>
                    </button>
                    <button className='w-40 h-10 bg-green-700 rounded-md text-white'>View Receipt</button>
                </div>
            </div>
        </div>
    )
}