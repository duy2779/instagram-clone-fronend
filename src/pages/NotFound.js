import Page from "./Page";

const NotFound = () => {
    document.title = 'Page Not Found • Instagram';

    return (
        <Page>
            <div className="text-center mt-10 w-4/5 mx-auto md:mt-auto">
                <h2 className="text-xl font-semibold mb-5 w-3/4 mx-auto md:text-2xl">Sorry, this page isn't available.</h2>
                <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
            </div>
        </Page>
    )
}

export default NotFound
