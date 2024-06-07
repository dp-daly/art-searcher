const Card = ({ artist, title, image }) => {

return (
<div id="card">
    <div id="img-placeholder" style={{backgroundImage: `url(https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg)`}}>
    </div>
    <div id="card-footer">
    <h3>{artist}</h3>
    <h4><i>{title}</i></h4>
    </div>
</div>
)
}

export default Card