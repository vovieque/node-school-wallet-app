import React from 'react';
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
`;

const Label = styled.div`
	width: 240px;
	color: #fff;
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

const MobilePayment = () => (
	<MobilePaymentLayout>
		<MobilePaymentTitle>Пополнить телефон</MobilePaymentTitle>
		<InputField>
			<Label>Телефон</Label>
			<Input />
		</InputField>
		<InputField>
			<Label>Сумма</Label>
			<Input />
		</InputField>
		<InputField>
			<Label>Спишется</Label>
			<Input />
		</InputField>
		<Commission>Размер коммиссии составляет 3 ₽</Commission>
		<Underline />
		<PaymentButton bgColor='#fff' textColor='#108051'>Заплатить</PaymentButton>
	</MobilePaymentLayout>
);

export default MobilePayment;
