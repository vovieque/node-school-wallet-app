import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import axios from 'axios';

import {CardNumberInput, Card, Title, Button, Island, Input} from './';

const StyledButton = styled(Button)`
	cursor: ${({isOffline}) => (isOffline ? 'not-allowed' : 'pointer')};
`;

const WithdrawTitle = styled(Title)`
	text-align: center;
`;

const WithdrawLayout = styled(Island)`
	width: 440px;
	display: flex;
	flex-direction: column;
	align-items: center;
	opacity: ${({isOffline}) => (isOffline ? '0.1' : '1')};
`;

const InputField = styled.div`
	margin: 20px 0;
	position: relative;
`;

const SumInput = styled(Input)`
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: '#000';
`;

const Currency = styled.span`
	font-size: 12px;
	position: absolute;
	right: 10;
	top: 8px;
`;

/**
 * Класс компонента Withdraw
 */
class Withdraw extends Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента Withdraw
	 */
	constructor(props) {
		super(props);

		this.state = {
			cardNumber: '',
			sum: 0
		};
	}

	/**
	 * Обработка изменения номера карты
	 * @param {String} newCardNumber новый номер карты
	 */
	onCardNumberChange(newCardNumber) {
		this.setState({
			sum: this.state.sum,
			cardNumber: newCardNumber
		});
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	onChangeInputValue(event) {
		if (!event) {
			return;
		}

		const {name, value} = event.target;

		if (!/^(\d)+$/.test(value)) {
			return;
		}

		this.setState({
			[name]: value
		});
	}

	/**
	 * Отправка формы
	 * @param {Event} event событие отправки формы
	 */
	onSubmitForm(event) {
		if (event) {
			event.preventDefault();
		}

		const {cardNumber, sum} = this.state;
		const {activeCard, isOffline} = this.props;
		if (isOffline) {
			return;
    }
		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return;
		}

		const options = {
			method: 'post',
			url: `/cards/${activeCard.id}/transfer`,
			data: {
				target: cardNumber,
				sum
			}
		};

		axios(options).then(() => {
			this.props.onTransaction();
			this.setState({
				sum: 0
			});
		});
	}

	/**
	 * Функция отрисовки компонента
	 * @returns {JSX}
	 */
	render() {
		const {isOffline} = this.props;

		return (
			<form onSubmit={(event) => this.onSubmitForm(event)}>
				<WithdrawLayout isOffline={isOffline}>
					<WithdrawTitle>Вывести деньги на карту</WithdrawTitle>
					<CardNumberInput
						initialValue={this.state.cardNumber}
						onChange={(newCardNumber) => this.onCardNumberChange(newCardNumber)} />
					<InputField>
						<SumInput
							name='sum'
							value={this.state.sum}
							onChange={(event) => this.onChangeInputValue(event)} />
						<Currency>₽</Currency>
					</InputField>
					<StyledButton isOffline={isOffline} type='submit'>Перевести</StyledButton>
				</WithdrawLayout>
			</form>
		);
	}
}

Withdraw.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number
	}).isRequired,
	inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
	onTransaction: PropTypes.func.isRequired,
	isOffline: PropTypes.bool.isRequired
};

export default Withdraw;
