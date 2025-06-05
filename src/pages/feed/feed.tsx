import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { selectFeed } from '../../services/slices/FeedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/FeedSlice';

export const Feed: FC = () => {
  const feed = useSelector(selectFeed);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (!feed.orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feed.orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
