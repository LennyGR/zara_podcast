import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PreviewCard = ({ podcast }) => {
	const {
		image: { label: img },
		name: { label: title },
		artist: { label: author },
		cleanId
	} = podcast;

	const navigate = useNavigate();

	const handlePodcast = (id) => {
		navigate(`/podcast/${id}`);
	};

	return (
		<div className='Card__preview' onClick={() => handlePodcast(cleanId)}>
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
