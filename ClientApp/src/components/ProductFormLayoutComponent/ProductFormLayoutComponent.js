import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormLayoutComponent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        GyvunuKategorija: '',
        Pavadinimas: '',
        Kiekis: '',
        Kaina: '',
        Aprasas: '',
        Nuotrauka: '',
        SkelbimoValidacija: 'false',
    });
    const [error, setError] = useState('');

    const categories = [
        'Šunų prekės',
        'Kačių prekės',
        'Graužikų prekės',
        'Paukščių prekės',
        'Žuvų prekės'
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check for empty fields
        for (const key in formData) {
            if (formData[key] === '') {
                setError('Prašome užpildykite visus laukus');
                return;
            }
        }
        try {
            const token = localStorage.getItem('token');
            const formDataJson = JSON.stringify(formData);
            const response = await axios.post(
                'http://localhost:5088/api/Poster',
                formDataJson,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            console.log('Poster added:', response.data);
            navigate('/shop/:category');
        } catch (error) {
            setError(error.response?.data || error.message);
            console.error('Error adding poster:', error.response?.data || error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12 mx-80 my-20">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Pridėti naują skelbimą</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Pridėti naują skelbimą į parduotuvę.
                    </p>
                    {error && (
                        <div className="mb-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="GyvunuKategorija" className="block text-sm font-medium leading-6 text-gray-900">
                                Gyvunu Kategorija
                            </label>
                            <div className="mt-2">
                                <select
                                    name="GyvunuKategorija"
                                    id="GyvunuKategorija"
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    value={formData.GyvunuKategorija}
                                    onChange={handleChange}
                                >
                                    <option value="">Pasirinkite kategorija</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {['Pavadinimas', 'Aprasas', 'Nuotrauka'].map((field) => (
                            <div className="sm:col-span-4" key={field}>
                                <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">
                                    {field}
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name={field}
                                        id={field}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="sm:col-span-4">
                            <label htmlFor="Kiekis" className="block text-sm font-medium leading-6 text-gray-900">
                                Kiekis
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="number"
                                        name="Kiekis"
                                        id="Kiekis"
                                        value={formData.Kiekis}
                                        onChange={handleChange}
                                        autoComplete="Kiekis"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Kiekis"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="Kaina" className="block text-sm font-medium leading-6 text-gray-900">
                                Kaina
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="number"
                                        name="Kaina"
                                        id="Kaina"
                                        value={formData.Kaina}
                                        onChange={handleChange}
                                        autoComplete="Kaina"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Kaina"
                                    />
                                </div>
                            </div>
                        </div>
                        <input
                            type="hidden"
                            name="SkelbimoValidacija"
                            value="false"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Išsaugoti
                </button>
            </div>
        </form>
    );
}
