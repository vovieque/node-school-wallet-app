import React, {Component} from 'react';

import MobilePaymentContract from './MobilePaymentContract';
import MobilePaymentSuccess from './MobilePaymentSuccess';

/**
 * Класс компонента MobilePayment
 */
class MobilePayment extends Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента MobilePayment
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
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {activeCard} = this.props;

		if (this.state.stage === 'success') {
			return (
				<MobilePaymentSuccess
					activeCard={activeCard}
					transaction={this.state.transaction}
					repeatPayment={this.repeatPayment}
				/>
			);
		}

		return (
			<MobilePaymentContract activeCard={activeCard} onPaymentSuccess={this.onPaymentSuccess} />
		);
	}
}

MobilePayment.propTypes = {
	activeCard: React.PropTypes.shape({
		id: React.PropTypes.number,
		theme: React.PropTypes.object
	}).isRequired
};

export default MobilePayment;
