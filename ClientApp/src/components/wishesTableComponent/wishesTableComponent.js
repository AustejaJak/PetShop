import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Routes from '../../routes/routes'; // Import your Routes object

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function WishesTableComponent() {
    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        const fetchWishes = async () => {
            try {
                const response = await axios.get('http://localhost:5088/api/Wish', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setWishes(response.data);
            } catch (error) {
                console.error('Error fetching wishes:', error);
            }
        };

        fetchWishes();
    }, []);

    const deleteWish = async (noroNr) => {
        try {
            await axios.delete(`http://localhost:5088/api/Wish/${noroNr}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Remove the deleted wish from the state
            setWishes(wishes.filter(wish => wish.noroNr !== noroNr));
        } catch (error) {
            console.error('Error deleting wish:', error);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 mx-80 my-20">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Norimos prekės</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Norimų prekių sąrašas
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full">
                            <thead className="bg-white">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                        Pavadinimas
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Kiekis
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Tiekėjas
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                        <span className="sr-only">Redaguoti</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {wishes.map((wish, index) => (
                                    <Fragment key={index}>
                                        <tr className="border-t border-gray-200">
                                            <td
                                                colSpan={5}
                                                scope="colgroup"
                                                className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                            >
                                                {wish.kategorija}
                                            </td>
                                        </tr>
                                        <tr key={wish.noroNr} className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                {wish.produktoPavadinimas}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{wish.kiekis}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{wish.tiekejas}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <a href={`/edit-wish/${wish.noroNr}`} className="text-indigo-600 hover:text-indigo-900">
                                                    Redaguoti<span className="sr-only">, {wish.produktoPavadinimas}</span>
                                                </a>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <button onClick={() => deleteWish(wish.noroNr)} className="text-red-600 hover:text-red-900">
                                                    Ištrinti<span className="sr-only">, {wish.produktoPavadinimas}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
