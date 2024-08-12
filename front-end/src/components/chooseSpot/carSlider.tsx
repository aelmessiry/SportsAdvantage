import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { CarPositionsData } from '../../data/carPositions';
import CarPositionRight from '../shared/carsAdSpots/carPositionRight';
import CarPositionFront from '../shared/carsAdSpots/carPositionFront';
import CarPositionTop from '../shared/carsAdSpots/carPositionTop';
import CarPositionLeft from '../shared/carsAdSpots/carPositionLeft';
import CarPositionRear from '../shared/carsAdSpots/carPositionRear';
import { useSelectedSpot } from '../../contexts/SelectedSpotContext';
import { ReservedSpots } from '../../data/resevedSpots';
// Child Component
function SingleKpiOther({ value }) {
  return (
    <div className="text-lava-100 border-lava-100 right-2 absolute top-0 flex items-center justify-center w-8 h-8 bg-white border-2 rounded-full">
      {value}
    </div>
  );
}
function SingleKpiUser({ value }) {
  return (
    <div className="left-2 absolute top-0 flex items-center justify-center w-8 h-8 text-green-100 bg-white border-2 border-green-100 rounded-full">
      {value}
    </div>
  );
}
function SingleKpiSelected({ value }) {
  return (
    <div className="left-2 absolute bottom-0 flex items-center justify-center w-8 h-8 text-orange-400 bg-white border-2 border-orange-400 rounded-full">
      {value}
    </div>
  );
}

