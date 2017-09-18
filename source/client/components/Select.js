import React from 'react';
import styled from 'emotion/react';
import {Select as AntdSelect} from 'antd';

const StyledSelect = styled(AntdSelect)`
	&.ant-select {
		& .ant-select-selection {
			height: 36px;
			background-color: rgba(0, 0, 0, 0.08);
			border: 1px solid rgba(0, 0, 0, 0.04);
			border-radius: 3px;
			color: ${({textColor}) => textColor || '#fff'};

			&:focus,
			&:hover {
				border: 1px solid rgba(0, 0, 0, 0.04);
			}

			&__rendered {
				font-size: 12px;
				line-height: 34px;
			}
		}

		.ant-select-arrow {
			font-size: 15px;
		}
	}
`;

const Select = (props) => (
	<StyledSelect {...props} />
);

Select.Option = AntdSelect.Option;

export default Select;
