import { render } from '@testing-library/react';

import { InfoText } from './InfoText';

describe('InfoText', () => {
  it('renders the label and value for each item when not loading', () => {
    const items = [
      { label: 'Item 1', value: 'Value 1' },
      { label: 'Item 2', value: 'Value 2' },
    ];
    const { getByText } = render(<InfoText items={items} isLoading={false} />);

    items.forEach(({ label, value }) => {
      const itemText = `${label}: ${value}`;
      expect(getByText(itemText)).toBeInTheDocument();
    });
  });

  it('renders the skeleton input for each item when loading', () => {
    const items = [
      { label: 'Item 1', value: 'Value 1' },
      { label: 'Item 2', value: 'Value 2' },
    ];
    const { getAllByTestId } = render(
      <InfoText items={items} isLoading={true} />,
    );

    const allSkeletons = getAllByTestId('info-text-skeleton');

    expect(allSkeletons).toBeDefined();
    expect(allSkeletons.length).toBe(2);

    for (const skeleton of allSkeletons) {
      expect(skeleton).toBeInTheDocument();
    }
  });
});
