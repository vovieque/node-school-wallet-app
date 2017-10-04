import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import {injectGlobal} from 'emotion';
import CardInfo from 'card-info';
import {
	CardsBar,
	Header,
	History,
	Prepaid,
	MobilePayment,
	Withdraw
} from './';

import './fonts.css';

import cardsData from '../../data/cards';
import transactionsData from '../../data/transactions';

injectGlobal`
	html,
	body {
		margin: 0;
	}

	#root {
		height: 100%;
		font-family: 'Open Sans';
		color: #000;
	}
`;

const Wallet = styled.div`
	display: flex;
	min-height: 100%;
	background-color: #fcfcfc;
`;

const CardPane = styled.div`
	flex-grow: 1;
`;

const Workspace = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 970px;
	padding: 15px;
`;

/**
 * Приложение
 */
class App extends Component {
	/**
	 * Конструктор
	 */
	constructor() {
		super();

		const cardsList = this.prepareCardsData(cardsData);
		const cardHistory = transactionsData.map((data) => {
			const card = cardsList.find((card) => card.id === data.cardId);
			return card ? Object.assign({}, data, {card}) : data;
		});

		this.state = {
			cardsList,
			cardHistory,
			activeCardIndex: 0
		};
	}

	/**
	 * Подготавливает данные карт
	 *
	 * @param {Object} cardsData данные карт
	 * @returns {Object[]}
	 */
	prepareCardsData(cardsData) {
		return cardsData.map((card) => {
			const cardInfo = new CardInfo(card.cardNumber, {
				banksLogosPath: '/assets/',
				brandsLogosPath: '/assets/'
			});

			return {
				id: card.id,
				balance: card.balance,
				number: cardInfo.numberNice,
				bankName: cardInfo.bankName,
				theme: {
					bgColor: cardInfo.backgroundColor,
					textColor: cardInfo.textColor,
					bankLogoUrl: cardInfo.bankLogoSvg,
					brandLogoUrl: cardInfo.brandLogoSvg,
					bankSmLogoUrl: `/assets/${cardInfo.bankAlias}-history.svg`
				}
			};
		});
	}

	/**
	 * Обработчик переключения карты
	 *
	 * @param {Number} activeCardIndex индекс выбранной карты
	 */
	onCardChange(activeCardIndex) {
		this.setState({activeCardIndex});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {data} = this.props;
		const {cardsList, activeCardIndex, cardHistory} = this.state;
		const activeCard = cardsList[activeCardIndex];

		const inactiveCardsList = cardsList.filter((card, index) => index === activeCardIndex ? false : card);
		const filteredHistory = cardHistory.filter((data) => data.cardId === activeCard.id);

		return (
			<Wallet>
				<CardsBar
					activeCardIndex={activeCardIndex}
					cardsList={cardsList}
					onCardChange={(activeCardIndex) => this.onCardChange(activeCardIndex)} />
				<CardPane>
					<Header activeCard={activeCard} user={data.user} />
					<Workspace>
						<History cardHistory={filteredHistory} />
						<Prepaid
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
							onCardChange={(newActiveCardIndex) => this.onCardChange(newActiveCardIndex)}
						/>
						<MobilePayment activeCard={activeCard} />
						<Withdraw
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
						/>
					</Workspace>
				</CardPane>
			</Wallet>
		);
	}
}

App.propTypes = {
	data: PropTypes.shape({
		user: PropTypes.object
	})
};

App.defaultProps = {
	data: {}
};

export default App;
