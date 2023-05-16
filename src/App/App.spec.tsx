import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import { App } from './app';

describe('full app rendering/navigating', () => {
  it('Should render and navigate', () => {
    const { getByText } = render(<App />, { wrapper: BrowserRouter });

    const charactersMenuItem = getByText('Characters');

    expect(charactersMenuItem).toBeInTheDocument();

    fireEvent.click(charactersMenuItem);

    expect(charactersMenuItem.parentElement).toHaveClass(
      'ant-menu-overflow-item ant-menu-item ant-menu-item-selected',
    );
  });
});
