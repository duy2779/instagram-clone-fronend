import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({ show, children }) => {
    return (
        show ? ReactDom.createPortal(
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                    {children}
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>, document.body
        ) : null
    )
}

export default Modal
