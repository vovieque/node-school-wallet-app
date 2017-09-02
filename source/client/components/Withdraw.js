import React from 'react';
import styled from 'emotion/react';
import {Card, Island, Title, Button, Input} from './';

const WithdrawLayout = styled(Island)`
	width: 440px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SumInput = styled(Input)`
	max-width: 200px;
	background-color: rgba(0, 0, 0, 0.08);
	margin: 20px 0;
`;

const Withdraw = ({cardsList, inactiveCardsList}) => {
	return (
		<WithdrawLayout>
			<Title>Вывести деньги на карту</Title>
			<Card type='select' data={inactiveCardsList} />
			<SumInput textColor='#000' />
			<Button>Вывести</Button>
		</WithdrawLayout>
	);
};

export default Withdraw;
