import axios from 'axios'

const accessToken = () => localStorage.getItem('token') ? localStorage.getItem('token') : null

const prodUrl = 'https://instegrum.herokuapp.com/api'
const devUrl = 'http://127.0.0.1:8000/api'

export const apiEndpointURL = prodUrl

export const getApiURL = (path) => `${apiEndpointURL}/${path}`

export const get = ({ url }) =>
    axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken()}`
        }
    })


export const post = ({ url, payload }) =>
    axios.post(url, payload, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken()}`
        },
    })

export const postWithFile = ({ url, payload }) =>
    axios.post(url, payload, {
        headers: {
            Authorization: `Bearer ${accessToken()}`
        },
    })


export const patch = ({ url, payload }) =>
    axios.patch(url, payload, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken()}`,
        },
    })


export const put = ({ url, payload }) =>
    axios.put(url, payload, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken()}`,
        },
    })

export const remove = ({ url }) =>
    axios.delete(url, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken()}`,
        },
    })