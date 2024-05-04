import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import Routes from "../../routes/routes";
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';


export default function CheckoutComponent() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token
            const response = await axios.get('http://localhost:5088/api/Cart/GetCartItems', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const cartItemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const posterResponse = await axios.get(`http://localhost:5088/api/Poster/${item.skelbimoNr}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return {
                    ...item,
                    posterDetails: posterResponse.data
                };
            }));
            setCartItems(cartItemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        // Calculate total price
        const sum = cartItems.reduce((acc, item) => acc + item.posterDetails.kaina * item.kiekis, 0);
        setTotalPrice(sum);
    }, [cartItems]);

    useEffect(() => {
        fetchCartItems(); // Fetch cart items initially
    }, []);

    const checkoutDetails = cartItems.map((item) => (
        <li key={item.krepselioSkelbimoNr} className="flex py-6">
        <div className="flex-shrink-0">
            <img
                src={item.posterDetails.nuotrauka}
                alt="#"
                className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
            />
        </div>

        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
            <div>
                <div className="flex justify-between">
                    <h4 className="text-sm">
                        <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                            {item.posterDetails.pavadinimas}
                        </a>
                    </h4>
                    <p className="ml-4 text-sm font-medium text-gray-900">{item.posterDetails.kaina} €</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Gyvūno kategorija: {item.posterDetails.gyvunuKategorija}</p>
                <p className="mt-1 text-sm text-gray-500">Kiekis: {item.kiekis}</p>
            </div>

            <div className="mt-4 flex flex-1 items-end justify-between">
                <div className="ml-4">
                </div>
            </div>
        </div>
    </li>
    ));
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pirkinių krepšelis</h1>

                <form className="mt-12">
                    <section aria-labelledby="cart-heading">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {checkoutDetails}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section aria-labelledby="summary-heading" className="mt-10">
                        <h2 id="summary-heading" className="sr-only">
                            Order summary
                        </h2>

                        <div>
                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Iš viso</dt>
                                    <dd className="ml-4 text-base font-medium text-gray-900">{totalPrice.toFixed(2)} €</dd>
                                </div>
                            </dl>
                            <p className="mt-1 text-sm text-gray-500">Atsiuntimas bus priskaičiuotas perkant prekes</p>
                        </div>

                        <div className="mt-10">
                            <a
                                href={Routes.client.checkout}
                                className="block w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 text-center"
                            >
                                Pirkti
                            </a>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <p>
                                arba
                                <a href={Routes.client.category} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Toliau žiūrėti prekes
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </p>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
