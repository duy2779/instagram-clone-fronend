import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { updateInfo } from '../../../features/userSlice'
import { showMessage } from '../../../features/appMessageSlice'

const InfoForm = ({ user }) => {
    const dispatch = useDispatch()
    const { errorMessage } = useSelector(state => state.user)
    const [username, setUserName] = useState(user.username)
    const [fullName, setFullName] = useState(user.full_name)
    const [email, setEmail] = useState(user.email)
    const isBlank = fullName === '' || username === '' || email === ''

    const isValid = (username !== user.username || fullName !== user.full_name || email !== user.email) && !isBlank

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(updateInfo({ username, full_name: fullName, email }))
        dispatch(showMessage({message:"Profile updated"}))
    }

    return (
        <form className="mt-5 lg:w-9/12" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:justify-between gap-y-2 lg:items-center mb-4">
                <label htmlFor="name" className="md:text-right md:w-2/12 font-semibold">Name</label>
                <input
                    id="name"
                    type="text"
                    value={fullName}
                    className="border h-8 rounded px-2 w-full md:w-4/5"
                    onChange={({ target }) => setFullName(target.value)} />
            </div>

            <div className="mb-4 md:flex md:justify-between">
                <div></div>
                <p className="text-xs text-gray-secondary col-span-4 md:w-4/5">
                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-y-2 lg:items-center mb-4">
                <label htmlFor="username" className="lg:text-right md:w-2/12 font-semibold">Username</label>
                <input
                    id="username" value={username}
                    type="text"
                    className="border h-8 rounded px-2 col-span-4 w-full md:w-4/5"
                    onChange={({ target }) => setUserName(target.value)} />
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div></div>
                <p className="text-xs text-gray-secondary col-span-4 md:w-4/5">
                    In most cases, you'll be able to change your username back to kidcrusoe for another 14 days.
                </p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-y-2 lg:items-center mb-4">
                <label htmlFor="email" className="lg:text-right md:w-2/12 font-semibold">Email</label>
                <input
                    id="email"
                    value={email}
                    type="email"
                    className="border h-8 rounded px-2 col-span-4 w-full md:w-4/5"
                    onChange={({ target }) => setEmail(target.value)} />
            </div>
            <div className="md:flex md:justify-between mb-4">
                <div></div>
                <div className="md:w-4/5">
                    {errorMessage && <p className="mb-4 text-sm text-red-primary ">
                        {errorMessage.username ? errorMessage.username : errorMessage.email ? errorMessage.email : errorMessage}</p>}
                    <button
                        type="submit"
                        className={`bg-blue-medium text-sm font-semibold text-white px-2 py-2 rounded focus:outline-none ${!isValid && 'opacity-50 disabled'}`}
                    >Submit</button>
                </div>
            </div>
        </form>
    )
}

export default InfoForm

InfoForm.propTypes = {
    user: PropTypes.object.isRequired
}