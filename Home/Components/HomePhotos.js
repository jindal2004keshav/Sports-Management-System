import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "./HomePhotos.css";

import img1 from './../../images/homepageImages/img1.jpg';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomePhotos = () => {
  return (
    <>
      <section className="photos-list">
        <div class="recipe-container">
          <h1>SportsSnap Gallery</h1>
          <div class="swiper">
            <div class="swiper-wrapper">
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
                keyboard={true}
                loop={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              >
                <SwiperSlide>
                  <div class="swiper-slide post">
                    <img
                      class="post-img"
                      src={img1}
                      alt="recipe"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="swiper-slide post">
                    <img
                      class="post-img"
                      src="https://thesagarschool.org/sagarnewlib/images/sections/sports/volleyball.jpg"
                      alt="recipe"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="swiper-slide post">
                    <img
                      class="post-img"
                      src="https://i.ytimg.com/vi/KtPgjwHnjGo/maxresdefault.jpg"
                      alt="recipe"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="swiper-slide post">
                    <img
                      class="post-img"
                      src="https://images.careerindia.com/img/2017/02/27-1488194741-bombaysportscollege.jpg"
                      alt="recipe"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="swiper-slide post">
                    <img
                      class="post-img"
                      src="https://www.cev.ac.in/en/wp-content/uploads/2018/01/received_1353982938029335.jpeg"
                      alt="recipe"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="swiper-slide post">
                    <img
                      class="post-img"
                      src="https://www.shutterstock.com/image-photo/indian-asian-college-students-friends-260nw-1839780400.jpg"
                      alt="recipe"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePhotos;
