import React from 'react';
import { configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NaviagtionItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NaviagtionItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NaviagtionItems />);
    });
    it('should render two navigation item elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three navigation item elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render Logout <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true);
    });



});