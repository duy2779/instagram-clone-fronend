const SearchInput = () => {
    return (
        <div className="w-1/5 my-auto relative">
            <input
                aria-label="Search"
                type="text"
                placeholder="Search"
                className="hidden md:block text-sm px-2 text-center text-gray-base
                border h-6 border-gray-primary rounded w-full
                bg-gray-background focus:outline-none focus:text-left"
            />
            <div className="hidden search-results absolute h-96 rounded w-96 bg-white -left-1/2 mt-3">

            </div>
        </div>
    )
}

export default SearchInput
