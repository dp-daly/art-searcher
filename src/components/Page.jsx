const Page = ({ page, total, updatePage }) => {

    return (
    <div id="page">
    <button disabled={page === 1} onClick={() => updatePage('previous')}>Previous</button>
    Page {page} of {total}
    <button onClick={() => updatePage('next')}>Next</button>
    </div>
    )
}

export default Page