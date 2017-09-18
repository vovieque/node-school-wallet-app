import React from 'react';

import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';

/**
 * Класс компонента Prepaid
 */
class Prepaid extends React.Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента Prepaid
	 */
	constructor(props) {
		super(props);

		this.state = {
			stage: 'contract'
		};

		this.onPaymentSuccess = this.onPaymentSuccess.bind(this);
		this.repeatPayment = this.repeatPayment.bind(this);
	}

	/**
	 * Обработка успешного платежа
	 * @param {Object} transaction данные о транзакции
	 */
	onPaymentSuccess(transaction) {
		this.setState({
			stage: 'success',
			transaction
		});
	}

	/**
	 * Повторить платеж
	 */
	repeatPayment() {
		this.setState({stage: 'contract'});
	}

	/**
	 * Функция отрисовки компонента
	 * @returns {JSX}
	 */
	render() {
		const {activeCard, inactiveCardsList} = this.props;

		if (this.state.stage === 'success') {
			return (
				<PrepaidSuccess transaction={this.state.transaction} repeatPayment={this.repeatPayment} />
			);
		}

		return (
			<PrepaidContract
				activeCard={activeCard}
				inactiveCardsList={inactiveCardsList}
				onPaymentSuccess={this.onPaymentSuccess}
			/>
		);
	}
}

Prepaid.propTypes = {
	activeCard: React.PropTypes.shape({
		id: React.PropTypes.number

	}).isRequired,
	inactiveCardsList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Prepaid;
