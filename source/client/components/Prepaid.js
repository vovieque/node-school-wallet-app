import React from 'react';
import styled from 'emotion/react';
import {Island, Title, Button, Input} from './';

const PrepaidLayout = styled(Island)`
	width: 350px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #353536;
`;

const PrepaidTitle = styled(Title)`
	color: #fff;
`;

const PrepaidItems = styled.div`
	width: 285px;
	margin-bottom: 40px;
`;

const PrepaidItem = styled.div`
	height: 65px;
	display: flex;
	align-items: center;
	background-color: ${({selected}) => selected ? '#108051' : 'rgba(0, 0, 0, 0.05)'};
	border-radius: ${({selected}) => selected ? '3px' : '0'};
`;

const PrepaidItemIcon = styled.div`
	width: 42px;
	height: 42px;
	margin: 18px;
	border-radius: 21px;
	background-color: ${({selected}) => selected ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
`;


const PrepaidItemTitle = styled.div`
	font-size: 13px;
	color: ${({selected}) => selected ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
`;

const PrepaidItemDescription = styled.div`
	color: rgba(255, 255, 255, 0.4);
`;

const SumInput = styled(Input)`
	max-width: 200px;
	margin-bottom: 14px;
`;

const Prepaid = ({inactiveCardsList}) => (
	<PrepaidLayout>
		<PrepaidTitle>Пополнить карту</PrepaidTitle>
		<PrepaidItems>
			<PrepaidItem selected={true}>
				<PrepaidItemIcon selected={true} />
				<PrepaidItemTitle selected={true}>
					C баланса мобильного
					<PrepaidItemDescription>+7 921 555 5555</PrepaidItemDescription>
				</PrepaidItemTitle>
			</PrepaidItem>
			{inactiveCardsList.map((card, index) => (
				<PrepaidItem key={index}>
					<PrepaidItemIcon />
					<PrepaidItemTitle>
						C банковской карты
						<PrepaidItemDescription>{card.number}</PrepaidItemDescription>
					</PrepaidItemTitle>
				</PrepaidItem>
			))}
		</PrepaidItems>
		<SumInput />
		<Button bgColor='#fff' textColor='#108051'>Пополнить</Button>
	</PrepaidLayout>
);

export default Prepaid;
