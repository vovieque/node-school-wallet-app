import React from 'react';
import styled from 'emotion/react';
import {Button as AntdButton} from 'antd';

const StyledButton = styled(AntdButton)`
	&.ant-btn {
		height: 36px;
		width: 120px;
		font-size: 13px;
		font-weight: 600;
		border: none;
		border-radius: 3px;
		background-color: ${({bgColor}) => bgColor || 'rgba(0, 0, 0, 0.05)'};
		color: ${({textColor}) => textColor || 'rgba(0, 0, 0, 0.65)'};

		&:focus,
		&:hover {
			color: ${({textColor}) => textColor || 'rgba(0, 0, 0, 0.65)'};
			background-color: ${({bgColor}) => bgColor || 'rgba(0, 0, 0, 0.05)'};
		}
	}
`;

const Button = (props) => (
	<StyledButton {...props} />
);

export default Button;
