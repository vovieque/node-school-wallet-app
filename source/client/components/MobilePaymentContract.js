import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import {Island, Title, Button, Input} from './';

const MobilePaymentLayout = styled(Island)`
	width: 440px;
	background: #108051;
`;

const MobilePaymentTitle = styled(Title)`
	color: #fff;
`;

const InputField = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
	padding-left: 150px;
`;

const Label = styled.div`
	font-size: 15px;
	color: #fff;
	position: absolute;
	left: 0;
`;

const Currency = styled.span`
	font-size: 13px;
	color: #fff;
	margin-left: 12px;
`;

const Commission = styled.div`
	color: rgba(255, 255, 255, 0.6);
	font-size: 13px;
	text-align: right;
	margin: 35px 0 20px;
`;

const Underline = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const PaymentButton = styled(Button)`
	float: right;
`;

const InputPhoneNumber = styled(Input)`
	width: 225px;
`;

const InputSum = styled(Input)`
	width: 160px;
`;

const InputCommision = styled(Input)`
	cursor: no-drop;
	width: 160px;
	border: dotted 1.5px rgba(0, 0, 0, 0.2);
	background-color: initial;
`;

/**
 * Компонент MobilePaymentContract
 */
class MobilePaymentContract extends Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента MobilePaymentContract
	 */
	constructor(props) {
		super(props);

		this.state = {
			phoneNumber: '+79218908064',
			sum: 0,
			commission: 3
		};
	}

	/**
	 * Получить цену с учетом комиссии
	 * @returns {Number}
	 */
	getSumWithCommission() {
		const {sum, commission} = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return 0;
		}

		return Number(sum) + Number(commission);
	}

	/**
	 * Отправка формы
	 * @param {Event} event событие отправки формы
	 */
	handleSubmit(event) {
		if (event) {
			event.preventDefault();
		}

		const {sum, phoneNumber, commission} = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum === 0) {
			return;
		}

		this.props.onPaymentSuccess({sum, phoneNumber, commission});
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	handleInputChange(event) {
		if (!event) {
			return;
		}

		const {name, value} = event.target;

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
		const {commission} = this.state;

		return (
			<MobilePaymentLayout>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<MobilePaymentTitle>Пополнить телефон</MobilePaymentTitle>
					<InputField>
						<Label>Телефон</Label>
						<InputPhoneNumber
							name='phoneNumber'
							value={this.state.phoneNumber}
							readOnly='true' />
					</InputField>
					<InputField>
						<Label>Сумма</Label>
						<InputSum
							name='sum'
							value={this.state.sum}
							onChange={(event) => this.handleInputChange(event)} />
						<Currency>₽</Currency>
					</InputField>
					<InputField>
						<Label>Спишется</Label>
						<InputCommision value={this.getSumWithCommission()} />
						<Currency>₽</Currency>
					</InputField>
					<Commission>Размер коммиссии составляет {commission} ₽</Commission>
					<Underline />
					<PaymentButton bgColor='#fff' textColor='#108051'>Заплатить</PaymentButton>
				</form>
			</MobilePaymentLayout>
		);
	}
}

MobilePaymentContract.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number,
		theme: PropTypes.object
	}).isRequired,
	onPaymentSuccess: PropTypes.func.isRequired
};

export default MobilePaymentContract;
