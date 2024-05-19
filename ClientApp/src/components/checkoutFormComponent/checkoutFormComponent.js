import { useState, useEffect, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Routes from "../../routes/routes";
import axios from 'axios';



export default function CheckoutFormComponent() {
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
        fetchCartItems();
    }, []);
    
    const cartItemsDetails = cartItems.map((item) => (
            <li key={item.krepselioSkelbimoNr} className="flex items-start space-x-4 py-6">
                <img
                    src={item.posterDetails.nuotrauka}
                    alt="#"
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                />
                <div className="flex-auto space-y-1">
                    <h3>{item.posterDetails.pavadinimas}</h3>
                    <p className="text-gray-500">Gyyvunu kategorija: {item.posterDetails.gyvunuKategorija}</p>
                    <p className="text-gray-500">Kiekis: {item.kiekis}</p>
                </div>
                <p className="flex-none text-base font-medium">{item.posterDetails.kaina} €</p>
            </li>
    ));

    useEffect(() => {
        // Calculate total price
        const sum = cartItems.reduce((acc, item) => acc + item.posterDetails.kaina * item.kiekis, 0);
        setTotalPrice(sum);
    }, [cartItems]);

    return (
        <div className="bg-white">
            {/* Background color split screen for large screens */}
            <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
            <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                <h1 className="sr-only">Užsakymo informacija</h1>

                <section
                    aria-labelledby="summary-heading"
                    className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
                >
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Užsakymo apibendrinimas
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                            {cartItemsDetails}
                        </ul>

                        <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Pradinė kaina</dt>
                                <dd>{totalPrice.toFixed(2)} €</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Atsiuntimo kaina</dt>
                                <dd>3.00 €</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base">Iš viso</dt>
                                <dd className="text-base">{(totalPrice + 3.00).toFixed(2)} €</dd>
                            </div>
                        </dl>

                        <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                            <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                                <div className="mx-auto max-w-lg">
                                    <Popover.Button className="flex w-full items-center py-6 font-medium">
                                        <span className="mr-auto text-base">Iš viso</span>
                                        <span className="mr-2 text-base">{(totalPrice + 3.00).toFixed(2)}</span>
                                        <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>

                            <Transition.Root as={Fragment}>
                                <div>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition-opacity ease-linear duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity ease-linear duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                                    </Transition.Child>

                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300 transform"
                                        enterFrom="translate-y-full"
                                        enterTo="translate-y-0"
                                        leave="transition ease-in-out duration-300 transform"
                                        leaveFrom="translate-y-0"
                                        leaveTo="translate-y-full"
                                    >
                                        <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                                            <dl className="mx-auto max-w-lg space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <dt className="text-gray-600">Subtotal</dt>
                                                    <dd>$320.00</dd>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <dt className="text-gray-600">Shipping</dt>
                                                    <dd>$15.00</dd>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <dt className="text-gray-600">Taxes</dt>
                                                    <dd>$26.80</dd>
                                                </div>
                                            </dl>
                                        </Popover.Panel>
                                    </Transition.Child>
                                </div>
                            </Transition.Root>
                        </Popover>
                    </div>
                </section>

                <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <section aria-labelledby="contact-info-heading">
                            <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                Kontaktinė informacija
                            </h2>
                        </section>

                        <section aria-labelledby="shipping-heading" className="mt-10">
                            <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
                                Atsiuntimo informacija
                            </h2>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">

                                <div className="sm:col-span-3">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Adresas
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                                        Apartamentai, kambario numeris.
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="apartment"
                                            name="apartment"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Miestas
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        Rajonas
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="region"
                                            name="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Pašto kodas
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="postal-code"
                                            name="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>


                        <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                            <a
                                href={Routes.client.base}
                                className="block w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto text-center"
                            >
                                Apmokėti
                            </a>
                            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                                Jūs būsite apmokestinti kitame žingsnyje
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
