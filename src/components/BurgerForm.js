import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { set_burger, configure_burger } from "store/actions/order";

import * as S from "styles/burger_form";

import { Appear } from "shared/animations";
import { FaClose } from "shared/icons";
import Title from "shared/Title";
import Image from "shared/Image";

import Switch from "react-switch";

import { getImage, BUNS, MEATS, SAUCES, INGREDIENTS } from "constants/paths";
import STAGES from "constants/stages";
import Button from "shared/Button";

export class BurgerForm extends Component {
  static propTypes = {
    set_burger: PropTypes.func.isRequired,
    configure_burger: PropTypes.func.isRequired,
    burger: PropTypes.shape({
      name: PropTypes.string.isRequired,
      ingredients: PropTypes.array.isRequired,
      bun_type: PropTypes.object.isRequired,
      meat_type: PropTypes.object.isRequired,
      sauce_type: PropTypes.object.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      squeeze: true,
      stage: STAGES.CONFIGURE
    };

    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeSqueeze = this.handleChangeSqueeze.bind(this);
    this.previousStage = this.previousStage.bind(this);
    this.nextStage = this.nextStage.bind(this);
    this.exit = this.exit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.burger === null) {
      setTimeout(() => prevState.squeeze && this.handleChangeSqueeze(false), 1000);
    }
  }

  handleChangeState(index, newState) {
    this.props.configure_burger({
      ingredients: { [index]: { state: { $set: newState } } }
    });
  }

  handleChangeSqueeze(flag) {
    this.setState(() => ({
      squeeze: flag
    }));
  }

  getPrice() {
    const { burger } = this.props;

    return (
      burger.bun_type.info.price.uah +
      burger.meat_type.info.price.uah +
      burger.sauce_type.info.price.uah +
      burger.ingredients.reduce(
        (prev, curr) => prev + (curr.state && curr.info.price.uah),
        0
      )
    );
  }

  previousStage() {
    if (this.state.stage === STAGES.CONFIRM) {
      this.setState(() => ({
        stage: STAGES.CONFIGURE,
        squeeze: false
      }));
    }
  }

  nextStage() {
    if (this.state.stage === STAGES.CONFIGURE) {
      this.setState(() => ({
        stage: STAGES.CONFIRM,
        squeeze: true
      }));
    } else if (this.state.stage === STAGES.CONFIRM) {
      this.exit();
    }
  }

  exit() {
    this.setState(() => ({
      stage: STAGES.CONFIGURE
    }));

    this.props.set_burger(null);
  }

  render() {
    const { burger } = this.props;

    return (
      <Appear in={burger !== null}>
        <S.BurgerForm>
          <S.CloseWrapper onClick={this.exit}>
            <FaClose />
          </S.CloseWrapper>

          {burger && (
            <S.ContentWrapper>
              <Title text={burger.name} size={2} unit="rem" />
              <S.Content>
                <S.Information>
                  <S.Item>
                    {burger.bun_type.info.name} ({burger.bun_type.info.price.uah} UAH)
                  </S.Item>
                  <S.Item>
                    {burger.meat_type.info.name} ({burger.meat_type.info.price.uah} UAH)
                  </S.Item>
                  <S.Item>
                    {burger.sauce_type.info.name} ({burger.sauce_type.info.price.uah} UAH)
                  </S.Item>

                  {burger.ingredients.map((ingredient, index) => (
                    <S.Item key={ingredient.info.id}>
                      {ingredient.info.name} ({ingredient.info.price.uah} UAH){" "}
                      {this.state.stage === STAGES.CONFIGURE && (
                        <Switch
                          checked={ingredient.state}
                          onChange={() =>
                            this.handleChangeState(index, !ingredient.state)
                          }
                        />
                      )}
                    </S.Item>
                  ))}

                  <S.Price>Total: {this.getPrice()} UAH</S.Price>

                  <S.Buttons>
                    <Button
                      wrapper={S.Button}
                      onClick={this.previousStage}
                      props={{ disabled: this.state.stage === STAGES.CONFIGURE }}
                    >
                      Previous
                    </Button>

                    <Button wrapper={S.Button} onClick={this.nextStage}>
                      {this.state.stage === STAGES.CONFIGURE ? "Next" : "Confirm"}
                    </Button>
                  </S.Buttons>
                </S.Information>

                <S.Preview squeeze={this.state.squeeze}>
                  <S.BurgerItem z_index={burger.ingredients.length + 1}>
                    <Image src={getImage(BUNS, `${burger.bun_type.info.id}_top`)} />
                  </S.BurgerItem>

                  {burger.ingredients.map((ingredient, index) => (
                    <S.BurgerItem
                      key={ingredient.info.id}
                      state={!ingredient.state}
                      delete={this.state.stage === STAGES.CONFIRM && !ingredient.state}
                      z_index={burger.ingredients.length - index}
                    >
                      <Image src={getImage(INGREDIENTS, `${ingredient.info.id}`)} />
                    </S.BurgerItem>
                  ))}

                  <S.BurgerItem z_index={-1}>
                    <Image src={getImage(MEATS, `${burger.meat_type.info.id}`)} />
                  </S.BurgerItem>
                  <S.BurgerItem z_index={-2}>
                    <Image src={getImage(SAUCES, `${burger.sauce_type.info.id}`)} />
                  </S.BurgerItem>
                  <S.BurgerItem z_index={-3}>
                    <Image src={getImage(BUNS, `${burger.bun_type.info.id}_bottom`)} />
                  </S.BurgerItem>
                </S.Preview>
              </S.Content>
            </S.ContentWrapper>
          )}
        </S.BurgerForm>
      </Appear>
    );
  }
}

const mapStateToProps = state => ({
  ...state.order
});

const mapDispatchToProps = {
  set_burger,
  configure_burger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerForm);
