import { render, fireEvent } from '@testing-library/react';

import { EGender, ECharacterStatus } from 'store/characters/types';

import { CharactersGrid } from './CharactersGrid';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('CharactersGrid', () => {
  const mockRickImage = 'https://example.com/rick.jpg';
  const mockMortyImage = 'https://example.com/morty.jpg';
  const defaultProps = {
    characters: [
      {
        id: '1',
        name: 'Rick Sanchez',
        image: mockRickImage,
        status: ECharacterStatus.ALIVE,
        type: 'Humanoid',
        gender: EGender.MALE,
        species: 'Human',
      },
      {
        id: '2',
        name: 'Morty Smith',
        image: mockMortyImage,
        status: ECharacterStatus.ALIVE,
        type: 'Alien',
        gender: EGender.MALE,
        species: 'Martian',
      },
    ],
    loading: false,
    className: 'custom-grid',
    cardClassName: 'custom-card',
    onClick: jest.fn(),
  };

  it('renders the characters grid correctly', () => {
    const { getByText, getAllByTestId } = render(
      <CharactersGrid {...defaultProps} />,
    );

    // Check if character names are rendered
    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByText('Morty Smith')).toBeInTheDocument();

    // Check if character cards are rendered
    const characterCards = getAllByTestId('character-card');
    expect(characterCards).toHaveLength(2);
  });

  it('triggers onClick handler when a character card is clicked', () => {
    const { getAllByTestId } = render(<CharactersGrid {...defaultProps} />);

    const characterCards = getAllByTestId('character-card');
    fireEvent.click(characterCards[0]);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith('1');
  });

  it('displays loading state when there are no characters and loading prop is true', () => {
    const { getByTestId } = render(
      <CharactersGrid {...defaultProps} characters={[]} loading={true} />,
    );

    expect(getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('applies custom className to the grid container', () => {
    const { container } = render(<CharactersGrid {...defaultProps} />);

    expect(container.firstChild).toHaveClass('custom-grid');
  });

  it('applies custom className to the character cards', () => {
    const { getAllByTestId } = render(<CharactersGrid {...defaultProps} />);

    const characterCards = getAllByTestId('character-card');
    expect(characterCards[0]).toHaveClass('custom-card');
  });
});
