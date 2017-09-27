import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';

/**
 * Класс компонента Prepaid
 */
class Prepaid extends Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента Prepaid
	 */
	constructor(props) {
		super(props);

		this.state = {stage: 'contract'};
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
		const {transaction} = this.state;
		const {activeCard, inactiveCardsList} = this.props;

		if (this.state.stage === 'success') {
			return (
				<PrepaidSuccess transaction={transaction} repeatPayment={() => this.repeatPayment()} />
			);
		}

		return (
			<PrepaidContract
				activeCard={activeCard}
				inactiveCardsList={inactiveCardsList}
				onPaymentSuccess={(transaction) => this.onPaymentSuccess(transaction)} />
		);
	}
}

Prepaid.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number
	}).isRequired,
	inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Prepaid;
