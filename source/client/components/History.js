import React from 'react';
import styled from 'emotion/react';
import moment from 'moment';
import {Island} from './';

import transactionsData from '../../data/transactions';

const HistoryLayout = styled(Island)`
	width: 530px;
	max-height: 622px;
	overflow-y: scroll;
	padding: 0;
	background-color: rgba(0, 0, 0, 0.05);
`;

const HistoryTitle = styled.div`
	padding-left: 12px;
	color: rgba(0, 0, 0, 0.4);
	font-size: 15px;
	line-height: 30px;
	text-transform: uppercase;
`;

const HistoryItem = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 74px;
	font-size: 15px;
	white-space: nowrap;

	&:nth-child(even) {
		background-color: #fff;
	}

	&:nth-child(odd) {
		background-color: rgba(255, 255, 255, 0.72);
	}
`;

const HistoryItemIcon = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background-color: #159761;
`;

const HistoryItemTitle = styled.div`
	width: 290px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const HistoryItemTime = styled.div`
	width: 50px;
`;

const HistoryItemSum = styled.div`
	width: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const History = ({activeCardId}) => {
	const cardHistory = transactionsData.filter((data) => {
		return data.cardId === activeCardId;
	});

	const getHistoryItemTitle = (item) => {
		let typeTitle = '';

		switch (item.type) {
			case 'paymentMobile': {
				typeTitle = 'Оплата телефона';
				break;
			}
			case 'prepaidCard': {
				typeTitle = 'Пополнение с карты';
				break;
			}
			case 'withdrawCard': {
				typeTitle = 'Перевод на карту';
				break;
			}
			default: {}
		}

		return `${typeTitle}: ${item.data}`;
	};

	return (
		<HistoryLayout>
			<HistoryTitle>Сегодня</HistoryTitle>
			{cardHistory.map((item, index) => {
				const historyItemDate = moment(item.time);
				const today = moment().format('L'); 
				const isTodayHistoryItem = moment(item.time).format('L') === today;

				if (!isTodayHistoryItem) {
					return '';
				}

				return (
					<HistoryItem key={index}>
						<HistoryItemIcon />
						<HistoryItemTitle>
							{getHistoryItemTitle(item)}
						</HistoryItemTitle>
						<HistoryItemTime>
							{historyItemDate.format('HH:mm')}
						</HistoryItemTime>
						<HistoryItemSum>
							{`${item.sum} ₽`}
						</HistoryItemSum>
					</HistoryItem>
				);
			})}
		</HistoryLayout>
	);
};

export default History;
