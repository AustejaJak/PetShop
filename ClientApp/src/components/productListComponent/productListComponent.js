import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductListComponent() {
    const [posters, setPosters] = useState([]);
    
    
    const addToCart = async (posterId) => {
        try {
            const response = await axios.post(`http://localhost:5088/api/Cart/AddToCart/${posterId}`);
            console.log('Added to cart:', posterId);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get('http://localhost:5088/api/Poster');
                console.log('Posters:', response.data);
                setPosters(response.data);
            } catch (error) {
                console.error('Error fetching posters:', error);
            }
        };

        fetchPosters();
    }, []);

    var posterDetails = posters.map((poster) => (
        <div key={poster.skelbimoNr} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                    src={poster.nuotrauka}
                    alt={poster.pavadinimas}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{poster.pavadinimas}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{poster.kaina} €</p>
            <button onClick={() => addToCart(poster.skelbimoNr)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Pridėti į krepšelį
            </button>
        </div>
    ));
    


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Posters</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {posterDetails}
                </div>
            </div>
        </div>
    );
}
