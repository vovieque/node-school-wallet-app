import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const CardEditIcon = styled.div`
	width: 24px;
	height: 24px;
	position: absolute;
	top: -12px;
	right: -12px;
	background-image: url('/assets/cards-delete.svg');
	cursor: pointer;
	display: ${({editable}) => (editable ? 'block' : 'none')};
`;

const CardEdit = ({editable, onChangeBarMode, id}) => (
	<CardEditIcon editable={editable} onClick={(event) => onChangeBarMode(event, id)} />
);

CardEdit.propTypes = {
	editable: PropTypes.bool,
	onChangeBarMode: PropTypes.func,
	id: PropTypes.number
};

export default CardEdit;
