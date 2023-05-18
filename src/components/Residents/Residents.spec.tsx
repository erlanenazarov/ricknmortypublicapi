import { fireEvent, render } from '@testing-library/react';
import { useNavigate, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { ECharacterStatus, EGender, ICharacter } from 'store/characters/types';

import { Residents } from './Residents';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Residents', () => {
  const residents: ICharacter[] = [
    {
      id: '1',
      name: 'John Doe',
      image: 'image1.jpg',
      status: ECharacterStatus.ALIVE,
      type: 'Human',
      gender: EGender.MALE,
      species: 'Human',
    },
    {
      id: '2',
      name: 'Jane Smith',
      image: 'image2.jpg',
      status: ECharacterStatus.DEAD,
      type: 'Alien',
      gender: EGender.FEMALE,
      species: 'Alien',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders residents count and title when not loading', () => {
    const { getByText } = render(
      <Residents
        residents={residents}
        title="Test Residents"
        isLoading={false}
      />,
      { wrapper: BrowserRouter },
    );

    const residentsTitle = getByText('Test Residents');
    const residentsCount = getByText('2');

    expect(residentsTitle).toBeInTheDocument();
    expect(residentsCount).toBeInTheDocument();
  });

  test('renders "no residents" message when residents are empty and not loading', () => {
    const { getByText } = render(
      <Residents residents={[]} title="Test Residents" isLoading={false} />,
      { wrapper: BrowserRouter },
    );

    const noResidentsMessage = getByText('There is no residents... 😔');

    expect(noResidentsMessage).toBeInTheDocument();
  });

  test('renders skeleton input when loading', () => {
    const { getAllByTestId } = render(
      <Residents
        residents={residents}
        title="Test Residents"
        isLoading={true}
      />,
      { wrapper: BrowserRouter },
    );

    const skeletonInput = getAllByTestId('loading-indicator');

    for (const skeleton of skeletonInput) {
      expect(skeleton).toBeInTheDocument();
    }
  });

  test('navigates to character page when clicked on a resident', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const { getByText } = render(
      <Residents
        residents={residents}
        title="Test Residents"
        isLoading={false}
      />,
      { wrapper: BrowserRouter },
    );

    const residentName = getByText('John Doe');
    fireEvent.click(residentName);

    expect(navigateMock).toHaveBeenCalledWith('/characters/1');
  });

  test('renders "Show more" button when there are more residents to show', () => {
    const moreResidents: ICharacter[] = [
      ...residents,
      {
        id: '3',
        name: 'Bob Johnson',
        image: 'image3.jpg',
        status: ECharacterStatus.UNKNOWN,
        type: 'Human',
        gender: EGender.UNKNOWN,
        species: 'Human',
      },
    ];

    const { getByText } = render(
      <Residents
        residents={moreResidents}
        title="Test Residents"
        isLoading={false}
        chunkSize={2}
      />,
      { wrapper: BrowserRouter },
    );

    const showMoreButton = getByText('Show more');

    expect(showMoreButton).toBeInTheDocument();
  });

  test('renders "Hide" button when all residents are shown', () => {
    const { getByText } = render(
      <Residents
        residents={residents}
        title="Test Residents"
        isLoading={false}
        chunkSize={1}
      />,
      { wrapper: BrowserRouter },
    );

    const showMoreButton = getByText('Show more');

    expect(showMoreButton).toBeInTheDocument();

    userEvent.click(showMoreButton);

    const hideButton = getByText('Hide');

    expect(hideButton).toBeInTheDocument();
  });

  test('clicking "Show more" button increases the offset', () => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    const { getByText } = render(
      <Residents
        residents={residents}
        title="Test Residents"
        isLoading={false}
        chunkSize={1}
      />,
      { wrapper: BrowserRouter },
    );

    const showMoreButton = getByText('Show more');
    fireEvent.click(showMoreButton);
    const hideButton = getByText('Hide');

    expect(hideButton).toBeInTheDocument();
  });
});
