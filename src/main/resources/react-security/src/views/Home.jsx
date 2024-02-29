import {useEffect, useState} from "react";
import {httpClient} from "../services/http.client.js";
import {effect} from "@preact/signals";
import ReactModal from 'react-modal';
import {UserCard} from "../components/UserCard.jsx";

export const Home = () => {
    const [users, setUsers] = useState([])
    const [current, setCurrent] = useState(httpClient.currentUser.value)
    const [show, setShow] = useState(undefined)

    function fetchUsers() {
        if (current) httpClient.api.get("users")
            .then(response => setUsers(response?.content || []))
    }

    useEffect(() => {
        fetchUsers();
        effect(() => {
            setCurrent(httpClient.currentUser.value)
        })
    }, [])

    return (
        <>
            <div className="w-1/2 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Prénom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 flex justify-center">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.length ? users.map(user =>
                            <tr key={user.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.lastname}
                                </th>
                                <td className="px-6 py-4">
                                    {user.firstname}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 flex justify-around">
                                    <button onClick={() => setShow(user)}
                                        className="font-medium text-green-600 dark:text-green-500 hover:underline">Voir
                                    </button>
                                    {(current?.id || 0) === user.id
                                        ? <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        : current?.roles.includes('ADMIN') ? <button onClick={() => {
                                            httpClient.api.delete(`users/${user.id}`).then(() => fetchUsers())
                                        }}
                                                  className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button> : <></>}
                                </td>
                            </tr>) : <tr>
                            <td colSpan="4">
                            <div
                                    className="flex justify-center items-center p-5 text-black dark:text-white bg-slate-400 dark:bg-slate-800">Aucune
                                    données à afficher
                                </div>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
            <ReactModal isOpen={!!show}
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={() => setShow(undefined)}
                        className={"contents"}
                        overlayClassName={
                            "fixed inset-0 bg-slate-800/75 flex justify-center items-center"}>
                <UserCard user={show}></UserCard>
            </ReactModal>
        </>
    )
}
