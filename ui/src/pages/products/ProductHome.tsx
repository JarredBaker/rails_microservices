import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/userSlice';

const ProductHome: React.FC = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const callLogout = (): void => {
    dispatch(logout());
  }

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-amber-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <p className={"font-satisfy text-xl text-slate-700"}>
                  Welcome to the boutique store
                </p>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/*Profile dropdown -->*/}
                  <div className="relative ml-3">
                    <div>
                      <button onClick={toggleMenu} type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button"
                              aria-expanded="false" aria-haspopup="true">
                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                      </button>
                    </div>


                    {/*Dropdown menu, show/hide based on menu state.*/}

                    {/*Entering: "transition ease-out duration-100"*/}
                    {/*	From: "transform opacity-0 scale-95"*/}
                    {/*	To: "transform opacity-100 scale-100"*/}
                    {/*Leaving: "transition ease-in duration-75"*/}
                    {/*	From: "transform opacity-100 scale-100"*/}
                    {/*	To: "transform opacity-0 scale-95"*/}

                    <div className={`
                      ${showMenu ? '' : 'hidden'}
                      absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                         tabIndex={-1}>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2" onClick={callLogout}>Sign out</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/*Mobile menu button -->*/}
                <button type="button"
                        className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        aria-controls="mobile-menu" aria-expanded="false">
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  {/*Menu open: "hidden", Menu closed: "block" -->*/}
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                  </svg>
                  {/*Menu open: "block", Menu closed: "hidden" -->*/}
                  <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/*/!*Mobile menu, show/hide based on menu state. -->*!/*/}
          {/*<div className="md:hidden" id="mobile-menu">*/}
          {/*  <div className="border-t border-gray-700 pb-3 pt-4">*/}
          {/*    <div className="flex items-center px-5">*/}
          {/*      <div className="flex-shrink-0">*/}
          {/*        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>*/}
          {/*      </div>*/}
          {/*      <div className="ml-3">*/}
          {/*        <div className="text-base font-medium leading-none text-white">Tom Cook</div>*/}
          {/*        <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>*/}
          {/*      </div>*/}
          {/*      <button type="button" className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">*/}
          {/*        <span className="absolute -inset-1.5"></span>*/}
          {/*        <span className="sr-only">View notifications</span>*/}
          {/*        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">*/}
          {/*          <path strokeLinecap="round" strokeLinejoin="round"*/}
          {/*                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>*/}
          {/*        </svg>*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*    <div className="mt-3 space-y-1 px-2">*/}
          {/*      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>*/}
          {/*      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>*/}
          {/*      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </nav>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          </div>
        </main>
      </div>
    </>
  )
}

export default ProductHome;