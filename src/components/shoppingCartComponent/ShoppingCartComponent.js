import { Fragment } from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import Routes from "../../routes/routes";

const products = [
    {
        id: 1,
        name: 'Misoko kalėdinis šunų žaislas meškinas',
        href: '#',
        imageSrc: 'https://www.kika.lt/images/galleries/product_items/GIGWIMISG61011A1.JPG',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Lino šunų antkaklis, su odiniais elementais',
        href: '#',
        imageSrc: 'https://www.kika.lt/images/galleries/product_items/LINO32387.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

export default function ShoppingCartComponent() {
    return (
        <header className="">
            <nav aria-label="Top" className="">
                <div className="">
                    <div className="">
                        <div className="">
                            {/* Cart */}
                            <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                                <Popover.Button className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Popover.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                                        <h2 className="sr-only">Shopping Cart</h2>

                                        <form className="mx-auto max-w-2xl px-4">
                                            <ul role="list" className="divide-y divide-gray-200">
                                                {products.map((product) => (
                                                    <li key={product.id} className="flex items-center py-6">
                                                        <img
                                                            src={product.imageSrc}
                                                            alt={product.imageAlt}
                                                            className="h-16 w-16 flex-none rounded-md border border-gray-200"
                                                        />
                                                        <div className="ml-4 flex-auto">
                                                            <h3 className="font-medium text-gray-900">
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <p className="text-gray-500">{product.color}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                            <a
                                                href={Routes.client.checkout}
                                                className="block w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 text-center"
                                            >
                                                Apsipirkti
                                            </a>

                                            <p className="mt-6 text-center">
                                                <a href={Routes.client.shoppingBag} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                    Peržiūrėti krepšelį
                                                </a>
                                            </p>
                                        </form>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
