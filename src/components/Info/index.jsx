import PropTypes from 'prop-types';

const Info = ({ podcast }) => {
	const {
		image: { label: img },
		name: { label: title },
		artist: { label: author },
		summary: { label: description }
	} = podcast;

	return (
		<div className='info'>
			<div className='info__Image'>
				<img src={img} alt={title} />
			</div>
			<div className='info__Header'>
				<p className='title'>{title}</p>
				<p className='author'>{`by ${author}`}</p>
			</div>
			<div className='info__Description'>
				<p className='title'>{'Description:'}</p>
				<p>{description}</p>
			</div>
		</div>
	);
};

Info.propTypes = {
	podcast: PropTypes.any.isRequired
};

export default Info;
