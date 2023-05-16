import { render, fireEvent } from '@testing-library/react';

import { IEpisode } from 'store/episodes/types';

import { Episodes } from './Episodes';

describe('Episodes', () => {
  const mockEpisodes: IEpisode[] = [
    {
      id: '1',
      name: 'Episode 1',
      episode: 'S01E01',
      air_date: 'December 2, 2013',
      created: '2017-11-10T12:56:33.798Z',
    },
    {
      id: '2',
      name: 'Episode 2',
      episode: 'S01E02',
      air_date: 'December 2, 2013',
      created: '2017-11-10T12:56:33.798Z',
    },
  ];

  const defaultProps = {
    data: mockEpisodes,
    isLoading: false,
    itemsCountOnLoading: 6,
    className: 'custom-list',
    onClick: jest.fn(),
  };

  it('renders the episodes list correctly', () => {
    const { getByText, getAllByTestId } = render(
      <Episodes {...defaultProps} />,
    );

    // Check if episode names are rendered
    expect(getByText('[#1] Episode 1')).toBeInTheDocument();
    expect(getByText('[#2] Episode 2')).toBeInTheDocument();

    // Check if episode items are rendered
    const episodeItems = getAllByTestId('episode-item');
    expect(episodeItems).toHaveLength(2);
  });

  it('triggers onClick handler when an episode item is clicked', () => {
    const { getAllByTestId } = render(<Episodes {...defaultProps} />);

    const episodeItems = getAllByTestId('episode-item');
    fireEvent.click(episodeItems[0]);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith('1');
  });

  it('displays loading state with skeleton elements', () => {
    const { getAllByTestId } = render(
      <Episodes {...defaultProps} isLoading={true} />,
    );

    const skeletonElements = getAllByTestId('skeleton');
    expect(skeletonElements).toHaveLength(6);
  });

  it('applies custom className to the episodes list', () => {
    const { container } = render(<Episodes {...defaultProps} />);

    expect(container.firstChild).toHaveClass('custom-list');
  });
});
