import ReactDom from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'
import {hideMessage} from '../features/appMessageSlice'

const AppMessage = () => {
    const { message, show } = useSelector(state => state.appMessage)
    const dispatch = useDispatch()

    useEffect(() => {
        if(show) {
            setTimeout(() => {
                dispatch(hideMessage())
            }, 5000)
        }
        // eslint-disable-next-line
    }, [show])

    return (
        ReactDom.createPortal(
            <>
                <div
                    className={`fixed w-full text-white p-5 flex justify-between h-20 transition-all duration-1000 ${show ? 'bottom-0' : '-bottom-full'}`}
                    style={{ backgroundColor: '#262626' }}
                >
                    <p>{message}</p>
                </div>
            </>, document.body
        ) 
    )
}

export default AppMessage
