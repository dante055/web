import React, { forwardRef } from 'react';
import styles from './ContentCard.module.css';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import cx from 'classnames';

const image_Base_Url = 'https://image.tmdb.org/t/p/original';

const ContentCard = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className={cx(
        styles.contentCard,
        `${data.profile_path ? styles.contentCard__profile : ''}`
      )}
    >
      <img
        className={cx(styles.contentCard_poster)}
        src={`${image_Base_Url}${
          data.backdrop_path || data.poster_path || data.profile_path
        }`}
        alt='Poster'
      />
      <p className={styles.contentCard__overview}>{data.overview}</p>
      <h2>{data.name || data.title}</h2>
      <div className={styles.contentCard__stats}>
        <div className={styles.contentCard__icons}>
          <StarIcon />
          <span>{data.popularity}</span>
        </div>
        {data.vote_count ? (
          <div className={styles.contentCard__icons}>
            <ThumbUpIcon />
            <span>{data.vote_count}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default ContentCard;
