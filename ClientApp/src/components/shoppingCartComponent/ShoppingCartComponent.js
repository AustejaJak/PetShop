import { useState, useEffect, Fragment } from 'react';
import { ShoppingBagIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import axios from 'axios';

export default function ShoppingCartComponent() {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5088/api/Cart/GetCartItems');
            const cartItemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const posterResponse = await axios.get(`http://localhost:5088/api/Poster/${item.skelbimoNr}`);
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
        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.post(`http://localhost:5088/api/Cart/RemoveFromCart/${itemId}`);
            fetchCartItems();  // Re-fetch cart items after removing
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const cartItemsDetails = cartItems.map((item) => (
        <li key={item.krepselioSkelbimoNr} className="flex items-center py-6">
            <img
                src={item.posterDetails.nuotrauka}
                alt="#"
                className="h-16 w-16 flex-none rounded-md border border-gray-200"
            />
            <div className="ml-4 flex-auto">
                <h3 className="font-medium text-gray-900">{item.posterDetails.pavadinimas}</h3>
                <p className="text-gray-500">{item.posterDetails.gyvunuKategorija}</p>
                <div className="flex items-center">
                    <button
                        onClick={() => handleRemoveItem(item.skelbimoNr)}
                        className="rounded-full p-2 text-red-500 hover:text-red-700"
                    >
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span className="ml-2 text-sm text-gray-700">Quantity: {item.kiekis}</span>
                </div>
            </div>
        </li>
    ));

    return (
        <header className="relative bg-white">
            <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-end">
                        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                            <Popover.Button className="group -m-2 flex items-center p-2">
                                <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems.length}</span>
                                <span className="sr-only">items in cart, view bag</span>
                            </Popover.Button>
                            <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                                    <h2 className="sr-only">Shopping Cart</h2>
                                    <form className="mx-auto max-w-2xl px-4">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {cartItemsDetails}
                                        </ul>
                                        <button type="submit" className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            Checkout
                                        </button>
                                        <p className="mt-6 text-center">
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View Shopping Bag</a>
                                        </p>
                                    </form>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </div>
                </div>
            </nav>
        </header>
    );
}
