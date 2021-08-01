import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { updateInfo, clearUpdateInfo, clearUpdateInfoStatus } from '../../../features/userSlice'
import { showMessage } from '../../../features/appMessageSlice'

const InfoForm = ({ user }) => {
    const dispatch = useDispatch()
    const { upload_info } = useSelector(state => state.user)
    const [username, setUserName] = useState(user.username)
    const [fullName, setFullName] = useState(user.full_name)
    const [email, setEmail] = useState(user.email)
    const isBlank = fullName === '' || username === '' || email === ''

    const isValid = (username !== user.username || fullName !== user.full_name || email !== user.email) && !isBlank

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateInfo({ username, full_name: fullName, email }))
    }

    useEffect(() => {
        if (upload_info.success) {
            dispatch(showMessage({ message: "Profile updated" }))
            dispatch(clearUpdateInfoStatus())
        }
        if (upload_info.error) {
            dispatch(clearUpdateInfoStatus())
        }
    }, [upload_info.error, upload_info.success, dispatch])


    useEffect(() => {
        return () => dispatch(clearUpdateInfo())
    }, [dispatch])

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
                    {upload_info.error_message && (
                        <p className="text-sm text-red-primary mb-3">
                            {
                                upload_info.error_message.username ?
                                    upload_info.error_message.username :
                                    upload_info.error_message.email ?
                                        upload_info.error_message.email :
                                        upload_info.error_message
                            }
                        </p>)
                    }
                    <button disabled={!isValid && !upload_info.pending} type="submit" className={`
                        bg-blue-medium w-16 flex items-center justify-center rounded h-8 font-semibold text-sm text-white focus:outline-none
                        ${!isValid && 'opacity-40'}`
                    }>
                        {
                            upload_info.pending ? <img src="/svg/spinner.svg" className="h-full mx-auto" alt="spinner" /> :
                                'Submit'
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default InfoForm

InfoForm.propTypes = {
    user: PropTypes.object.isRequired
}