import { backendURL } from '../constants/BackendConfig'
import { Link } from 'react-router-dom'

function SearchResults({ results, isFetching }) {

    return (
        <div className="search-results absolute rounded w-96 top-full bg-white mt-3  z-30">
            <div className="h-96 overflow-x-auto">
                {
                    isFetching ? (
                        <div className="flex justify-center h-full items-center">
                            <img src="/svg/spinner-gray.svg" className="h-12 w-12" alt="spinner" />
                        </div>
                    ) : results.length !== 0 ? (
                        <ul>
                            {
                                results.map(user => (
                                    <li key={user.id} className="cursor-pointer hover:bg-gray-background">
                                        <Link to={`/profile/${user.username}`} className="flex p-2 items-center gap-x-2">
                                            <img src={backendURL + user.avatar_pic} alt={user.id} className="w-12 h-12 rounded-full object-cover" />
                                            <p className="flex flex-col text-sm">
                                                <span className="font-semibold">{user.username}</span>
                                                <span className="text-gray-secondary">{user.full_name}</span>
                                            </p>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <div className="flex justify-center h-full items-center">
                            <span>No match</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchResults
