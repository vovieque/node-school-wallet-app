import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const StyledButton = styled.button`
	height: 36px;
	width: 120px;
	font-size: 13px;
	font-weight: 600;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	background-color: ${({bgColor}) => bgColor || 'rgba(0, 0, 0, 0.05)'};
	color: ${({textColor}) => textColor || 'rgba(0, 0, 0, 0.65)'};

	&:focus,
	&:hover {
		color: ${({textColor}) => textColor || 'rgba(0, 0, 0, 0.65)'};
		background-color: ${({bgColor}) => bgColor || 'rgba(0, 0, 0, 0.05)'};
	}
`;

const Button = ({bgColor, textColor, children, className}) => (
	<StyledButton bgColor={bgColor} textColor={textColor} className={className}>
		{children}
	</StyledButton>
);

Button.propTypes = {
	bgColor: PropTypes.string,
	textColor: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string
};

export default Button;
