import React, { useContext } from "react";
import Nav from "../Components/Nav";
import Card from "../Components/Card";
import { listingDataContext } from "../Context/ListingContext";

function Home() {
  let { listingData, setListingData, list, setList } =
    useContext(listingDataContext);
  return (
    <div>
      <Nav />
      <div className="w-[100vw] h-[70vh] flex overflow-y-scroll  items-center justify-center gap-[25px] flex-wrap mt-[270px] md:mt-[180px] px-[5px] mb-[10px] ">
        {list.map((list) => (
          <Card
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            ratings={list.ratings}
            isBooked={list.isBooked}
            host={list.host}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
