"use client"
import React, { useState } from 'react'
import { SearchManufacturer } from './'
import { manufacturers } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
    return (
        <button type="submit" className={`ml-3 z-10 ${otherClasses}`}>
            <Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40} />
        </button>
    )
}

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('')
    const Router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer == " " && model == " ")
        {
            return alert('Please fill in the search bar');
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    }


    const updateSearchParams=(model:string,manufacturer:string)=>{
        const searchParams = new URLSearchParams(window.location.search);
        if (model)
        {
            searchParams.set('model', model);
        }
        else {
            searchParams.delete('model');
        }
        if(manufacturer){
            searchParams.set('manufacturer', manufacturer);
            // console.log(searchParams)
        }
        else
        {
            searchParams.delete('manufacturer');
        }
        const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
        Router.push(newPathName);
    }

    return (
        <div>
            <form onSubmit={handleSearch} className="searchbar">
                <div className="searchbar__item">
                    <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
                    <SearchButton otherClasses="sm:hidden" />
                </div>
                <div className='searchbar__item'>
                    <Image src="/model-icon.png" width={25} height={25} className='absolute w-[20px] h-[20px] ml-4' alt='car model' />
                    <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder='Model' className="searchbar__input" />
                    <SearchButton otherClasses="sm:hidden" />
                </div>
                <SearchButton otherClasses="max-sm:hidden" />
                
            </form>
        </div>
    )
}

export default SearchBar