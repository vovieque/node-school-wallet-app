import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import CardInfo from 'card-info';

import bankUtils from '../../../libs/utils';

const NumberInput = styled.input`
    color: #fff;
    font-size: 16px;
    font-family: 'OCR A Std Regular';
    background: rgba(0,0,0,0.3);
    border: none;
    padding: 10px;
    max-width: 240px;
    margin-bottom: 10px;
    border-radius: 4px;
`;

const CardLayout = styled.div`
position: relative;
min-width: 260px;
height: 164px;
box-sizing: border-box;
padding: 25px 20px 20px 20px;
border-radius: 4px;
background-color: ${({bgColor}) => (bgColor || 'rgba(0, 0, 0, 0.3)')};
transition: background 0.3s;
`;

const CardLogo = styled.div`
height: 28px;
margin-bottom: 17px;
background: url(${({url}) => url || ''});
background-size: contain;
background-repeat: no-repeat;
`;

const CardType = styled.div`
height: 26px;
background-image: url(${({url}) => url || ''});
background-size: contain;
background-repeat: no-repeat;
background-position-x: right;
`;


class CardNumberInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardNumber: props.initialValue
        }
    }

    handleChange(e) {
        let cardNumber = e.target.value.replace(/\D/g, '');
        if (cardNumber.length <= 16) {
            this.setState({
                cardNumber
            });
        }
    }

    render() {
        const {
            brandLogo,
            bankLogo,
            backgroundColor
        } = new CardInfo(this.state.cardNumber, {
            banksLogosPath: '/assets/',
            brandsLogosPath: '/assets/'
        });
        return (
            <CardLayout
                isBankKnown={false}
                bgColor={backgroundColor}>
                <CardLogo url={bankLogo} />
                <NumberInput 
                    onChange={(e) => {this.handleChange(e)}} 
                    value={bankUtils.formatCardNumber(this.state.cardNumber)}
                />
                <CardType url={brandLogo} />
                
            </CardLayout>
        );
    }
}

CardNumberInput.PropTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.func
}

export default CardNumberInput;