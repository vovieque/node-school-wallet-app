import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

const IslandLayout = styled.div`
	margin: 15px;
	padding: 30px 30px 20px;
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
`;

const Island = ({children, className}) => (
	<IslandLayout className={className}>
		{children}
	</IslandLayout>
);

Island.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default Island;
