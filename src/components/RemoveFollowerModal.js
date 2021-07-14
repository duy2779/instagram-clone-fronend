import ModalPrioritize from '../common/ModalPrioritize'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUserName } from '../features/userSlice'
import { backendURL } from '../constants/BackendConfig'
import { patch, getApiURL } from '../features/config'

const RemoveFollowerModal = ({ show, setShow, follower, setIsRemoved }) => {
    const dispatch = useDispatch()
    const { userFocus } = useSelector(state => state.user)

    const removeOnClick = async () => {
        try {
            const response = await patch({
                url: getApiURL(`accounts/remove-follower/${follower.username}`)
            })
            if (response.status === 200) {
                await dispatch(getUserByUserName({ username: userFocus.username }))
                setIsRemoved(true)
                setShow(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ModalPrioritize show={show} hideByState={setShow}>
            <div className="relative bg-white rounded-2xl mb-20 text-sm max-w-sm remove-follower-modal">
                <div className="flex flex-col justify-center items-center text-center pt-10 pb-6 border-b">
                    <img src={backendURL + follower.avatar_pic} alt="instagram" className="w-24 h-24 rounded-full mb-5" />
                    <p className="text-xl font-light mb-2">Remove Follower?</p>
                    <p className="px-10 text-gray-secondary">Instagram wont tell {follower.username} they were removed from your followers</p>
                </div>
                <div className="border-b">
                    <button onClick={() => removeOnClick()}
                        className="w-full py-3 focus:outline-none text-red-500 font-bold">
                        Remove
                    </button>
                </div>
                <div>
                    <button onClick={() => setShow(false)}
                        className="w-full py-3 focus:outline-none">
                        Cancel
                    </button>
                </div>
            </div>
        </ModalPrioritize>
    )
}

export default RemoveFollowerModal
