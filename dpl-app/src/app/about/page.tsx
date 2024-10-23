'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'flowbite';
export default function About() {
    const router = useRouter();
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
                        <img src="/dp1.jpeg" className="h-8" alt="Logo" />
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

            <section id="about" className="py-12 px-4 md:px-8 lg:px-16 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                        About Our Deep Learning Model for Building Height Estimation
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        This project investigates the use of deep learning techniques to estimate building heights in urban areas using multi-temporal SAR (Synthetic Aperture Radar) datasets. Building height information is crucial for urban planning, disaster management, and environmental studies. Our model leverages state-of-the-art deep learning architectures, which process multi-temporal SAR data to provide accurate building height predictions.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Key Features of the Model
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>Utilizes SAR data from multiple time periods to capture temporal variations in urban environments.</li>
                        <li>Incorporates a modified U-Net architecture for accurate building height estimation at a high resolution.</li>
                        <li>Preprocesses SAR data to remove noise and enhance the features related to building structures.</li>
                        <li>Employs data augmentation techniques to improve the model's generalization on diverse urban landscapes.</li>
                        <li>Combines height and footprint predictions for a holistic understanding of urban structures.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-8">
                        Why Multi-Temporal SAR?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        SAR datasets offer unique capabilities for urban analysis, including the ability to penetrate cloud cover and capture surface information during day or night. By using multi-temporal data, our model can analyze changes over time, improving the accuracy of building height predictions. This temporal information helps the model differentiate between permanent structures and temporary changes in the environment.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Applications
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        The predicted building heights can be applied in various domains, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>Urban planning and development monitoring</li>
                        <li>Disaster response and risk assessment</li>
                        <li>Infrastructure and environmental impact studies</li>
                        <li>3D mapping and city modeling</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-8">
                        Future Work
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Future developments of this model will focus on improving its scalability to handle larger datasets and more diverse urban landscapes. Additionally, we plan to explore the use of other satellite datasets and incorporate fusion techniques to further enhance building height predictions.
                    </p>
                </div>
            </section>
        </>
    );
}
