import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import {Card, Button} from './';

const CardDeleteLayout = styled.div`
	flex: 1;
	width: 260px;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 0.9px;
	color: #ffffff;
	margin-bottom: 10px;
`;

const Description = styled.div`
	font-size: 15px;
	font-weight: 100;
	line-height: 1.6;
	letter-spacing: 0.5px;
	color: #ffffff;
	margin-bottom: 26px;
`;

const LinkCardText = styled.div`
	opacity: 0.4;
	font-size: 11px;
	line-height: 2.18;
	letter-spacing: 0.5px;
	color: #ffffff;
	margin-top: 4px;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 35px;
`;

const CardDelete = ({
	data, onCancelClick, deleteCard
}) => (
	<CardDeleteLayout>
		<Title>Удаление карты</Title>
		<Description>
			Подтвердите, что нужно удалить следующую банковскую карту:
		</Description>
		<Card
			isSingle
			data={data}
			active={true}
			isCardsEditable={false} />
		<LinkCardText>Привязать карту можно в любой момент</LinkCardText>
		<Footer>
			<div onClick={() => deleteCard(data.id)}>
				<Button bgColor='#d3292a' textColor='#fff'>Удалить</Button>
			</div>
			<div onClick={() => onCancelClick(true)}>
				<Button bgColor='#1F1F1F' textColor='#fff'>Вернуться</Button>
			</div>
		</Footer>
	</CardDeleteLayout>
);

CardDelete.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onCancelClick: PropTypes.func.isRequired,
	deleteCard: PropTypes.func.isRequired
};

export default CardDelete;
