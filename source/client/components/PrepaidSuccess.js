import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import {Island, Title} from './';

const PrepaidLayout = styled(Island)`
	width: 350px;
	display: flex;
	flex-direction: column;
	background-color: #353536;
	position: relative;
	color: #fff;
`;

const CheckIcom = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	position: absolute;
	top: 14;
	right: 20;
`;

const Header = styled(Title)`
	color: #fff;
`;

const SectionGroup = styled.div`
	margin-bottom: 20px;
`;

const Section = styled.div`
	margin-bottom: 20px;
	width: 100%;
`;

const SectionLabel = styled.div`
	font-size: 13px;
	text-align: left;
`;

const SectionValue = styled.div`
	font-size: 13px;
	letter-spacing: 0.6px;
`;

const RepeatPayment = styled.button`
	font-size: 13px;
	background-color: rgba(0, 0, 0, 0.08);
	height: 42px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	cursor: pointer;
	text-transform: uppercase;
`;

const PrepaidSuccess = ({transaction, repeatPayment}) => {
	const {sum, number} = transaction;

	return (
		<PrepaidLayout>
			<CheckIcom />
			<SectionGroup>
				<Header>Карта пополнена</Header>
				<Section>
					<SectionLabel>Название платежа:</SectionLabel>
					<SectionValue>Пополнение c привязанной карты</SectionValue>
				</Section>
				<Section>
					<SectionLabel>Карта с которой пополнили:</SectionLabel>
					<SectionValue>{number}</SectionValue>
				</Section>
				<Section>
					<SectionLabel>Сумма:</SectionLabel>
					<SectionValue>{sum} ₽</SectionValue>
				</Section>
			</SectionGroup>
			<RepeatPayment onClick={repeatPayment}>Отправить еще один перевод</RepeatPayment>
		</PrepaidLayout>
	);
};

PrepaidSuccess.propTypes = {
	transaction: PropTypes.shape({
		sum: PropTypes.string,
		number: PropTypes.string
	}).isRequired,
	repeatPayment: PropTypes.func.isRequired
};

export default PrepaidSuccess;