export default function CarSlider(props) {
  const { setSpotData, selectedSpots } = useSelectedSpot();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [sliderMain, setSliderMain] = useState(null);
  const [sliderThumb, setSliderThumb] = useState(null);
  const [kpis, setKPIs] = useState(null);
  const [selectedKPIs, setSelectedKPIs] = useState(null);
  useEffect(() => {
    setNav1(sliderMain);
    setNav2(sliderThumb);
  });

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    asNavFor: '.slider-nav',
    focusOnSelect: true,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          Padding: '100px 50px',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (current) => {
      // setActiveSlide(current);
      props.setSelectedPosition(current);
    },
  };
  const thumbnailSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    swipeToSlide: true,
    focusOnSelect: true,
  };

  const handleChooseSpot = (pos) => {
    const isSelectedExist =
      selectedSpots && selectedSpots.length > 0
        ? selectedSpots.findIndex(({ id }) => id == pos)
        : -1;
    const selectedSpot = CarPositionsData.map(({ spots }) => spots)
      .flat()
      .find(({ id }) => id == pos);
    isSelectedExist > -1
      ? setSpotData(
          selectedSpots && selectedSpots.filter(({ id }) => id != pos)
        )
      : setSpotData(
          selectedSpots && selectedSpots.length > 0
            ? [...selectedSpots, selectedSpot]
            : [selectedSpot]
        );
    const allElements = document.getElementsByClassName(pos);
    for (var i = 0; i < allElements.length; i++) {
      isSelectedExist == -1
        ? allElements[i].classList.add('hoverdSpotOrange')
        : allElements[i].classList.remove('hoverdSpotOrange');
    }
    //  div.classList.contains('secondary'); // true
  };
  React.useLayoutEffect(() => {
    if (ReservedSpots && ReservedSpots.length > 0) {
      const frontReservedByUser = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('front') && reservedByLoginUser
      ).length;
      const frontReservedByOther = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('front') && !reservedByLoginUser
      ).length;

      const rearReservedByUser = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('rear') && reservedByLoginUser
      ).length;
      const rearReservedByOther = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('rear') && !reservedByLoginUser
      ).length;

      const topReservedByUser = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('top') && reservedByLoginUser
      ).length;
      const topReservedByOther = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('top') && !reservedByLoginUser
      ).length;

      const rightReservedByUser = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('right') && reservedByLoginUser
      ).length;
      const rightReservedByOther = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('right') && !reservedByLoginUser
      ).length;

      const leftReservedByUser = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('left') && reservedByLoginUser
      ).length;
      const leftReservedByOther = ReservedSpots.filter(
        ({ spot, reservedByLoginUser }) =>
          spot.includes('left') && !reservedByLoginUser
      ).length;

      setKPIs({
        frontReservedByUser,
        frontReservedByOther,
        rearReservedByUser,
        rearReservedByOther,
        topReservedByUser,
        topReservedByOther,
        rightReservedByUser,
        rightReservedByOther,
        leftReservedByUser,
        leftReservedByOther,
      });
    }
  }, [ReservedSpots]);

  React.useLayoutEffect(() => {
    if (selectedSpots && selectedSpots.length > 0) {
      const frontSelected = selectedSpots.filter(({ id }: any) =>
        id.includes('front')
      ).length;
      const rearSelected = selectedSpots.filter(({ id }: any) =>
        id.includes('rear')
      ).length;
      const topSelected = selectedSpots.filter(({ id }: any) =>
        id.includes('top')
      ).length;
      const leftSelected = selectedSpots.filter(({ id }: any) =>
        id.includes('left')
      ).length;
      const rightSelected = selectedSpots.filter(({ id }: any) =>
        id.includes('right')
      ).length;
      setSelectedKPIs({
        frontSelected,
        rearSelected,
        topSelected,
        leftSelected,
        rightSelected,
      });
    }
  }, [selectedSpots]);
  return (
    <>
      <Slider
        className="latest-games-active slick"
        {...settings}
        asNavFor={nav2}
        ref={(slider) => setSliderMain(slider)}
      >
        {/* //Rear side */}
        <div key={1}>
          <CarPositionRear
            handleSelectSpot={(pos) => handleChooseSpot(pos)}
            isCart={props.isCart}
          />
        </div>
        {/* //front side */}
        <div key={2}>
          <CarPositionFront
            handleSelectSpot={(pos) => handleChooseSpot(pos)}
            isCart={props.isCart}
          />
        </div>
        {/* //top side */}
        <div key={3}>
          <CarPositionTop
            handleSelectSpot={(pos) => handleChooseSpot(pos)}
            isCart={props.isCart}
          />
        </div>
        {/* //right side */}
        <div key={4}>
          <CarPositionRight
            handleSelectSpot={(pos) => handleChooseSpot(pos)}
            isCart={props.isCart}
          />
        </div>
        {/* //left side */}
        <div key={5}>
          <CarPositionLeft
            handleSelectSpot={(pos) => handleChooseSpot(pos)}
            isCart={props.isCart}
          />
        </div>
      </Slider>
      <div className="thumbnail-wrapper">
        <Slider
          {...thumbnailSettings}
          asNavFor={nav1}
          ref={(slider) => setSliderThumb(slider)}
        >
          {CarPositionsData.map((pos) => (
            <div key={pos.id} className="">
              <div className="relative py-5">
                <img src={pos.image} alt="thumb" />
                <div>
                  {pos.name.toLowerCase().includes('rear') &&
                  kpis?.rearReservedByUser > 0 ? (
                    <SingleKpiUser value={kpis?.rearReservedByUser} />
                  ) : pos.name.toLowerCase().includes('top') &&
                    kpis?.topReservedByUser > 0 ? (
                    <SingleKpiUser value={kpis?.topReservedByUser} />
                  ) : pos.name.toLowerCase().includes('front') &&
                    kpis?.frontReservedByUser > 0 ? (
                    <SingleKpiUser value={kpis?.frontReservedByUser} />
                  ) : pos.name.toLowerCase().includes('right') &&
                    kpis?.rightReservedByUser > 0 ? (
                    <SingleKpiUser value={kpis?.rightReservedByUser} />
                  ) : pos.name.toLowerCase().includes('left') &&
                    kpis?.leftReservedByUser > 0 ? (
                    <SingleKpiUser value={kpis?.leftReservedByUser} />
                  ) : (
                    ''
                  )}
                </div>
                <div>
                  {pos.name.toLowerCase().includes('rear') &&
                  kpis?.rearReservedByOther > 0 ? (
                    <SingleKpiOther value={kpis?.rearReservedByOther} />
                  ) : pos.name.toLowerCase().includes('top') &&
                    kpis?.topReservedByOther > 0 ? (
                    <SingleKpiOther value={kpis?.topReservedByOther} />
                  ) : pos.name.toLowerCase().includes('front') &&
                    kpis?.frontReservedByOther > 0 ? (
                    <SingleKpiOther value={kpis?.frontReservedByOther} />
                  ) : pos.name.toLowerCase().includes('right') &&
                    kpis?.rightReservedByOther > 0 ? (
                    <SingleKpiOther value={kpis?.rightReservedByOther} />
                  ) : pos.name.toLowerCase().includes('left') &&
                    kpis?.leftReservedByOther > 0 ? (
                    <SingleKpiOther value={kpis?.leftReservedByOther} />
                  ) : (
                    ''
                  )}
                </div>
                {selectedSpots && (
                  <div>
                    {pos.name.toLowerCase().includes('rear') &&
                    selectedKPIs?.rearSelected > 0 ? (
                      <SingleKpiSelected value={selectedKPIs?.rearSelected} />
                    ) : pos.name.toLowerCase().includes('top') &&
                      selectedKPIs?.topSelected > 0 ? (
                      <SingleKpiSelected value={selectedKPIs?.topSelected} />
                    ) : pos.name.toLowerCase().includes('front') &&
                      selectedKPIs?.frontSelected > 0 ? (
                      <SingleKpiSelected value={selectedKPIs?.frontSelected} />
                    ) : pos.name.toLowerCase().includes('right') &&
                      selectedKPIs?.rightSelected > 0 ? (
                      <SingleKpiSelected value={selectedKPIs?.rightSelected} />
                    ) : pos.name.toLowerCase().includes('left') &&
                      selectedKPIs?.leftSelected > 0 ? (
                      <SingleKpiSelected value={selectedKPIs?.leftSelected} />
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
              <div className="thumb-text w-28 text-darkGunmetal-200 font-spAdvSemiBold h-7 flex items-center justify-center mt-4 text-sm font-semibold leading-5 text-center rounded">
                {pos.name}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
