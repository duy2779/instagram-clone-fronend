import { useState, useRef } from "react"

import SearchResults from "./SearchResults"
import { get, getApiURL } from '../features/config'

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [results, setResults] = useState(null)
    const typingTimeoutRef = useRef(null)

    async function fetchData(query) {
        setIsFetching(true)
        try {
            const response = await get({
                url: getApiURL(`accounts/get-users?q=${query}`)
            })
            if (response.status === 200) {
                setResults(response.data)
                setIsFetching(false)
            }
        } catch (error) {
            setIsFetching(false)
            console.log(error)
        }
    }

    function onSubmit(query) {
        fetchData(query.q)
    }

    function handleSearchTermChange(e) {
        const value = e.target.value
        setSearchTerm(value)

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                q: value
            }
            onSubmit(formValues)
        }, 300)
    }

    function handleFocus(e) {
        if (e.target.value !== '') {
            const formValues = {
                q: e.target.value
            }
            onSubmit(formValues)
        }
    }

    return (
        <div className="w-1/5 my-auto relative hidden md:flex justify-center">
            <input
                onFocus={handleFocus}
                value={searchTerm}
                onChange={handleSearchTermChange}
                aria-label="Search"
                type="text"
                placeholder="Search"
                className="hidden md:block text-sm px-2 text-center text-gray-base
                border h-6 border-gray-primary rounded w-full
                bg-gray-background focus:outline-none focus:text-left"
            />
            <div className={`inset-0 fixed w-full h-full z-10 ${!results && "hidden"}`} onClick={() => setResults(null)}></div>
            {
                results &&
                <SearchResults results={results} isFetching={isFetching} setResults={setResults} />
            }

        </div>
    )
}

export default SearchInput
