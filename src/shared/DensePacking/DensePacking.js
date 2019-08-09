import React, { Component } from "react";
import PropTypes from "prop-types";
import ResizeHelper from "shared/ResizeHelper";

import partitionAPI from "./api/partitionAPI";

import update from "react-addons-update";

function setTranslate({ x, y } = { x: 0, y: 0 }) {
  return {
    position: "absolute",
    transform: `translate(${x}px, ${y}px)`
  };
}

function setSize({ width, height, handed }) {
  return { width: `${handed ? "100%" : `${width}px`}`, height: `${height}px` };
}

export class DensePacking extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    props: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    getKey: PropTypes.func.isRequired,
    dense: PropTypes.bool.isRequired,
    wrapper: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
  };

  static defaultProps = {
    dense: false,
    wrapper: function({ children, setRef, ...props }) {
      return (
        <div ref={setRef} {...props} style={{ ...props["style"] }}>
          {children}
        </div>
      );
    },
    getKey: (_, index) => index
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      columns: 0,
      positions: {},
      handed: false
    };

    this.wrapperRef = React.createRef();
  }

  componentWillMount() {
    this.blocksHeights = {};
  }

  componentDidMount() {
    this.calculateSize();
  }

  shouldComponentUpdate(_, nextState) {
    return (
      this.state.height !== nextState.height ||
      this.state.columns !== nextState.columns ||
      this.state.handed !== nextState.handed
    );
  }

  setPosition = partition => {
    let blockHeight = 0;
    const { singleColumn } = this.props.config;

    const positions = {};

    partition.forEach((value, column) => {
      let y = 0;

      value.forEach(value => {
        positions[value.key] = {
          x: column * singleColumn,
          y
        };

        y += Number(value);
      });

      blockHeight = blockHeight < y ? y : blockHeight;
    });

    return { height: blockHeight, positions };
  };

  calculatePosition = ({ columns, handed, width }) => {
    const { dense } = this.props;
    const newColumns = columns > 0 ? columns : 1;

    const values = Object.getOwnPropertyNames(this.blocksHeights);
    const list = values.map(key => this.blocksHeights[key]);

    const partition = dense ? partitionAPI(list, newColumns) : [list];

    const { height, positions } = this.setPosition(partition);

    this.setState(state => ({
      ...state,
      width,
      height,
      handed,
      columns: newColumns,
      positions: update(state.positions, { $merge: positions })
    }));
  };

  calculateSize = () => {
    const wrapperWidth = this.wrapperRef.parentNode.clientWidth;

    const { config } = this.props;
    const { singleColumn, toggleToHandDevice } = config;

    let columns = Math.floor(wrapperWidth / singleColumn);
    const old_columns = this.state.columns;
    let handed = true;
    let width = columns * singleColumn;

    if (columns > toggleToHandDevice) {
      handed = false;
    }

    if (columns !== old_columns || columns <= toggleToHandDevice) {
      this.calculatePosition({ columns, handed, width });
    }
  };

  handleResize = () => {
    this.calculateSize();
  };

  render() {
    const { wrapper: Wrapper, props, items, component: Component, getKey } = this.props;
    const { width, height, handed } = this.state;

    return (
      <Wrapper
        style={setSize({ width, height, handed })}
        setRef={ref => (this.wrapperRef = ref)}
      >
        <ResizeHelper onResize={this.handleResize} />

        {items.map((item, index) => {
          const key = getKey(item, index);

          const currentProps = Array.isArray(props) ? props[index] : props;
          const position = this.state.positions[key];
          const height = this.blocksHeights[key];
          const { handed } = this.state;

          return (
            <div style={{ ...setTranslate(position) }} key={key}>
              <Component
                {...currentProps(item, { position, height })}
                item={item}
                handed={handed}
                setRef={ref => {
                  if (ref != null) {
                    this.blocksHeights[key] = {
                      key,
                      valueOf: () => ref.offsetHeight
                    };
                  }
                }}
              />
            </div>
          );
        })}
      </Wrapper>
    );
  }
}

export default DensePacking;
