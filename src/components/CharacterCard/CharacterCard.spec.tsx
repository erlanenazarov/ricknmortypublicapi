import { render, fireEvent } from '@testing-library/react';

import { EGender, ECharacterStatus } from 'store/characters/types';

import { CharacterCard } from './CharacterCard';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('CharacterCard', () => {
  const mockImage = 'https://example.com/image.jpg';
  const defaultProps = {
    id: '1',
    name: 'Rick Sanchez',
    image: mockImage,
    gender: EGender.MALE,
    species: 'Human',
    type: 'Humanoid',
    status: ECharacterStatus.ALIVE,
    loading: false,
    className: 'custom-class',
    onClick: jest.fn(),
  };

  it('renders the character card correctly', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <CharacterCard {...defaultProps} />,
    );

    // Check if name, gender, species, type, and status are rendered
    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByTestId('gender-icon')).toBeInTheDocument();
    expect(getByText('Species: Human')).toBeInTheDocument();
    expect(getByText('Type: Humanoid')).toBeInTheDocument();
    expect(getByText('Alive')).toBeInTheDocument();

    // Check if the image is rendered with the correct alt text
    const imageElement = getByAltText('Rick Sanchez');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toBe(mockImage);
  });

  it('triggers onClick handler when clicked', () => {
    const { container } = render(<CharacterCard {...defaultProps} />);

    if (container.firstChild) {
      fireEvent.click(container.firstChild);
    }

    expect(container.firstChild).toBeDefined();
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('displays loading state when loading prop is true', () => {
    const { baseElement } = render(
      <CharacterCard {...defaultProps} loading={true} />,
    );
    const loadingNode = baseElement.querySelector(
      '.ant-card-cover .ant-skeleton, .ant-card-body .ant-skeleton',
    );

    expect(loadingNode).toBeDefined();
    expect(loadingNode).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const { container } = render(<CharacterCard {...defaultProps} />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
