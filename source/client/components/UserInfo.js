import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import {Button} from './';

const User = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	color: #000;
`;

const Avatar = styled.img`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	margin-right: 10px;
`;

const UserInfo = ({user}) => {
	if (user.login) {
		return (
			<User>
				<Avatar src='/assets/avatar.png' />
				{user.name || user.login}
			</User>
		);
	}

	return <Button>Войти</Button>;
};

UserInfo.propTypes = {
	user: PropTypes.shape({
		login: PropTypes.string,
		name: PropTypes.string
	})
};

UserInfo.defaultProps = {
	user: {}
};

export default UserInfo;
