import Page from "./Page";

const NotFound = () => {
    document.title = 'Page Not Found • Instagram';

    return (
        <Page>
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-5">Sorry, this page isn't available.</h2>
                <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
            </div>
        </Page>
    )
}

export default NotFound
