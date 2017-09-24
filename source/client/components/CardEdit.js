import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const CardEditIcon = styled.div`
	width: 24px;
	height: 24px;
	position: absolute;
	top: -12px;
	right: -12px;
	background-image: url('/assets/cards-delete.svg');
	cursor: pointer;
	display: ${({editable}) => editable ? 'block' : 'none'};
`;

/**
 * Редактирование карты
 */
class CardEdit extends Component {
	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {editable} = this.props;

		const onClick = (e) => {
			e.stopPropagation();
		}

		return (
			<CardEditIcon editable={editable} onClick={onClick}/>
		);
	}
}

CardEdit.propTypes = {
	editable: PropTypes.bool
};

export default CardEdit;
