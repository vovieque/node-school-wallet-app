import React, {Component} from 'react';
import styled from 'emotion/react';

import {Card, Title, Button, Island, Input} from './';

const WithdrawTitle = styled(Title)`
	text-align: center;
`;

const WithdrawLayout = styled(Island)`
	width: 440px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const InputField = styled.div`
	margin: 20px 0;
	position: relative;
`;

const SumInput = styled(Input)`
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: '#000'
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
			selectedCard: this.props.inactiveCardsList[0],
			sum: 0
		};

		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.onChangeInputValue = this.onChangeInputValue.bind(this);
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	onChangeInputValue(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

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

		const {sum} = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return;
		}

		this.setState({sum: 0});
	}

	/**
	 * Функция отрисовки компонента
	 * @returns {JSX}
	 */
	render() {
		const {inactiveCardsList} = this.props;

		return (
			<form onSubmit={this.onSubmitForm}>
				<WithdrawLayout>
					<WithdrawTitle>Вывести деньги на карту</WithdrawTitle>
					<Card type="select" data={inactiveCardsList} onSelect={this.onSelectCard} />
					<InputField>
						<SumInput
							name="sum"
							value={this.state.sum}
							onChange={this.onChangeInputValue}
						/>
						<Currency>₽</Currency>
					</InputField>
					<Button type="submit">
						Перевести
					</Button>
				</WithdrawLayout>
			</form>
		);
	}
}

Withdraw.propTypes = {
	activeCard: React.PropTypes.shape({
		id: React.PropTypes.number,
		theme: React.PropTypes.object
	}).isRequired,
	inactiveCardsList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Withdraw;
