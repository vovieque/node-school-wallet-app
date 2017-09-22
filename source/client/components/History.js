import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import moment from 'moment';

import {Island} from './';

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
	background-image: url(${({bankSmLogoUrl}) => bankSmLogoUrl});
	background-size: contain;
	background-repeat: no-repeat;
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

const History = ({cardHistory}) => {
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
			default: {
				typeTitle = 'Операция';
			}
		}

		return `${typeTitle}: ${item.data}`;
	};

	return (
		<HistoryLayout>
			<HistoryTitle>Сегодня</HistoryTitle>
			{cardHistory.map((item, index) => {
				const historyItemDate = moment(item.time, moment.ISO_8601);
				const today = moment().format('L');
				const isTodayHistoryItem = historyItemDate.format('L') === today;

				if (!isTodayHistoryItem) {
					return '';
				}

				return (
					<HistoryItem key={index}>
						<HistoryItemIcon bankSmLogoUrl={item.card.theme.bankSmLogoUrl}/>
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

History.propTypes = {
	cardHistory: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default History;
