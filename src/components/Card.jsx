const Card = ({ artist, title, image }) => {

return (
<div id="card">
    <div id="img-placeholder" style={{backgroundImage: `url(https://www.artic.edu/iiif/2/${image}/full/800,/0/default.jpg)`}}>
    </div>
    <div id="card-footer">
    <h3 id="artist-title">{artist}</h3>
    <h4 id="card-title"><i>{title}</i></h4>
    </div>
</div>
)
}

export default Card