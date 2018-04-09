import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComp, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => this.setState({ error: null });

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} closeModal={this.errorConfirmHandler}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComp {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;