import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const StyledTitle = styled.h2`
	margin: 0 0 20px;
	font-size: 24px;
	font-weight: bold;
	color: #000;
`;

const Title = ({children, className}) => (
	<StyledTitle className={className}>
		{children}
	</StyledTitle>
);

Title.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default Title;
