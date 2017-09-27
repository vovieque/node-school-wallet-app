import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import {Title, UserInfo} from './';

const HeaderLayout = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
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
		<UserInfo />
	</HeaderLayout>
);

Header.propTypes = {
	activeCard: PropTypes.shape({
		bankName: PropTypes.string.isRequired,
		balance: PropTypes.string.isRequired
	})
};

export default Header;
