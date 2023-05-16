import { fireEvent, render } from '@testing-library/react';
import { useNavigate, useSearchParams, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { listCharactersRequest } from 'store/characters/actions';
import { ECharacterStatus, EGender, ICharacter } from 'store/characters/types';

import { CharacterListContainer } from './CharacterList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('CharacterListContainer', () => {
  const navigateMock = jest.fn();
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(MOCK_CHARACTERS)
      .mockReturnValueOnce(MOCK_CHARACTERS_COUNT)
      .mockReturnValueOnce({});

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      jest.fn(),
    ]);
  });

  it('renders characters data when not loading', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      jest.fn(),
    ]);

    const { getByText } = render(<CharacterListContainer />, {
      wrapper: BrowserRouter,
    });

    const character1 = getByText('John Doe');
    const character2 = getByText('Jane Smith');

    expect(character1).toBeInTheDocument();
    expect(character2).toBeInTheDocument();
  });

  it('renders characters count and pagination when not loading', () => {
    const { getByText, getByRole } = render(<CharacterListContainer />, {
      wrapper: BrowserRouter,
    });

    const charactersCount = getByText('2');
    const pagination = getByRole('navigation');

    expect(charactersCount).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
  });

  it('navigates to character detail page when clicked on a character', () => {
    const { getByText } = render(<CharacterListContainer />, {
      wrapper: BrowserRouter,
    });

    const characterLink = getByText('John Doe');
    fireEvent.click(characterLink);

    expect(navigateMock).toHaveBeenCalledWith('/characters/1');
  });

  it('dispatches listCharactersRequest on mount', () => {
    render(<CharacterListContainer />, { wrapper: BrowserRouter });

    expect(dispatchMock).toHaveBeenCalledWith(
      listCharactersRequest({ page: 1, filters: {} }),
    );
  });

  it('changes page and dispatches listCharactersRequest on page change', () => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', '1');

    const setSearchParamsMock = jest.fn(() => searchParams);
    (useSearchParams as jest.Mock).mockReturnValue([
      searchParams,
      setSearchParamsMock,
    ]);

    const { container } = render(<CharacterListContainer />, {
      wrapper: BrowserRouter,
    });

    const paginationWrapper = container.querySelector('.ant-pagination');

    expect(paginationWrapper).toBeInTheDocument();

    const nextPageButton = paginationWrapper?.querySelector(
      '.ant-pagination-item[title="2"]',
    );

    expect(nextPageButton).toBeInTheDocument();

    if (nextPageButton) {
      fireEvent.click(nextPageButton);
    }

    expect(dispatchMock).toHaveBeenCalledWith(
      listCharactersRequest({ page: 2, filters: {} }),
    );
  });
});

const MOCK_CHARACTERS_COUNT = 800;
const MOCK_CHARACTERS: ICharacter[] = [
  {
    id: '1',
    name: 'John Doe',
    gender: EGender.MALE,
    status: ECharacterStatus.ALIVE,
    species: '',
    type: '',
    image: 'image.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    gender: EGender.MALE,
    status: ECharacterStatus.ALIVE,
    species: '',
    type: '',
    image: 'image.png',
  },
];
