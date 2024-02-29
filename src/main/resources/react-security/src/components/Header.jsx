import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {httpClient} from "../services/http.client.js";
import {computed, effect} from "@preact/signals";

export const Header = () => {
    const [dark, setDark] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
            if (dark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
        , [dark])

    useEffect(() => {
        setDark(document.documentElement.classList.contains("dark") ||
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, [])

    const [logged, setLogged] = useState(httpClient.logged.value)
    useEffect(() => {
        effect(() => setLogged(httpClient.logged.value))
    }, [])

    function toggleDarkMode() {
        setDark((current) => !current)
    }

    return (
        <>
            <nav className="bg-slate-400 border-gray-200 dark:border-gray-600 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse" href="https://flowbite.com">
                        <img alt="Flowbite Logo" className="h-8" src="https://flowbite.com/docs/images/logo.svg"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div className="md:order-1">
                        <button onClick={toggleDarkMode}
                                className="text-gray-500 inline-flex items-center justify-center dark:text-gray-400 hover:bg-gray-100 w-10 h-10 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                                id="theme-toggle"
                                type="button">
                            <svg aria-hidden="true" className={"w-4 h-4" + (dark ? ' hidden' : '')} fill="currentColor"
                                 id="theme-toggle-dark-icon" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                            </svg>
                            <svg aria-hidden="true" className={"w-4 h-4" + (dark ? '' : ' hidden')} fill="currentColor"
                                 id="theme-toggle-light-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                            </svg>
                            <span className="sr-only">Toggle dark mode</span>
                        </button>
                        <button aria-controls="mega-menu-full-image" aria-expanded="false"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                data-collapse-toggle="mega-menu-full-image" type="button">
                            <span className="sr-only">Open main menu</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 17 14"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"/>
                            </svg>
                        </button>
                    </div>
                    <div className="items-center gap-3 justify-between hidden w-full md:flex md:w-auto"
                         id="mega-menu-full-image">
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                            <li>
                                <Link to="/" aria-current="page"
                                      className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                >Home</Link>
                            </li>
                            {logged
                                ? <button onClick={() => {
                                    httpClient.logout();
                                    navigate("/login")
                                }}
                                          className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                >Logout</button>
                                :
                                <>
                                    <li>
                                        <Link to="/login"
                                              className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                        >Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register"
                                              className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                        >Register</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
