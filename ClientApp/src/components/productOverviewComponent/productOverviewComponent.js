import { RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductOverviewComponent() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5088/api/Poster/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProduct(response.data);

                // Fetch similar products
                const similarResponse = await axios.get(`http://localhost:5088/api/Poster/similar/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSimilarProducts(similarResponse.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                <Tab
                                    key={product.skelbimoNr}
                                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className="sr-only">{product.pavadinimas}</span>
                                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                                <img src={product.nuotrauka} alt="" className="h-full w-full object-cover object-center" />
                                            </span>
                                            <span
                                                className={classNames(
                                                    selected ? 'ring-indigo-500' : 'ring-transparent',
                                                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                </Tab>
                            </Tab.List>
                        </div>
                        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                            <Tab.Panel key={product.skelbimoNr}>
                                <img
                                    src={product.nuotrauka}
                                    alt="#"
                                    className="h-full w-full object-cover object-center sm:rounded-lg"
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.pavadinimas}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Produkto informacija</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{product.kaina} €</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Ivertinimai</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {Array.from({ length: product.ivertinimas }).map((_, index) => (
                                        <StarIcon
                                            key={index}
                                            className={classNames(
                                                'text-indigo-500', // If rating is greater than current index, show as active
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                    {Array.from({ length: 5 - product.ivertinimas }).map((_, index) => (
                                        <StarIcon
                                            key={product.ivertinimas + index}
                                            className={classNames(
                                                'text-gray-300', // If rating is less than current index, show as inactive
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.ivertinimas} is 5 zvaigzduciu</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Aprasymas</h3>

                            <div
                                className="space-y-6 text-base text-gray-700"
                                dangerouslySetInnerHTML={{ __html: product.aprasas }}
                            />
                        </div>

                        <form className="mt-6">
                            {/* Colors */}
                            <div className="sm:flex-col1 mt-10 flex">
                                <button
                                    type="submit"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Pridėti į krepšelį
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Similar products */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Similar Products</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {similarProducts.map((similarProduct) => (
                            <div key={similarProduct.skelbimoNr} className="group relative">
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={similarProduct.nuotrauka}
                                        alt={similarProduct.pavadinimas}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={`/product/${similarProduct.skelbimoNr}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {similarProduct.pavadinimas}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{similarProduct.kaina} €</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
