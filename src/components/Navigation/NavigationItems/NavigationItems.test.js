import React from 'react';
import { configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NaviagtionItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NaviagtionItems />', () => {
    it('should render two navigation item elements if not authenticated', () => {
        const wrapper = shallow(<NaviagtionItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});