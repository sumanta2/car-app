"use client";
import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components'
import { useState, useEffect } from 'react';
import { fetchCars } from '@/utils';
import Image from 'next/image'
import { CarProps, CarState, FilterProps } from '@/types';
import { fuels, yearsOfProduction } from '@/constants';

export default function Home() {

    const [allCars, setAllCars] = useState<CarState>([])
    const [Loading, setLoading] = useState(false)

    //search states
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    //filterStates
    const [fuel, setFuel] = useState("");
    const [year, setYear] = useState(2022);

    const getCars = async () => {
        setLoading(true);
        try {
            const result = await fetchCars({
                manufacturer: manufacturer || ' ',
                year: year || 2022,
                fuel: fuel || ' ',
                limit: limit || 10,
                model: model || ' ',
            });
            setAllCars(result);
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }


    }
    // pagination states
    const [limit, setLimit] = useState(10)

    useEffect(() => {

        getCars()

    }, [fuel, year, limit, manufacturer, model])



    const isEmptyData: boolean = !Array.isArray(allCars) || allCars.length < 1 || !allCars
    return (
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 p-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className='text-4xl font-extrabold'>
                        Car Catalogue
                    </h1>
                    <p>
                        Explore the cars you might like
                    </p>
                </div>
                <div className="home__filters">
                    <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

                    <div className="home__filters__container flex gap-3">
                        <CustomFilter options={fuels} setFilter={setFuel} />
                        <CustomFilter options={yearsOfProduction} setFilter={setYear} />
                        {/* <CustomFilter  />
            <CustomFilter  /> */}

                    </div>
                </div>

                {
                    allCars.length > 0 ? (
                        <section>
                            <div className="home__cars-wrapper">
                                {allCars?.map((car: CarProps, index: number) => {
                                    return <CarCard key={index} car={car} />
                                })}
                            </div>

                            {
                                Loading && (
                                    <div className='mt-16 w-full flex-center'>
                                        {<div className="flex flex-col ">
                                            <Image src="/loader.svg" alt="loader" width={50} height={50} className='object-contain'></Image> <span>Loading...</span>
                                        </div>}
                                    </div>
                                )
                            }

                            <ShowMore pageNumber={limit / 10} isNext={limit > allCars.length} setLimit={setLimit} />
                        </section>
                    ) : (
                        !Loading && (<div className="home__error-container">
                            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
                            {
                                allCars?.message
                            }
                        </div>)
                    )
                }


            </div>
        </main>
    )
}
