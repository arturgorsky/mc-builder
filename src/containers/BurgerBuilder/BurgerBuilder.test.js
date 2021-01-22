import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it("should render <BuildControls /> when received ingredients", () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it("should NOT render <BuildControls /> when NO ingredients", () => {
        wrapper.setProps({ingredients: null});
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});
