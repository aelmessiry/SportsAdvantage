import React from 'react';
import ListCardsSub from '../components/listCards/ListCardsSub';
function ListCards() {
  return (
    <>
      <div className="md:px-16 lg:flex-row flex flex-wrap px-4 mb-10">
        <ListCardsSub />
      </div>
    </>
  );
}

export default ListCards;
