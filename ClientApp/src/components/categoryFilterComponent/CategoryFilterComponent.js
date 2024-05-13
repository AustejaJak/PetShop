import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import ProductListComponent from "../productListComponent/productListComponent";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const subCategories = [
    { name: 'Šunų prekės', slug: 'sunu-prekes' },
    { name: 'Kačių prekės', slug: 'kaciu-prekes' },
    { name: 'Graužikų prekės', slug: 'grauziku-prekes' },
    { name: 'Paukščių prekės', slug: 'pauksciu-prekes' },
    { name: 'Žuvų prekės', slug: 'zuvu-prekes' },
];

export default function CategoryFilterComponent() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Visi produktai');
    const [headerText, setHeaderText] = useState('Visi produktai');
    const navigate = useNavigate();

    useEffect(() => {
        const selectedCategoryFromStorage = localStorage.getItem('selectedCategory');
        if (selectedCategoryFromStorage) {
            setSelectedCategory(selectedCategoryFromStorage);
            setHeaderText(selectedCategoryFromStorage);
        }
    }, []);

    const fetchPosters = async () => {
        try {
            const response = await axios.get('http://localhost:5088/api/Poster', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Posters:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching posters:', error);
        }
    };

    useEffect(() => {
        fetchPosters();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.name);
        setHeaderText(category.name);
        localStorage.setItem('selectedCategory', category.name);
        const url = category ? `/shop/${category.slug}` : '/';
        navigate(url);
    };

    const filteredProducts = selectedCategory === 'Visi produktai' ? products : products.filter(product => product.gyvunuKategorija === selectedCategory);

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{headerText}</h1>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <h2 id="products-heading" className="sr-only">
                        Produktai
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <form className="hidden lg:block">
                            <h3 className="sr-only">Kategorijos</h3>
                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                {subCategories.map((category) => (
                                    <li key={category.name}>
                                        <button
                                            onClick={() => handleCategoryChange(category)}
                                            className={selectedCategory === category.name ? 'active' : ''}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </form>

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            <ProductListComponent posters={filteredProducts} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
