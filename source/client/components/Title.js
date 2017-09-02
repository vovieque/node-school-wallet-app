import React from 'react';
import styled from 'emotion/react';

const StyledTitle = styled.h2`
	margin: 0 0 20px;
	font-size: 24px;
	font-weight: normal;
	color: #000;
`;

const Title = ({children, className}) => (
	<StyledTitle className={className}>
		{children}
	</StyledTitle>
);

export default Title;
