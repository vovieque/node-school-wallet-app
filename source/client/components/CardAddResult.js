import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';
import Button from './Button';

const SuccessIcon = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
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
		<SuccessIcon />
		<FormTitle>{success ? 'Карта успешно добавлена' : 'При добавлении карты произошла ошибка'}</FormTitle>
		<Button bgColor='#018ca5' textColor='#fff'>Ок</Button>
	</form>
)

CardAddResult.propTypes = {
	success: PropTypes.bool,
	onResultAccept: PropTypes.func
};

export default CardAddResult;
