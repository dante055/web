import React, { useState, useEffect } from 'react';
import { Header, Tabs, TabsContent, Footer } from './components/index.js';
import styles from './css/App.module.css';
import { axiosInstance } from './utils/axios';
import { genreUrl } from './utils/requestUrls';
import { initialGenres } from './utils/initialGenres';

function App() {
  const [genres, setGenres] = useState(initialGenres);
  const [selectedTab, setSelectedTab] = useState('trending');
  useEffect(() => {
    (async () => {
      try {
        if (!sessionStorage.getItem('genre')) {
          const {
            data: { genres },
          } = await axiosInstance.get(genreUrl);
          const results = [...initialGenres, ...genres];
          sessionStorage.setItem('genre', JSON.stringify(results));
          setGenres(results);
        } else {
          const results = JSON.parse(sessionStorage.getItem('genre'));
          setGenres(results);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Tabs
        genres={genres}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TabsContent selectedTab={selectedTab} />
      <Footer />
    </div>
  );
}

export default App;
