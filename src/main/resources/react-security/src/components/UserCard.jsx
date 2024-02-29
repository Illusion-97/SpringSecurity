const badge_color = {
    "ADMIN" : " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "PUBLIC" : " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "MANAGER" : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
}
export const UserCard = ({user}) => {

    return ( user ?
        <>
            <div
                className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {user.roles ? <div className="w-full px-5 max-w-sm flex absolute -top-3">
                    {user.roles.map(role => <span
                        className={"text-sm font-medium me-2 px-2.5 py-0.5 rounded" + badge_color[role]}>{role}</span>)}
                </div> : <></>}
                <div className="flex flex-col items-center py-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                         src="/error.gif" alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.firstname} {user.lastname}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                    <div className="flex mt-4 md:mt-6">
                        <a href={"mailto:"+ user.email}
                           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contacter</a>
                        </div>
                </div>
            </div>
        </> : <></>
    )
}
