import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import CardAddContract from './CardAddContract';
import CardAddResult from './CardAddResult';

const Overlay = styled.div`
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	position: fixed;
	background: rgba(0, 0, 0, 0.5);
	display: ${({isCardAppending}) => (isCardAppending ? 'flex' : 'none')};
`;

const FormWrap = styled.div`
	width: 400;
	padding: 20px 40px;
	margin: auto;
	background: #353536;
	border-radius: 4px;
`;

/**
 * Класс компнента CardAdd
 */
class CardAdd extends Component {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента CardAdd
	 */
	constructor(props) {
		super(props);
		this.state = {
			stage: 'contract'
		};
	}

	/**
	 * Обработка добавления карты
	 * @param {Boolean} success статус добавления карты
	 */
	onCardAdd(success) {
		this.props.onTransaction();
		this.setState({
			stage: 'result',
			success
		});
	}

	/**
	 * Обработка сообщения о статусе добавления карты
	 */
	onResultAccept() {
		this.setState({
			stage: 'contract',
		});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {isCardAppending, onAppendModeSwitch} = this.props;

		if (this.state.stage === 'result') {
			return (
				<Overlay isCardAppending={isCardAppending} onClick={() => onAppendModeSwitch(false)}>
					<FormWrap onClick={(e) => e.stopPropagation()}>
						<CardAddResult
							success={this.state.success}
							cardAddResult={this.state.stage}
							onResultAccept={() => this.onResultAccept()} />
					</FormWrap>
				</Overlay>
			);
		}

		return (
			<Overlay isCardAppending={isCardAppending} onClick={() => onAppendModeSwitch(false)}>
				<FormWrap onClick={(e) => e.stopPropagation()}>
					<CardAddContract onTransaction={(data) => this.onCardAdd(data)} />
				</FormWrap>
			</Overlay>
		);
	}
}

CardAdd.propTypes = {
	isCardAppending: PropTypes.bool,
	onAppendModeSwitch: PropTypes.func,
	onTransaction: PropTypes.func
};

export default CardAdd;
