import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import axios from 'axios';

import {
	Input,
	Button
} from './';

const Label = styled.label`
	font-size: 15px;
	color: #fff;
	position: absolute;
	left: 0px;
	margin-right: auto;
`;

const InputCardNumber = styled(Input)`
	width: 160px;
`;

const InputField = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
	padding-left: 150px;
	&:invalid {
		border: 1px solid red;
	}
`;

const FormTitle = styled.h2`
	margin: 0 0 20px;
	text-align: center;
	font-size: 24px;
	font-weight: 600;
	color: #fff;
`;

/**
 * Класс компонента CardAddContract
 */
class CardAddContract extends Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента CardAddContract
	 */
	constructor(props) {
		super(props);

		this.state = {
			cardNumber: '',
			cardBalance: 0
		};
	}

	/**
	 * Отправка формы
	 * @param {Event} e событие отправки формы
	 */
	onSubmitForm(e) {
		e.preventDefault();
		const {cardNumber, cardBalance} = this.state;

		axios.post('/cards', {
			cardNumber,
			balance: cardBalance
		}).then(() => {
			this.props.onTransaction(true);
		}).catch(() => {
			this.props.onTransaction(false);
		});
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} e событие изменения значения input
	 */
	onChangeInputValue(e) {
		if (!e) {
			return;
		}

		const {name, value} = e.target;

		this.setState({
			[name]: value
		});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		return (
			<form onSubmit={(e) => this.onSubmitForm(e)}>
				<FormTitle>Добавить карту</FormTitle>
				<InputField>
					<Label htmlFor='cardNumber'>Номер карты:</Label>
					<InputCardNumber
						name='cardNumber'
						title='0000 0000 0000 0000'
						required
						value={this.state.cardNumber}
						pattern='^(\d{4} ?){4}$'
						onChange={(e) => this.onChangeInputValue(e)} />
				</InputField>
				<InputField>
					<Label htmlFor='balance'>Баланс:</Label>
					<InputCardNumber
						name='cardBalance'
						required
						value={this.state.cardBalance}
						pattern='^\d+$'
						onChange={(e) => this.onChangeInputValue(e)} />
				</InputField>
				<Button bgColor='#018ca5' textColor='#fff'>Отправить</Button>
			</form>
		);
	}
}

CardAddContract.propTypes = {
	onTransaction: PropTypes.func
};

export default CardAddContract;
