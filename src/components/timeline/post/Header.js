import { backendURL } from '../../../constants/BackendConfig'

const Header = ({ user }) => {
    return (
        <div className="flex justify-between items-center px-3 py-2">
            <div className="flex items-center">
                <img
                    src={backendURL + user.avatar_pic}
                    alt={`${user.username}_avatar`}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <p className="col-span-8 text-sm font-semibold">{user.username}</p>
            </div>
            <button className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </button>
        </div>
    )
}

export default Header