import { fireEvent, render } from '@testing-library/react';
import { HashRouter, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  characterDetailClear,
  characterDetailRequest,
} from 'store/characters/actions';
import {
  ECharacterStatus,
  EGender,
  ICharacterExpanded,
} from 'store/characters/types';

import { CharacterDetailContainer } from './CharacterDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('CharacterDetailContainer', () => {
  const character: ICharacterExpanded = {
    id: '1',
    name: 'John Doe',
    status: ECharacterStatus.ALIVE,
    gender: EGender.MALE,
    type: 'Human',
    species: 'Human',
    location: {
      id: '1',
      name: 'Earth',
      dimension: '',
      type: '',
    },
    origin: {
      id: '2',
      name: 'Mars',
      dimension: '',
      type: '',
    },
    episode: [
      {
        id: '1',
        name: 'Episode 1',
        episode: 'EGB123',
        air_date: 'December 2, 2018',
        created: '',
      },
      {
        id: '2',
        name: 'Episode 2',
        episode: 'EGB123',
        air_date: 'December 2, 2018',
        created: '',
      },
    ],
    image: 'image.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock).mockReturnValue(true);

    const { getByText } = render(<CharacterDetailContainer />, {
      wrapper: HashRouter,
    });

    const loadingText = getByText('Loading...');

    expect(loadingText).toBeInTheDocument();
  });

  test('renders character name and status when not loading', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(character);

    const { getByText, getAllByText } = render(<CharacterDetailContainer />, {
      wrapper: HashRouter,
    });

    const characterNames = getAllByText('John Doe');
    const characterStatus = getByText('Alive');

    for (const characterName of characterNames) {
      expect(characterName).toBeInTheDocument();
    }
    expect(characterStatus).toBeInTheDocument();
  });

  test('renders episodes count when not loading', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(character);

    const { getByText } = render(<CharacterDetailContainer />, {
      wrapper: HashRouter,
    });

    const episodesCount = getByText('2');

    expect(episodesCount).toBeInTheDocument();
  });

  test('renders character preview and info text when not loading', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(character);

    const { getAllByRole, getByText } = render(<CharacterDetailContainer />, {
      wrapper: HashRouter,
    });

    const characterPreviews = getAllByRole('img');
    const infoText = getByText('Gender: Male');

    for (const preview of characterPreviews) {
      expect(preview).toBeInTheDocument();
    }
    expect(infoText).toBeInTheDocument();
  });

  test('navigates to episode page when clicked on an episode', () => {
    const navigateMock = jest.fn();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(character);

    const { getByText } = render(<CharacterDetailContainer />, {
      wrapper: HashRouter,
    });

    const episodeLink = getByText('[#1] Episode 1');
    fireEvent.click(episodeLink);

    expect(navigateMock).toHaveBeenCalledWith('/episodes/1');
  });

  test('dispatches characterDetailRequest on mount', () => {
    const dispatchMock = jest.fn();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(character);

    render(<CharacterDetailContainer />, { wrapper: HashRouter });

    expect(dispatchMock).toHaveBeenCalledWith(
      characterDetailRequest({ id: '1' }),
    );
  });

  test('dispatches characterDetailClear on unmount', () => {
    const dispatchMock = jest.fn();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(character);

    const { unmount } = render(<CharacterDetailContainer />, {
      wrapper: HashRouter,
    });

    unmount();

    expect(dispatchMock).toHaveBeenCalledWith(characterDetailClear());
  });
});
