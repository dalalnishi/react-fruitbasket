import React, {Component} from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import PaypalCheckout from '../Checkout/PaypalCheckout';

class Checkout extends Component {

    // onToken = (token, addresses) => {
    //     return token;
    //     // TODO: Send the token information and any other
    //     // relevant information to your payment process
    //     // server, wait for the response, and update the UI
    //     // accordingly. How this is done is up to you. Using
    //     // XHR, fetch, or a GraphQL mutation is typical.
    // };

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            // <StripeCheckout
            //     amount={500}
            //     billingAddress
            //     description="Awesome Product"
            //     image="https://yourdomain.tld/images/logo.svg"
            //     locale="auto"
            //     name="YourDomain.tld"
            //     stripeKey="pk_test_SuzeF0h1h4NcE6dJqydevdCS00HyARo4sx"
            //     token={this.onToken}
            //     zipCode
            // />  
            <PaypalCheckout></PaypalCheckout>
        )
    }
}

export default Checkout;