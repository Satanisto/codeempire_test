import React from "react";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { shallow } from "enzyme";
import Title from "shared/Title";
import { shallowToJson } from "enzyme-to-json";
import Button from "shared/Button";
import { BurgerForm } from "components/BurgerForm";
import STAGES from "constants/stages";
import partition from "shared/DensePacking/api/partitionAPI";

Enzyme.configure({ adapter: new Adapter() });

describe("Title", () => {
  it("should render correctly", () => {
    const output = shallow(<Title text={"Hello"} size={2} unit="rem" />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("should click", () => {
    console.log = jest.fn();
    const output = shallow(<Button onClick={() => console.log("click")}>Hello</Button>);
    output.simulate("click");
    expect(console.log).toHaveBeenCalledWith("click");
  });
});

describe("BurgerForm", () => {
  it("test state", () => {
    const test_data = `{"id":4,"name":"cheeseburger 2","ingredients":[{"state":true,"info":{"id":0,"name":"salad1","price":{"uah":32}}},{"state":true,"info":{"id":1,"name":"salad2","price":{"uah":32}}},{"state":true,"info":{"id":2,"name":"salad3","price":{"uah":32}}},{"state":true,"info":{"id":9,"name":"cheese","price":{"uah":33}}}],"bun_type":{"state":true,"info":{"id":0,"name":"brioche","price":{"uah":32}}},"meat_type":{"state":true,"info":{"id":1,"name":"salmon","price":{"uah":449}}},"sauce_type":{"state":true,"info":{"id":1,"name":"mayonnaise","price":{"uah":27}}}}`;

    const output = shallow(
      <BurgerForm
        set_burger={() => {}}
        configure_burger={() => {}}
        burger={JSON.parse(test_data)}
      />
    );

    expect(output.state().squeeze).toEqual(true);
    expect(output.state().stage).toEqual(STAGES.CONFIGURE);
    setTimeout(() => {
      expect(output.state().squeeze).toEqual(false);
      expect(output.state().stage).toEqual(STAGES.CONFIGURE);
    }, 1000);
  });
});

describe("API", () => {
  it("test partitionAPI", () => {
    const test_data = [[1, 2, 3, 4, 5, 6, 7, 8, 9], 3];
    const output = partition(...test_data);
    const correct_output = [[9, 4, 3], [8, 5, 2], [7, 6, 1]];

    expect(output).toEqual(correct_output);
  });
});
