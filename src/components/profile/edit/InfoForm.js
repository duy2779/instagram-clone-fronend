const InfoForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="mt-5 w-9/12" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 items-center mb-4">
                <label for="name" className="mr-10 text-right font-semibold">Name</label>
                <input id="name" type="text" className="border h-8 rounded px-2 col-span-4" />
            </div>

            <div className="grid grid-cols-6 mb-4">
                <div></div>
                <p className="text-xs text-gray-secondary col-span-4">
                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                </p>
            </div>

            <div className="grid grid-cols-6 items-center mb-4">
                <label for="username" className="mr-10 text-right font-semibold">Username</label>
                <input id="username" type="text" className="border h-8 rounded px-2 col-span-4" />
            </div>
            <div className="grid grid-cols-6 mb-4">
                <div></div>
                <p className="text-xs text-gray-secondary col-span-4">
                    In most cases, you'll be able to change your username back to kidcrusoe for another 14 days.
                </p>
            </div>
            <div className="grid grid-cols-6 items-center mb-4">
                <label for="email" className="mr-10 text-right font-semibold">Email</label>
                <input id="email" type="email" className="border h-8 rounded px-2 col-span-4" />
            </div>
            <div className="grid grid-cols-6 mb-4">
                <div></div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-medium text-sm font-semibold text-white px-2 py-2 rounded focus:outline-none"
                    >Submit</button>
                </div>
            </div>
        </form>
    )
}

export default InfoForm
