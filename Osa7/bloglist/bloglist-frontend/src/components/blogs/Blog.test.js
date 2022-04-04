import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import { Provider } from 'react-redux';
import { store } from '../../store';

let component;
beforeEach(() => {
  const user = {
    username: 'moi',
  };
  const blog = {
    title: 'Testiblogi',
    author: 'Testiauthori',
    url: 'url69',
    likes: '5',
    user: user,
  };
  component = render(
    <Provider store={store}>
      <Blog blog={blog} user={user} />
    </Provider>
  );
});

test('renders title and author', () => {
  expect(component.container).toHaveTextContent('Testiblogi', 'Testiauthori');
});

test('does not render url and likes', () => {
  expect(component.container.querySelector('#blogDetails')).toHaveStyle(
    'display: none'
  );
});

test('renders blog details after button press', () => {
  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('url69', '5');
});
