import SelectMenuComponent from '../selectMenuComponent/selectMenuComponent';
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate  } from 'react-router-dom';


export default function FormLayoutComponent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ProduktoPavadinimas: '',
        Kategorija: '',
        Kiekis: '',
        Tiekejas: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const token = localStorage.getItem('token');
            // Convert formData to JSON string
            const formDataJson = JSON.stringify(formData);
    
            const response = await axios.post(
                'http://localhost:5088/api/Wish',
                formDataJson,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + token
                    }
                }
            );
            console.log('Wish added:', response.data);
            navigate('/wishes');
        } catch (error) {
            console.error('Error adding wish:', error);
        }
    };
    
    

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12 mx-80 my-20">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Pridėti norą</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Pridėti norimos prekės užklausą
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="ProduktoPavadinimas" className="block text-sm font-medium leading-6 text-gray-900">
                                Produkto pavadinimas
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="ProduktoPavadinimas"
                                        id="ProduktoPavadinimas"
                                        value={formData.ProduktoPavadinimas}
                                        onChange={handleChange}
                                        autoComplete="ProduktoPavadinimas"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="pavadinimas"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="Kategorija" className="block text-sm font-medium leading-6 text-gray-900">
                                Produkto kategorija
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="Kategorija"
                                        id="Kategorija"
                                        value={formData.Kategorija}
                                        onChange={handleChange}
                                        autoComplete="Kategorija"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="kategorija"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="Kiekis" className="block text-sm font-medium leading-6 text-gray-900">
                                Kiekis
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="Kiekis"
                                        id="Kiekis"
                                        value={formData.Kiekis}
                                        onChange={handleChange}
                                        autoComplete="Kiekis"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="kiekis"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <label htmlFor="Tiekejas" className="block text-sm font-medium leading-6 text-gray-900">
                                Tiekėjas
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="Tiekejas"
                                        id="Tiekejas"
                                        value={formData.Tiekejas}
                                        onChange={handleChange}
                                        autoComplete="Tiekejas"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="tiekejas"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Kaip norite gauti pranešimą atsiradus prekei</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Pasirinkite būdą, kaip norite gauti pranešimą atsiradus prekei
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                            El. paštu
                                        </label>
                                        <p className="text-gray-500">Atsiusime laiska i pasta kai preke atsiras</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                            Telefonu
                                        </label>
                                        <p className="text-gray-500">Atsiusime sms zinute</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                            Svetaineje
                                        </label>
                                        <p className="text-gray-500">Atsidarius svetaineje ismesime pranesima</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mx-80 my-5">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Grįžti
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Išsaugoti
                </button>
            </div>
        </form>
    )
}
