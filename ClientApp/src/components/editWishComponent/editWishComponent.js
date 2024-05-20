import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditWishComponent() {
    const navigate = useNavigate();
    const { wishId } = useParams();
    const [formData, setFormData] = useState({
        produktoPavadinimas: '',
        kategorija: '',
        kiekis: '',
        tiekejas: ''
    });

    const categories = [
        'Šunų prekės',
        'Kačių prekės',
        'Graužikų prekės',
        'Paukščių prekės',
        'Žuvų prekės'
    ];

    useEffect(() => {
        async function fetchWish() {
            try {
                console.log(wishId);
                const response = await axios.get(`http://localhost:5088/api/Wish/${wishId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Fetched wish data:', response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching wish:', error);
            }
        }
        fetchWish();
    }, [wishId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5088/api/Wish/${wishId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Wish edited:', response.data);
            navigate('/wishes');
        } catch (error) {
            console.error('Error editing wish:', error);
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
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Redaguoti norą</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Redaguoti norimo produkto informaciją
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="produktoPavadinimas" className="block text-sm font-medium leading-6 text-gray-900">
                                Produkto pavadinimas
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="produktoPavadinimas"
                                        value={formData.produktoPavadinimas}
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="kategorija" className="block text-sm font-medium leading-6 text-gray-900">
                                Produkto kategorija
                            </label>
                            <div className="mt-2">
                                <select
                                    name="kategorija"
                                    id="kategorija"
                                    value={formData.kategorija}
                                    onChange={handleChange}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                >
                                    <option value="">Pasirinkite kategoriją</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="kiekis" className="block text-sm font-medium leading-6 text-gray-900">
                                Kiekis
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="kiekis"
                                        value={formData.kiekis}
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="tiekejas" className="block text-sm font-medium leading-6 text-gray-900">
                                Tiekėjas
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="tiekejas"
                                        value={formData.tiekejas}
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mx-80 my-5">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => navigate('/wishes')}
                >
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
    );
}
