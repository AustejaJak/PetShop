import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserListComponent() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ text: '', type: 'info' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setMessage({ text: 'Authorization token not found.', type: 'error' });
          return;
        }

        const response = await fetch('http://localhost:5088/api/User/get-users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setMessage({ text: `Failed to fetch users: ${response.status}`, type: 'error' });
        }
      } catch (error) {
        setMessage({ text: `Error fetching users: ${error.message}`, type: 'error' });
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage({ text: 'Authorization token not found.', type: 'error' });
        return;
      }

      const response = await fetch(`http://localhost:5088/api/User/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        setMessage({ text: 'User deleted successfully', type: 'success' });
      } else {
        setMessage({ text: `Failed to delete user: ${response.status}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `Error deleting user: ${error.message}`, type: 'error' });
    }
  };

  const assignAdminRole = async (userId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage({ text: 'Authorization token not found.', type: 'error' });
        return;
      }

      const response = await fetch(`http://localhost:5088/api/User/assign-admin-role/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage({ text: 'Admin role assigned successfully', type: 'success' });
      } else {
        setMessage({ text: `Failed to assign admin role since the user is already admin: ${response.status}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `Error assigning admin role: ${error.message}`, type: 'error' });
    }
  };

  const assignUserRole = async (userId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage({ text: 'Authorization token not found.', type: 'error' });
        return;
      }

      const response = await fetch(`http://localhost:5088/api/User/assign-user-role/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage({ text: 'User role assigned successfully', type: 'success' });
      } else {
        setMessage({ text: `Failed to assign User role since the user already has user role: ${response.status}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `Error assigning user role: ${error.message}`, type: 'error' });
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
        <div className="text-4xl font-bold mb-7">Naudotojų paskyrų valdymas</div>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" className="hover:underline">
                    {user.userName}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <a href={`mailto:${user.email}`} className="truncate hover:underline">
                    {user.email}
                  </a>
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
                          onClick={() => deleteUser(user.id)}
                        >
                          Ištrinti<span className="sr-only">, {user.userName}</span>
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
                          onClick={() => assignAdminRole(user.id)}
                        >
                          Duoti admin<span className="sr-only">, {user.userName}</span>
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
                          onClick={() => assignUserRole(user.id)}
                        >
                          Duoti user<span className="sr-only">, {user.userName}</span>
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
