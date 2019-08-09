import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as S from "styles/app";

import { fetch_data } from "store/actions/app";
import { set_burger } from "store/actions/order";

import SIZES from "constants/sizes";

import Burger from "components/Burger";
import Preloader from "components/Preloader";
import Error from "components/Error";
import DensePacking from "shared/DensePacking";
import composeBurger from "api/composeBurger";
import BurgerForm from "components/BurgerForm";

export class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    data: PropTypes.exact({
      burgers: PropTypes.array.isRequired,
      ingredients: PropTypes.array.isRequired,
      buns: PropTypes.array.isRequired,
      meats: PropTypes.array.isRequired,
      sauces: PropTypes.array.isRequired
    }),
    fetch_data: PropTypes.func.isRequired,
    set_burger: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.appRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetch_data();
  }

  render() {
    const { data, isLoading, isError } = this.props;

    return (
      <S.App ref={this.appRef}>
        <S.Global />
        <Preloader in={isLoading} />
        <Error in={isError !== false} error={isError} />
        <BurgerForm />
        <S.BurgersWrapper>
          {!isLoading && !isError && data && (
            <DensePacking
              items={data.burgers.map(burger => composeBurger(burger, { ...data }))}
              props={item => ({
                onClick: () => this.props.set_burger(item)
              })}
              config={{
                singleColumn: SIZES.SINGLE_COLUMN,
                min: SIZES.MIN,
                toggleToHandDevice: SIZES.TOGGLE_TO_HAND_DEVICE
              }}
              component={Burger}
              getKey={item => item.id}
              dense
            />
          )}
        </S.BurgersWrapper>
      </S.App>
    );
  }
}

const mapStateToProps = state => ({
  ...state.app
});

const mapDispatchToProps = {
  fetch_data,
  set_burger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
