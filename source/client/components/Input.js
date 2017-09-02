import React from 'react';
import styled from 'emotion/react';
import {Input as AntdInput} from 'antd';

const StyledInput = styled(AntdInput)`
	&.ant-input {
		height: 36px;
		font-size: 15px;
		background-color: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(0, 0, 0, 0.04);
		border-radius: 3px;
		color: ${({textColor}) => textColor || '#fff'};

		&:focus,
		&:hover {
			border: 1px solid rgba(0, 0, 0, 0.04);
		}
	}
`;

const Input = (props) => (
	<StyledInput {...props} />
);

export default Input;
