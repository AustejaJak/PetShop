/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";

const products = [
    {
        id: 1,
        name: 'MISOKO KALĖDINIS ŠUNŲ ŽAISLAS MEŠKINAS',
        href: Routes.client.individualProduct,
        price: '15,99€',
        imageSrc: 'https://www.kika.lt/images/galleries/product_items/GIGWIMISG61011A1.JPG',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'LINO ŠUNŲ ANTKAKLIS, SU ODINIAIS ELEMENTAIS',
        href: Routes.client.individualProduct,
        price: '21,99€',
        imageSrc: 'https://www.kika.lt/images/galleries/product_items/LINO32387.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'TAURO PRO LINE NERŪDIJANČIO PLIENO KEIČIAMA GALVUTĖ',
        href: Routes.client.individualProduct,
        price: '51,99€',
        imageSrc: 'https://www.kika.lt/images/galleries/product_items/TPL63629.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'TAURO PRO LINE ŠUKOS',
        href: Routes.client.individualProduct,
        price: '19,99€',
        imageSrc: 'https://www.kika.lt/images/galleries/product_items/TPLB63998.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
]

export default function ProductListComponent() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} href={product.href} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
