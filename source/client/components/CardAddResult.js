import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';
import Button from './Button';

const Icon = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-${({status}) => (status ? 'check' : 'error')}.svg);
	margin: 0 auto 20px auto;
`;

const FormTitle = styled.h2`
	margin: 0 0 20px;
	text-align: center;
	font-size: 24px;
	font-weight: 600;
	color: #fff;
`;

/**
 * Компонент CardAddResult
 * @param {Boolean} success - статус добавления карты
 * @param onResultAccept - обработчик сообщения о статусе добавления карты
 ** @override
 * @returns {JSX}
 * @constructor
 */
const CardAddResult = ({success = true, onResultAccept}) => (
	<form onSubmit={onResultAccept}>
		<Icon status={success} />
		<FormTitle>{success ? 'Карта успешно добавлена' : 'Неправильный номер карты'}</FormTitle>
		<Button bgColor='#018ca5' textColor='#fff'>Ок</Button>
	</form>
)

CardAddResult.propTypes = {
	success: PropTypes.bool,
	onResultAccept: PropTypes.func
};

export default CardAddResult;
