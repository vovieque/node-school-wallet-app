import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import {Title} from './';

const HeaderLayout = styled.header`
	height: 74px;
	background: #fff;
	padding: 20px 30px;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const Balance = styled(Title)`
	margin: 0;
`;

const BalanceSum = styled.span`
	font-weight: bold;
`;

const Header = ({activeCard}) => (
	<HeaderLayout>
		<Balance>
			{`${activeCard.bankName}: `}
			<BalanceSum>{`${activeCard.balance} ₽`}</BalanceSum>
		</Balance>
	</HeaderLayout>
);

Header.propTypes = {
	activeCard: PropTypes.shape({
		bankName: PropTypes.string.isRequired,
		balance: PropTypes.string.isRequired
	})
};

export default Header;
