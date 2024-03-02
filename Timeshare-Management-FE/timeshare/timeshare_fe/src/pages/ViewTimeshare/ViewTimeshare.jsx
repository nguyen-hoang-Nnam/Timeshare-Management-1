import React, { useState, useEffect } from "react";
import "./ViewTimeshare.css";
import { IoLocationOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import img from "../../Assets/img.jpg";
import img2 from "../../Assets/img (2).jpg";
import img3 from "../../Assets/img (3).jpg";
import img4 from "../../Assets/img (4).jpg";
import img5 from "../../Assets/img(5).jpg";
import img6 from "../../Assets/img(6).jpg";
import img7 from "../../Assets/img(7).jpg";
import img8 from "../../Assets/img(8).jpg";

import Aos from "aos";
import { IoSearch } from "react-icons/io5";

const vacations = [
  {
    id: 1,
    name: "Dalat",
    price: "500",
    imgSrc: img,
    location: "Viet Nam",
    grade: "Relax",
    description:
      "Dalat is the land of flowers and fog, because of the romantic and lyrical space that Dalat has become one of the most attractive tourist attractions in Vietnam. Here are the 5 most beautiful homestay in Da Lat for your visit and stay",
  },
  {
    id: 2,
    name: "Da Nang",
    price: "800",
    imgSrc: img2,
    location: "Viet Nam",
    grade: "Relax",
    description:
      "Situated in Da Nang, 600 metres from My Khe Beach and 1.1 km from Bac My An Beach, N Home offers a garden and air conditioning. This beachfront property offers access to a balcony and free WiFi. Love Lock Bridge Da Nang is 2.8 km away and Cham Museum is 3.5 km from the homestay.",
  },
  {
    id: 3,
    name: "Ha Long",
    price: "700",
    imgSrc: img3,
    location: "Viet Nam",
    grade: "Relax",
    description:
      "Situated in Ha Long, 600 metres from Queen Cable Car Station, The Bay - Ha Long Homestay features free WiFi, and guests can enjoy in the balcony or lush common area",
  },
  {
    id: 4,
    name: "Phu Quoc",
    price: "900",
    imgSrc: img4,
    location: "Viet Nam",
    grade: "Relax",
    description:
      "Situated in Phu Quoc Island, Seashells Phu Quoc Hotel & Spa offers contemporary rooms with free WiFi access in Duong Dong town.",
  },
  {
    id: 5,
    name: "Hoi An",
    price: "700",
    imgSrc: img5,
    location: "Viet Nam",
    grade: "Historic",
    description:
      "Hoi An is a city on Vietnam’s central coast known for its well-preserved Ancient Town, cut through with canals. The former port city’s melting-pot history is reflected in its architecture, a mix of eras and styles from wooden Chinese shophouses and temples to colorful French colonial buildings, ornate Vietnamese tube houses and the iconic Japanese Covered Bridge with its pagoda.",
  },
  {
    id: 6,
    name: "Sapa",
    price: "900",
    imgSrc: img6,
    location: "Viet Nam",
    grade: "Scenic",
    description:
      "Sapa is a town in the Hoàng Liên Son Mountains of northwestern Vietnam. A popular trekking base, it overlooks the terraced rice fields of the Muong Hoa Valley, and is near the 3,143m-tall Phang Xi Pang peak, which is climbable via a steep, multiday guided walk.",
  },
  {
    id: 7,
    name: "Nha Trang",
    price: "750",
    imgSrc: img7,
    location: "Viet Nam",
    grade: "Beach",
    description:
      "Nha Trang is a coastal city on the south-central coast of Vietnam. It is known for its beautiful beaches, diving sites and offshore islands. Its main beach is a long, curving stretch along Tran Phu Street, with promenades, parks and gardens along the way.",
  },
  {
    id: 8,
    name: "Mui Ne",
    price: "600",
    imgSrc: img8,
    location: "Viet Nam",
    grade: "Beach",
    description:
      "Mui Ne is a coastal resort town in the Binh Thuan Province of southeastern Vietnam. It is famous for its long, palm-lined beaches, strong sea breezes ideal for kiteboarding and windsurfing, and stunning sand dunes that stretch along the coast.",
  },
];

const ViewTimeshare = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3
          data-aos="fade-up"
          className="timeshare-header"
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "#962222",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            marginBottom: "10px",
          }}
        >
          Find a timeshare resort
        </h3>
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <IoSearch className="search-icon" />
        </div>
      </div>
      <div className="secContent grid">
        {vacations
          .filter((vacation) =>
            vacation.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(({ id, imgSrc, name, location, grade, description, price }) => (
            <div key={id} data-aos="fade-up" className="singleDestination">
              <div className="new-ribbon secondary">{price}</div>
              <div className="imageDiv">
                <img src={imgSrc} alt={name} />
              </div>
              <div className="cardInfo">
                <div className="cardBody-title">
                  <div>
                    <h1 className="destTitle">{name}</h1>
                    <span className="continent flex">
                      <IoLocationOutline className="icon" />
                      <span className="name">{location}</span>
                    </span>
                  </div>
                  <div className="grade">
                    <span style={{ fontSize: "0.85rem" }}>
                      <IoHeart style={{ fontSize: "1.8rem", color: "red" }} />
                      {grade}
                    </span>
                  </div>
                </div>
                <div className="desc">
                  <p>{description}</p>
                </div>
                <div className="fees flex">
                  <button className="btn flex">Details</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ViewTimeshare;
