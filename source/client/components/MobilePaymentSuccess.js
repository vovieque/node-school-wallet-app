import React from 'react';
import styled from 'emotion/react';

import {Island} from './';

const MobilePaymentLayout = styled(Island)`
	width: 440px;
	background: #108051;
	position: relative;
	color: #fff;
`;

const SuccessIcon = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	position: absolute;
	top: 27;
	right: 32;
`;

const Header = styled.div`
	font-size: 24px;
`;

const Sum = styled.div`
	font-size: 48px;
`;

const CommissionTips = styled.div`
	font-size: 13px;
	opacity: 0.6;
	margin-bottom: 20px;
`;

const Section = styled.div`
	position: relative;
	padding-left: 160px;
	margin-bottom: 20px;
`;

const SectionLabel = styled.div`
	font-size: 15px;
	position: absolute;
	left: 0px;
`;

const SectionValue = styled.div`
	font-size: 15px;
`;

const Instruction = styled.div`
	margin-bottom: 40px;
	font-size: 15px;
`;

const RepeatPayment = styled.button`
	font-size: 13px;
	background-color: rgba(0, 0, 0, 0.08);
	height: 42px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	cursor: pointer;
	text-transform: uppercase;
`;

/**
 * Компонент MobilePaymentSuccess
 */
class MobilePaymentSuccess extends React.Component {
	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		return (
			<MobilePaymentLayout>
				<SuccessIcon />
				<Header>МегаФон (Россия)</Header>
				<Sum>1500 ₽</Sum>
				<CommissionTips>В том числе комиссия 3 ₽</CommissionTips>
				<Section>
					<SectionLabel>Номер транзакции</SectionLabel>
					<SectionValue>200580211311</SectionValue>
				</Section>
				<Section>
					<SectionLabel>Номер телефона</SectionLabel>
					<SectionValue>+7 921 890 80 64</SectionValue>
				</Section>
				<Instruction>
					Мы пришлем чек на sam@yandex.ru. Вы можете измените его email в «Настройках».
				</Instruction>
				<RepeatPayment>Отправить еще один перевод</RepeatPayment>
			</MobilePaymentLayout>
		);
	}
}

export default MobilePaymentSuccess;
