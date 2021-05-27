import Header from '../components/Header'

const Page = ({ children }) => {
    return (
        <>
            <Header />
            {
                children
            }
        </>
    )
}

export default Page
