import React, { useRef, useState } from 'react'
import ReactDom from 'react-dom'
import { useDispatch } from 'react-redux'

const Modal = ({ show, children, hide }) => {
    const modalRef = useRef();
    const dispatch = useDispatch()

    const closeModal = e => {
        if (modalRef.current === e.target) {
            dispatch(hide())
        }
    };

    return (
        show ? ReactDom.createPortal(
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    onClick={closeModal} ref={modalRef}
                >
                    {children}
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black-base"></div>
            </>, document.body
        ) : null
    )
}

export default Modal
