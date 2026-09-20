import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className='w-full h-screen bg-black flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-9xl font-bold text-wh/20'>404</h1>
                <h1 className='text-9xl font-bold text-wh/20'>NotFound</h1>
                <Link to="/">
                    <button className='btn-primary bg-wh/90 text-black py-1.5 rounded-lg'>Return Home</button>
                </Link>
            </div>

        </div>
    )
}
