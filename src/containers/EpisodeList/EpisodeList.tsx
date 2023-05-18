import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';
import Pagination from 'antd/lib/pagination';

import { EPISODES_PAGE_URL, HOME_PAGE_URL } from 'configuration/routes';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'configuration/pagination';

import { Filters } from 'components/Filters';
import { TFormValues } from 'components/Form/types';
import { Episodes } from 'components/Episodes';

import { normalize } from 'containers/CharacterList/normalize';
import { submit, submitToQuery } from 'containers/CharacterList/submit';

import { listEpisodesRequest, clearListEpisodes } from 'store/episodes/actions';
import {
  makeSelectListEpisodesLoading,
  makeSelectListEpisodesCount,
  makeSelectListEpisodesData,
} from 'store/episodes/selectors';

import { FORM_NAME, config } from './filters';
import styles from './EpisodeList.module.css';

const { Title } = Typography;

export const EpisodeListContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const episodesLoading = useSelector(makeSelectListEpisodesLoading);
  const episodesCount = useSelector(makeSelectListEpisodesCount);
  const episodesData = useSelector(makeSelectListEpisodesData);

  const requestEpisodes = (page: number, values?: TFormValues): void => {
    const submitValues = submit(values || normalize(searchParams));

    dispatch(
      listEpisodesRequest({
        page,
        filters: submitValues,
      }),
    );
  };

  const handleFiltersSubmit = (values: TFormValues): void => {
    setSearchParams(submitToQuery(values));
    requestEpisodes(DEFAULT_PAGE, values);
  };

  const handleNavigateToEpisodeDetail = (id: string): void => {
    navigate(`${EPISODES_PAGE_URL}/${id}`);
  };

  const getPage = (): number => {
    const page = searchParams.get('page');
    if (page === null) return DEFAULT_PAGE;
    return Number(page);
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prevParams => {
      prevParams.set('page', `${page}`);
      return prevParams;
    });
    requestEpisodes(page);

    const rootElement = document.getElementById('root');
    if (!rootElement) return;
    rootElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(
    () => {
      requestEpisodes(getPage());

      return () => {
        dispatch(clearListEpisodes());
      };
    },
    // Need to call this effect only once
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={styles.root}>
      <Breadcrumb
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: 'Episodes' },
        ]}
      />

      <div className="filters-title">
        <Title level={3}>Browse episodes</Title>
        <Filters
          name={FORM_NAME}
          initialValues={normalize(searchParams)}
          config={config}
          onSubmit={handleFiltersSubmit}
          searchField="name"
        />
      </div>

      <Episodes
        data={episodesData}
        isLoading={episodesLoading}
        itemsCountOnLoading={DEFAULT_PAGE_SIZE}
        onClick={handleNavigateToEpisodeDetail}
      />
      {episodesCount > DEFAULT_PAGE_SIZE && (
        <div className={styles.pagination}>
          <Pagination
            current={getPage()}
            pageSize={DEFAULT_PAGE_SIZE}
            showSizeChanger={false}
            onChange={handlePageChange}
            total={episodesCount}
          />
        </div>
      )}
    </div>
  );
};
