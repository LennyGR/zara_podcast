const PreviewCard = ({podcast}) => {
    const { 
        image: { label: img },
        name: { label: title },
        artist: { label: author }
    } = podcast;

    return (<div className="Card__preview">
        <div className="image">
            <img src={img} alt={title}/>
        </div>
        <div className="description">
            <p className="title">{title}</p>
            <p>{`Author: ${author}`}</p>
        </div>
    </div>);
}

export default PreviewCard;