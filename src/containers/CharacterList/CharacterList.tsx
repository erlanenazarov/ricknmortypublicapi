import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';
import Pagination from 'antd/lib/pagination';

import { CHARACTERS_PAGE_URL, HOME_PAGE_URL } from 'configuration/routes';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'configuration/pagination';

import { Filters } from 'components/Filters';
import { CharactersGrid } from 'components/CharactersGrid';
import { TFormValues } from 'components/Form/types';

import {
  makeSelectCharactersData,
  makeSelectCharactersCount,
  makeSelectCharactersLoading,
} from 'store/characters/selectors';
import {
  listCharactersRequest,
  listCharactersClear,
} from 'store/characters/actions';

import { config, FORM_NAME } from './filters';
import { submit, submitToQuery } from './submit';
import { normalize } from './normalize';
import styles from './CharacterList.module.css';

const { Title } = Typography;

export const CharacterListContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const charactersLoading = useSelector(makeSelectCharactersLoading);
  const charactersData = useSelector(makeSelectCharactersData);
  const charactersTotalCount = useSelector(makeSelectCharactersCount);

  const requestCharacters = (page: number, values?: TFormValues): void => {
    const submitValues = submit(values || normalize(searchParams));

    dispatch(
      listCharactersRequest({
        page,
        filters: submitValues,
      }),
    );
  };

  const handleFiltersSubmit = (values: TFormValues): void => {
    setSearchParams(submitToQuery(values));
    requestCharacters(DEFAULT_PAGE, values);
  };

  const handleNavigateToCharacterDetail = (id: string): void => {
    navigate(`${CHARACTERS_PAGE_URL}/${id}`);
  };

  const getPage = (): number => {
    const page = searchParams.get('page');
    if (page === null) return 1;
    return Number(page);
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prevParams => {
      prevParams.set('page', `${page}`);
      return prevParams;
    });
    requestCharacters(page);

    const rootElement = document.getElementById('root');
    if (!rootElement) return;
    rootElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(
    () => {
      requestCharacters(getPage());

      return () => {
        dispatch(listCharactersClear());
      };
    },
    // Need to call this effect only once at render, so empty deps array should be passed
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={styles.root}>
      <Breadcrumb
        className={styles.breadcrumbs}
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: 'Characters' },
        ]}
      />

      <div className="filters-title">
        <Title level={3}>Browse characters</Title>
        <Filters
          name={FORM_NAME}
          initialValues={normalize(searchParams)}
          config={config}
          onSubmit={handleFiltersSubmit}
          searchField="name"
        />
      </div>

      {!charactersData?.length && !charactersLoading && (
        <Title level={5}>Sorry, characters are absent 😔</Title>
      )}
      <CharactersGrid
        characters={charactersData}
        loading={charactersLoading}
        onClick={handleNavigateToCharacterDetail}
      />
      {charactersTotalCount > DEFAULT_PAGE_SIZE && (
        <div className={styles.pagination}>
          <Pagination
            current={getPage()}
            total={charactersTotalCount}
            disabled={charactersLoading}
            pageSize={DEFAULT_PAGE_SIZE}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterListContainer;
