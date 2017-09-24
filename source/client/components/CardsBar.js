import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import {Card} from './';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #242424;
	padding: 20px;
`;

const Logo = styled.div`
	width: 147px;
	height: 28px;
	margin-bottom: 55px;
	background-image: url('/assets/yamoney-logo.svg');
`;

const Edit = styled.div`
	position: absolute;
	top: 17px;
	right: 12px;
	width: 34px;
	height: 35px;
	cursor: pointer;
	background-image: url('/assets/${({editable}) => editable ? 'cards-edit-active' : 'cards-edit'}.svg');
	background-repeat: no-repeat;
	background-position: center center;
`;

const CardsList = styled.div`
	flex: 1;
`;

const Footer = styled.footer`
	color: rgba(255, 255, 255, 0.2);
	font-size: 15px;
`;

const CardsBar = ({activeCardIndex, cardsList, onCardChange, onEditChange, isCardsEditable}) => {
	const onCardClick = (activeCardIndex) => {
		onCardChange && onCardChange(activeCardIndex);
	};

	const onEditClick = (isEditable) => {
		onEditChange && onEditChange(isEditable);
	}

	return (
		<Layout>
			<Logo />
			<Edit onClick={() => onEditClick(isCardsEditable)} editable={isCardsEditable} />
			<CardsList>
				{cardsList.map((card, index) => (
					<Card
						key={index}
						data={card}
						active={index === activeCardIndex}
						isCardsEditable={isCardsEditable}
						onClick={() => onCardClick(index)} />
				))}
				<Card type='new' />
			</CardsList>
			<Footer>Yamoney Node School</Footer>
		</Layout>
	);
};

CardsBar.propTypes = {
	cardsList: PropTypes.array.isRequired,
	activeCardIndex: PropTypes.number.isRequired,
	onCardChange: PropTypes.func.isRequired,
	isCardsEditable: PropTypes.bool.isRequired,
	onEditChange: PropTypes.func.isRequired
};

export default CardsBar;
