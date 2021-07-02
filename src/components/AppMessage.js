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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </>, document.body
        ) 
    )
}

export default AppMessage
