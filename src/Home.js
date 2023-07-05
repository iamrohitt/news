import React from 'react';
import CardBox from './CardBox';
import Textarea from './Textarea';

const Home = ({ news }) => {
  return (
    <div>
    
      <CardBox news={news} /> {/* Render the CardBox component and pass the 'news' prop */}
      <Textarea />
    </div>
  );
};

export default Home;
