import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { checkValidity } from '../../../shared/utility';
import classes from './ContactData.css';

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token))
});

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheepest', displayValue: 'Cheepest' }
          ]
        },
        value: 'fastest',
        valid: true,
        touched: false
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElemIdentifier in this.state.orderForm) {
      formData[formElemIdentifier] = this.state.orderForm[
        formElemIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price, //необходима проверка на бекенде в продакшене
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
      [inputIdentifier]: {
        ...this.state.orderForm[inputIdentifier],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true
      }
    };
    const formIsValid = Object.values(updatedOrderForm).every(
      ({ valid }) => valid
    );

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(formElem => (
          <Input
            key={formElem.id}
            elementType={formElem.config.elementType}
            elementConfig={formElem.config.elementConfig}
            value={formElem.config.value}
            isValid={formElem.config.valid}
            shouldValidate={formElem.config.validation}
            touched={formElem.config.touched}
            onChange={event => this.inputChangeHandler(event, formElem.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
