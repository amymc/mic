import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import LocalStorageMock from './__mocks__/localStorageMock.js';
import App from './index';

describe('test App component', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    global.wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('updates sort order correctly', () => {
    expect(global.wrapper.state('wordSortOrder')).toEqual(null);

    global.wrapper.instance().updateSortOrder('words');
    expect(global.wrapper.state('wordSortOrder')).toEqual('ascending');
    expect(global.wrapper.state('dateSortOrder')).toEqual(null);

    global.wrapper.instance().updateSortOrder('words');
    expect(global.wrapper.state('wordSortOrder')).toEqual('descending');

    global.wrapper.instance().updateSortOrder('date');
    expect(global.wrapper.state('dateSortOrder')).toEqual('ascending');
    expect(global.wrapper.state('wordSortOrder')).toEqual(null);

    global.wrapper.instance().updateSortOrder('date');
    expect(global.wrapper.state('dateSortOrder')).toEqual('descending');
  });

  it('displays more articles on click', () => {
    expect(global.wrapper.state('allArticles').length).toEqual(30);
    expect(global.wrapper.state('articlesToDisplay').length).toEqual(10);
    global.wrapper.instance().onClick();
    expect(global.wrapper.state('articlesToDisplay').length).toEqual(20);
    global.wrapper.instance().onClick();
    expect(global.wrapper.state('articlesToDisplay').length).toEqual(
      global.wrapper.state('allArticles').length
    );
  });
});
