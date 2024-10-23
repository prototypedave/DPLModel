'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {Map} from './components';
import { useRouter } from 'next/navigation';
import 'flowbite';

type Coordinate = {
    lat: number;
    lng: number;
  };
  
type CoordinatesList = Coordinate[];


export default function Report() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [coordinates, setCoordinates] = useState<CoordinatesList>([]);
    const [pred, setPred] = useState('');
    const [label, setLab] = useState('');
    const [histo, setHist] = useState('');
    const [scatt, setScatt] = useState('');
    const [r2, setR2] = useState();
    const [mae, setMae] = useState();
    const [rmse, setRmse] = useState();
    
    const region = searchParams.get('region') || 'Unknown Region';
    const sentinel = searchParams.get('sentinel') || 'Unknown Sentinel Type';
    const fileName = searchParams.get('fileName') || 'Unknown File Name';
    const coords = searchParams.get('coords');
    const router = useRouter();

    useEffect(() => {
        if (region && sentinel && fileName) {
            const fetchImages = async () => {
                try {
                    const response = await fetch('http://tcc-gpu.th-deg.de:7070/home', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            region: region,
                            sentinel: sentinel,
                            fileName: fileName,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setPred(data.pred);
                        setLab(data.true);
                        setHist(data.hist);
                        setScatt(data.scatt);
                        setR2(data.r2)
                        setMae(data.mae)
                        setRmse(data.rmse)
                    } else {
                        setError('Failed to fetch images');
                    }
                } catch (error) {
                    setError('Error occurred while fetching images');
                } finally {
                    setLoading(false);
                }
            };

            fetchImages();
        }
    }, [region, sentinel, fileName]);

    useEffect(() => {
        if (coords) {
          try {
            const parsedCoords: CoordinatesList = JSON.parse(coords);
            setCoordinates(parsedCoords);
          } catch (error) {
            console.error('Error parsing coordinates:', error);
          }
        }
    }, [coords]);

    const nextPageClick = (page: string) => {
        router.push(page);
    }

    useEffect(() => {
        const initializeFlowbite = async () => {
            const { initFlowbite } = await import('flowbite');
            initFlowbite(); 
        };

        initializeFlowbite();
    }, [router]);

    return (
        <>
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://prototypedave.github.io/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/dp1.jpeg" className="h-8" alt="School Logo" />
                        <span className="self-center text-l font-semibold whitespace-nowrap dark:text-white">
                            An Investigation of Deep Learning Architectures for Enhancing Urban Building Height Estimation Using Multi-Temporal SAR Datasets
                        </span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-hamburger"
                        type="button"
                        className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-hamburger"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full" id="navbar-hamburger">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <li>
                                <a onClick={() => nextPageClick('/')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a onClick={() => nextPageClick('/about')} className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 m-2">
                <div className="w-full h-96 bg-slate-200 dark:bg-slate-800 text-white p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">Satelite Map</h2>
                    <Map coordinates={coordinates} />
                </div>  

                <div className="w-full h-96 bg-slate-200 dark:bg-slate-800 text-white p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">True Images</h2>
                    {label? (
                        <img
                            src={`data:image/png;base64,${label}`}
                            alt={'label'}
                            className="w-[100%] h-[300px]"
                        />
                    ): (
                        <p className="text-center mt-36">Loading True Image...</p>
                    )}
                </div>  

                <div className="w-full h-96 bg-slate-200 dark:bg-slate-800 text-white p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">Predicted Image</h2>
                    {pred? (
                        <img
                            src={`data:image/png;base64,${pred}`}
                            alt={"predicted image"}
                            className="w-[100%] h-[300px]"
                        />  
                    ): (
                        <p className="text-center mt-36">Predicting please wait...</p>
                    )}
                </div>

                <div className="w-full h-96 bg-slate-200 dark:bg-slate-800 text-white p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">Scattered Plot of True v Predicted </h2>
                    {scatt? (
                        <img
                            src={`data:image/png;base64,${scatt}`}
                            alt={'label'}
                            className="w-[100%] h-[300px]"
                        />
                    ): (
                        <p className="text-center mt-36">Wait a minute...</p>
                    )}
                </div>

                <div className="w-full h-96 bg-slate-200 dark:bg-slate-800 text-white p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">Building Heights Data</h2>
                    {histo? (
                        <img
                            src={`data:image/png;base64,${histo}`}
                            alt={'label'}
                            className="w-[100%] h-[300px]"
                        />
                    ): (
                        <p className="text-center mt-36">Wait a minute...</p>
                    )}
                </div>

                <div className="w-full h-96 bg-slate-200 dark:bg-slate-800 text-white p-4 rounded flex items-center justify-center">
                    <div className="w-[300px] bg-white dark:bg-slate-700 p-6 rounded shadow-lg">
                        <h2 className='text-lg font-semibold mb-4 text-center text-black dark:text-white'>Metrics</h2>
                        <div className='flex flex-col gap-4'>
                            <div className="flex justify-between">
                                <p className="font-semibold">R2 Score:</p>
                                <p>{r2}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">MAE:</p>
                                <p>{mae}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">RMSE:</p>
                                <p>{rmse}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}


