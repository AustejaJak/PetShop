import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ValidatePostersComponent() {
  const [posters, setPosters] = useState([]);
  const [message, setMessage] = useState({ text: '', type: 'info' });

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setMessage({ text: 'Authorization token not found.', type: 'error' });
          return;
        }

        const response = await axios.get('http://localhost:5088/api/Poster', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosters(response.data);
      } catch (error) {
        setMessage({ text: `Error fetching posters: ${error.message}`, type: 'error' });
      }
    };

    fetchPosters();
  }, []);

  const deletePoster = async (posterId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage({ text: 'Authorization token not found.', type: 'error' });
        return;
      }

      await axios.delete(`http://localhost:5088/api/Poster/Delete/${posterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setPosters(posters.filter((poster) => poster.skelbimoNr !== posterId));
      setMessage({ text: 'Poster deleted successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: `Error deleting poster: ${error.message}`, type: 'error' });
    }
  };

  const assignValidation = async (posterId, isValid) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage({ text: 'Authorization token not found.', type: 'error' });
        return;
      }

      await axios.post(`http://localhost:5088/api/Poster/set-validation/${posterId}/${isValid}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage({ text: `Validation assigned successfully`, type: 'success' });
    } catch (error) {
      setMessage({ text: `Error assigning validation: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div>
      {message.text && (
        <div className={`bg-${message.type === 'error' ? 'red' : 'green'}-200 text-${message.type === 'error' ? 'red' : 'green'}-800 p-4 mb-4 text-center`}>
          {message.text}
        </div>
      )}
      <ul role="list" className="divide-y divide-gray-100 my-24 mx-40">
        <div className="text-4xl font-bold mb-7">Skelbimų verifikavimas</div>
        {posters.map((poster) => (
          <li key={poster.skelbimoNr} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" className="hover:underline">
                    {poster.gyvunuKategorija}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {poster.pavadinimas}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                          onClick={() => deletePoster(poster.skelbimoNr)}
                        >
                          Ištrinti<span className="sr-only">, skelbimą</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                          onClick={() => assignValidation(poster.skelbimoNr, 'True')}
                        >
                          Validuoti<span className="sr-only">, skelbimą</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                          onClick={() => assignValidation(poster.skelbimoNr, 'False')}
                        >
                          Nevaliduoti<span className="sr-only">, skelbimą</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
