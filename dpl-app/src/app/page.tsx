'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import data from './data';
import { 
    Card, 
    Divider, 
    Button, 
    Accordion,
    AccordionBody,
    AccordionHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import 'flowbite';

type Coordinate = {
    lat: number;
    lng: number;
};
  
type CoordinatesList = Coordinate[];

export default function Home() {
    const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null); 
    const router = useRouter(); 
    const toggleAccordion = (index: number) => {
        if (expandedAccordion === index) {
            setExpandedAccordion(null); 
        } else {
            setExpandedAccordion(index); 
        }
    };

    const handleButtonClick = async (regionName: string, sentinelType: string, fileName: string, 
        coords: CoordinatesList
        ) => {
            const query = new URLSearchParams({
                region: regionName,
                sentinel: sentinelType,
                fileName: fileName,
                coords: JSON.stringify(coords), 
            }).toString();
        
        router.push(`/reports?${query}`);
    };

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
        <nav  className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://prototypedave.github.io/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/dp1.jpeg" className="h-8" alt="School Logo" />
                    <span className="self-center text-l font-semibold whitespace-nowrap dark:text-white">An Investigation of Deep Learning Architectures for Enhancing Urban Building Height Estimation Using Multi-Temporal SAR Datasets</span>
                </a>
                <button data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full" id="navbar-hamburger">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <li>
                            <a onClick={() => nextPageClick('/')} className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a onClick={() => nextPageClick('/about')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6 dark:bg-slate-950">  
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-none lg:w-3/4">
                <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong"></h3>
                <p className="mt-6 text-center text-tremor-label text-tremor-content dark:text-dark-tremor-content">Please choose which region you would like to predict below</p>
           
                <div className="flex items-center space-x-2">
                    <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Regions</h3>
                    <span className="inline-flex size-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">{data.length}</span>
                </div>
                <Divider className="my-4" />
                <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                    {data.map((item, index) => (
                    <Card key={item.name} className="flex flex-col justify-between">
                        <div className="flex-1">
                            <dt className="text-center text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {item.name}
                            </dt>
                            <dd className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                                <div className="flex flex-wrap justify-center text-xs items-center">
                                    Coords: 
                                    <span className="inline-flex items-center gap-x-1 rounded-tremor-small px-2 py-1 text-tremor-custom font-semibold text-emerald-700 ring-1 ring-inset ring-tremor-ring dark:text-emerald-500 dark:ring-dark-tremor-ring">
                                        N: {item.N}
                                    </span>
                                    <span className="inline-flex items-center gap-x-1 rounded-tremor-small px-2 py-1 text-tremor-custom font-semibold text-emerald-700 ring-1 ring-inset ring-tremor-ring dark:text-emerald-500 dark:ring-dark-tremor-ring">
                                        S: {item.S}
                                    </span>
                                    <span className="inline-flex items-center gap-x-1 rounded-tremor-small px-2 py-1 text-tremor-custom font-semibold text-emerald-700 ring-1 ring-inset ring-tremor-ring dark:text-emerald-500 dark:ring-dark-tremor-ring">
                                        E: {item.E}
                                    </span>
                                    <span className="inline-flex items-center gap-x-1 rounded-tremor-small px-2 py-1 text-tremor-custom font-semibold text-emerald-700 ring-1 ring-inset ring-tremor-ring dark:text-emerald-500 dark:ring-dark-tremor-ring">
                                        W: {item.W}
                                    </span>
                                </div>
                                <div>
                                    <Divider className='text-tremor-content dark:text-tremor-dark-content'>Click below to predict {item.name} region </Divider>
                                    <div className="flex flex-wrap justify-center mt-2 gap-12">
                                        <Button 
                                            size='xs'
                                            onClick={() => handleButtonClick(item.name.toLocaleLowerCase(), 'sen1', item.file, item.coordinates)}
                                        >
                                            Predict
                                        </Button>
                                    </div>
                                </div>
                                <Accordion className='border-none mt-3'>
                                    <AccordionHeader
                                        className='text-tremor-content text-tremor-label dark:text-dark-tremor-content'
                                        onClick={() => toggleAccordion(index)} 
                                    >
                                        Sub Areas: <span><em>Random areas for {item.name}</em></span>
                                    </AccordionHeader>
                                    {expandedAccordion === index && ( 
                                        <AccordionBody>
                                            <div className="mt-8 max-h-40 overflow-y-auto">
                                                <Table className="w-full">
                                                    <TableHead>
                                                        <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                Area
                                                            </TableHeaderCell>
                                                            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                Coordinates
                                                            </TableHeaderCell>
                                                            <TableHeaderCell className="text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                Select 
                                                            </TableHeaderCell>                        
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {item.areas && item.areas.map((area) => (
                                                        <TableRow
                                                            key={area.name}
                                                            className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                                                        >
                                                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                            {area.name}
                                                            </TableCell>
                                                            <TableCell>{area.sub}</TableCell>
                                                            <TableCell className='justify-center text-center'>
                                                            <Button 
                                                                size='xs' 
                                                                className='mr-2'
                                                                onClick={() => handleButtonClick(item.name.toLocaleLowerCase(), 'sen1', area.file, area.coords)}
                                                            >
                                                                Predict
                                                            </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </AccordionBody>
                                    )}
                                </Accordion>
                            </dd>
                        </div>
                    </Card>
                    ))}
                </dl>
            </div>
        </main>
        </>
    );
}
