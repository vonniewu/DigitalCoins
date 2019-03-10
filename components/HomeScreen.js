import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Left, Body, Right } from "native-base";
import { connectStyle } from 'native-base';

import { COIN_MARKET_CAP_API_KEY } from "../credentials";
import { displayCurrency } from '../utils';


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            latest: []
        };
        this._getCryptocurrencies = this._getCryptocurrencies.bind(this);
    }

    _getCryptocurrencies() {
        const API_CALL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

        fetch(API_CALL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "X-CMC_PRO_API_KEY": COIN_MARKET_CAP_API_KEY
            }
        })
            .then(response => response.json())
            .then(json => this.setState({
                latest: json.data
            }));
    }

    componentDidMount() {
        this._getCryptocurrencies();
    }

    render() {
        const styles = this.props.style;

        return (
            <Container style={styles.container}>
                <Header />
                <Content padder>
                    {this.state.latest.map((obj,index) => {
                        return (
                            <Card key={index}>
                                <CardItem style={styles.card} button>
                                    <Left>
                                        <Text style={styles.cryptoName}>{obj.name}</Text>
                                        <Text style={styles.cryptoSymbol}>{obj.symbol}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.cryptoPrice}>${displayCurrency(obj.quote.USD.price, 2)}</Text>
                                    </Right>
                                </CardItem>
                            </Card>);
                    })}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17202A',
    },
    card: {
        backgroundColor: '#34373a',
        borderColor: '#34373a'
    },
    cryptoName: {
        color: '#c8ccd1'
    },
    cryptoSymbol:{
        color: '#c8ccd1'
    },
    cryptoPrice: {
        color: '#c8ccd1',
        fontSize: 20,
    },
});


export default connectStyle('yourTheme.CustomComponent', styles)(HomeScreen);
