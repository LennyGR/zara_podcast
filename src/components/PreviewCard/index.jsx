import PropTypes from 'prop-types';

const PreviewCard = ({ podcast }) => {
	const {
		image: { label: img },
		name: { label: title },
		artist: { label: author }
	} = podcast;

	return (
		<div className='Card__preview'>
			<div className='image'>
				<img src={img} alt={title} />
			</div>
			<div className='description'>
				<p className='title'>{title}</p>
				<p>{`Author: ${author}`}</p>
			</div>
		</div>
	);
};

PreviewCard.propTypes = {
	podcast: PropTypes.any.isRequired
};

export default PreviewCard;
