import React, {Component} from 'react';
import styled from 'emotion/react';
import {injectGlobal} from 'emotion';
import CardInfo from 'card-info';
import axios from 'axios';

import {
	CardsBar,
	Header,
	History,
	Prepaid,
	MobilePayment,
	Withdraw
} from './';

import './fonts.css';
import CreateNewCard from "./CreateNewCard";

injectGlobal([`
	html,
	body {
		margin: 0
	}

	#root {
		height: 100%
		font-family: 'Open Sans'
		color: #000
	}
`]);

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
	 * Подготавливает данные карт
	 *
	 * @param {Object} cards данные карт
	 * @returns {Object[]}
	 */
	static prepareCardsData(cards) {
		return cards.map((card) => {
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

	static prepareHistory(cardsList, transactionsData) {
		return transactionsData.map((data) => {
			const card = cardsList.find((item) => item.id === Number(data.cardId));
			return card ? Object.assign({}, data, {card}) : data;
		});
	}

	/**
	 * Конструктор
	 */
	constructor(props) {
		super();

		const data = props.data;
		const cardsList = data.cards.length > 0 ? App.prepareCardsData(data.cards) : [];
		const cardHistory = data.transactions > 0 ? App.prepareHistory(cardsList, data.transactions) : [];

		this.state = {
			user: data.user,
			cardsList,
			cardHistory,
			user: data.user,
			activeCardIndex: 0,
			removeCardId: 0,
			isCardRemoving: false,
			isCardsEditable: false
		};
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
	* Обработчик события редактирования карт
	* @param {Boolean} isEditable Признак редактируемости
	*/
	onEditChange(isEditable) {
		const isCardsEditable = !isEditable;
		this.setState({
			isCardsEditable,
			isCardRemoving: false
		});
	}

	/**
	* Функция вызывает при успешной транзакции
	*/
	onTransaction() {
		axios.get('/cards').then(({data}) => {
			const cardsList = App.prepareCardsData(data);
			this.setState({cardsList});

			axios.get('/transactions').then(({data}) => {
				const cardHistory = App.prepareHistory(cardsList, data);
				this.setState({cardHistory});
			});
		});
	}

	/**
	 * Обработчик события переключения режима сайдбара
	 * @param {String} mode Режим сайдбара
	 * @param {String} index Индекс выбранной карты
	 */
	onChangeBarMode(event, removeCardId) {
		event.stopPropagation();
		this.setState({
			isCardRemoving: true,
			removeCardId
		});
	}

	/**
	 * Удаление карты
	 * @param {Number} index Индекс карты
	 */
	deleteCard(id) {
		axios
			.delete(`/cards/${id}`)
			.then(() => {
				axios.get('/cards').then(({data}) => {
					const cardsList = App.prepareCardsData(data);
					this.setState({cardsList});
				});
			});
	}

	/**
	 * Удаление карты
	 * @param {Number} index Индекс карты
	 */
	createCard(card) {
		axios
			.post(`/cards/`, card)
			.then((newCard) => {
				console.log(newCard);
				axios.get('/cards').then(({data}) => {
					const cardsList = App.prepareCardsData(data);
					this.setState({cardsList});
					this.onCardChange(newCard.id);
				});
			});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {cardsList, activeCardIndex, cardHistory, isCardsEditable, isCardRemoving, removeCardId, user} = this.state;
		const activeCard = cardsList[activeCardIndex];

		const inactiveCardsList = cardsList.filter((card, index) => (index === activeCardIndex ? false : card));
		const filteredHistory = cardHistory.filter((data) => Number(data.cardId) == activeCard.id);

		if (cardsList.length > 0 && activeCardIndex !== 'new_card')
			return (
				<Wallet>
					<CardsBar
						activeCardIndex={activeCardIndex}
						removeCardId={removeCardId}
						cardsList={cardsList}
						onCardChange={(index) => this.onCardChange(index)}
						isCardsEditable={isCardsEditable}
						isCardRemoving={isCardRemoving}
						deleteCard={(index) => this.deleteCard(index)}
						onChangeBarMode={(event, index) => this.onChangeBarMode(event, index)}/>
					<CardPane>
						<Header activeCard={activeCard} user={user}/>
						<Workspace>
							<History cardHistory={filteredHistory}/>
							{inactiveCardsList.length > 0 ? <Prepaid
								activeCard={activeCard}
								inactiveCardsList={inactiveCardsList}
								onCardChange={(newActiveCardIndex) => this.onCardChange(newActiveCardIndex)}
								onTransaction={() => this.onTransaction()}/> : ''}
							<MobilePayment activeCard={activeCard} onTransaction={() => this.onTransaction()}/>
							{inactiveCardsList.length > 0 ? <Withdraw
								activeCard={activeCard}
								inactiveCardsList={inactiveCardsList}
								onTransaction={() => this.onTransaction()}/> : ''}
						</Workspace>
					</CardPane>
				</Wallet>
			);
		else {
			return (
				<Wallet>
					<CardsBar
						activeCardIndex={activeCardIndex}
						removeCardId={removeCardId}
						cardsList={cardsList}
						onCardChange={(index) => this.onCardChange(index)}
						isCardsEditable={isCardsEditable}
						isCardRemoving={isCardRemoving}
						deleteCard={(index) => this.deleteCard(index)}
						onChangeBarMode={(event, index) => this.onChangeBarMode(event, index)}/>
					<CardPane>
						<Header user={user}/>
						<CreateNewCard createNewCard={(card) => this.createCard(card)}/>
					</CardPane>
				</Wallet>
			);
		}
	}
}

export default App;
