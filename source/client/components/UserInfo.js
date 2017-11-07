import React from 'react';
import styled from 'emotion/react';

import UserMenu from './UserMenu';

const Avatar = styled.img`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	margin-right: 10px;
`;

const StyledUserBlock = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	font-size: 15px;
	color: #000;
	transition: rotate 0.5s;
	outline: none; 
	&:hover {
		cursor: ${({isOffline}) => (isOffline ? 'not-allowed' : 'pointer')};
	}
	&:hover:after {
		display: ${({isOffline}) => (isOffline ? 'none' : 'block')};
		content: "";
		position:absolute;
		top: 17px;
		right:-15px;
		width: 6px;
		height: 6px;
		transition: all 0.2s;
		border: solid #555;
		border-width: 0 1px 1px 0;
		padding: 3px;
		transform: rotate(45deg);
	}
	#userCard.expanded:after {
		transform: rotate(-135deg);
		top: 19px;
	}
`;

class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isExpanded: false};
	}

	onMouseDown() {
		const {isOffline} = this.props;
		const {isExpanded} = this.state;
		if (isOffline) {
			return;
		}

		this.setState({isExpanded: !isExpanded});
	}

	onFocus() {
		const {isOffline} = this.props;
		if (isOffline) {
			return;
		}

		this.setState({isExpanded: true});
	}

	render() {
		const {user, isOffline} = this.props;
		const {isExpanded} = this.state;
		return (
			<StyledUserBlock
				id='userCard'
				className={isExpanded ? 'expanded' : ''}
				onMouseDown={() => this.onMouseDown()}
				onBlur ={() => { this.setState({isExpanded: false}); }}
				onFocus={() => this.onFocus()}
				tabIndex={0}
				isOffline={isOffline}>
				<Avatar src={user.imageUrl} />
				{user.displayName}
				<UserMenu isExpanded={isExpanded} />
			</StyledUserBlock>
		);
	}
}

export default UserInfo;
