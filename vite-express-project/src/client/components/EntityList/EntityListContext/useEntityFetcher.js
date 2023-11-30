import { useState, useEffect, useCallback } from 'react';
import {
  ITEMS_PER_LOAD,
  API_BY_URL
} from '../constants.js';
import { getEntityCardRandomePosition, buildQueryParams } from '../utils.js';

const defaultState = {
  entityByIndex: {},
  isFetching: true,
  isInitial: true,
  currentCount: 0,
  totalCount: 0
}

export const useEntityFetcher = ({ url: _url, sortAttribute, sortDirection }) => {
  const [state, setState] = useState(defaultState);
  const [fetchTimeout, setFetchTimeout] = useState(null);

  const url = API_BY_URL[_url]

  const fetchEntities = useCallback(async (offset, { sortAttribute, sortDirection } = {}) => {
    setState((prev) => ({ ...prev, isFetching: true }));

    const params = {
      offset,
      limit: ITEMS_PER_LOAD,
      sort_attribute: sortAttribute,
      sort_direction: sortDirection
    };

    try {
      const { entities, totalCount } =
        await fetch(buildQueryParams(url, params)).then((res) => res.json());

      const timeout = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          entityByIndex: {
            ...prev.entityByIndex,
            ...entities.reduce((entityByIndex, entity, index) => {
              entityByIndex[prev.currentCount + index] = {
                ...entity,
                // to give random position for each entity card.
                // it's included in this hook because calling it in the component won't sustain
                // the initial position of the card so it will look wobbly when scrolling/lading more items.
                transform: getEntityCardRandomePosition()
              };
  
              return entityByIndex;
            }, {})
          },
          currentCount: prev.currentCount + entities.length,
          isFetching: false,
          ...totalCount ? { totalCount, isInitial: false } : {}
        }));
      }, (Math.random() * 10000 % 1000) + 1000);

      setFetchTimeout(timeout);
    } catch(error) {
      console.error("Server Error:", error);
      setState((prev) => ({ ...prev, isFetching: false }));
    }
  }, [url]);

  useEffect(() => {
    // if this is been called, that means there is pending fetch request
    // clear state update that is set with timeout before loading new data
    // otherwise it will endup stale data that will mix-up the list
    setFetchTimeout((prev) => {
      prev && clearTimeout(prev);

      return null;
    });

    setState(defaultState);
    fetchEntities(0, { sortAttribute, sortDirection });
  }, [sortAttribute, sortDirection]);

  // clear timeout when unmounting
  useEffect(() => {
    return fetchTimeout ? () => clearTimeout(fetchTimeout) : undefined;
  }, []);

  return {
    entityByIndex: state.entityByIndex,
    isFetching: state.isFetching,
    currentCount: state.currentCount,
    totalCount: state.totalCount,
    isInitial: state.isInitial,
    fetchEntities
  };
}