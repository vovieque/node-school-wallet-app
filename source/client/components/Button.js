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
	background-color: ${({bgColor}) => bgColor};
	color: ${({textColor}) => textColor};

	&:focus,
	&:hover {
		background-color: ${({bgColor}) => bgColor};
		color: ${({textColor}) => textColor};
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

Button.defaultProps = {
	bgColor: 'rgba(0, 0, 0, 0.05)',
	textColor: 'rgba(0, 0, 0, 0.65)'
};

export default Button;
