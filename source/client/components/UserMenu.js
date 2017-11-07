import React from 'react';
import styled from 'emotion/react';

class UserMenu extends React.Component {
    render() {
        return (
            <ul 
                className={this.props.className}
            >
                <li className="user-menu__item">
                    <a 
                        className="user-menu__link" 
                        onMouseDown = {(e) => {e.preventDefault();e.stopPropagation()}}
                        href = "/logout"
                    >
                        Выйти
                    </a>
                </li>
            </ul>
        );
    }
}
const StyledUserMenu = styled(UserMenu)`
    position: absolute;
    top: 58px;
    right: 0px;
    width: 150px;
    background: #fff;
    box-shadow: 0 2px 8px #ccc;
    transition: all 0.2s;
    display: ${props => props.isExpanded ? "block" : "none"};
    
    & .user-menu__item:hover {
        background: #efefef;
    }

    & .user-menu__link {
        display: block;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        text-decoration: none;
        color: #000;
    }
`;

export default StyledUserMenu;