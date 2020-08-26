import React, { useEffect, useState } from 'react';
import styles from './TabsContent.module.css';
import ContentCard from './ContentCard/ContentCard.js';
import { axiosInstance } from '../../utils/axios';
import { getContentUrl } from '../../utils/requestUrls';
import FlipMove from 'react-flip-move';
import Pagination from '@material-ui/lab/Pagination';

const initialPage = 1;

function TabsContent({ selectedTab }) {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [selectedTab]);

  useEffect(() => {
    (async () => {
      try {
        if (!sessionStorage.getItem(`${selectedTab}-page=${page}`)) {
          const trending_media_type = 'all';
          const genre_media_type = 'movie';
          const time_window = 'week';
          const url = getContentUrl(
            selectedTab,
            page,
            trending_media_type,
            genre_media_type,
            time_window
          );
          const {
            data: { results },
          } = await axiosInstance.get(url);
          sessionStorage.setItem(
            `${selectedTab}-page=${page}`,
            JSON.stringify(results)
          );
          setContent(results);
        } else {
          const results = JSON.parse(
            sessionStorage.getItem(`${selectedTab}-page=${page}`)
          );
          setContent(results);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedTab, page]);

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabContent__paginator}>
        <Pagination
          count={10}
          page={page}
          color='secondary'
          onChange={(event, value) => setPage(value)}
        />
      </div>
      <FlipMove className={styles.tabContent__content}>
        {content.length
          ? content.map(data => <ContentCard key={data.id} data={data} />)
          : null}
      </FlipMove>
      <div className={styles.tabContent__paginator}>
        <Pagination
          count={10}
          page={page}
          color='secondary'
          onChange={(event, value) => setPage(value)}
        />
      </div>
    </div>
  );
}

export default TabsContent;
