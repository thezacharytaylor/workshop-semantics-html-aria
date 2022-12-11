import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LoadedImageUrl from 'components/utils/loaded-image-url';

import 'components/slideshow/slideshow.scss';

const Slideshow = ({ images = [], imageURLs }) => {
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  let [fullScreenMode, setFullScreenMode] = useState(false);

  const btnFullScreenRef = useRef(null);
  const btnCloseRef = useRef(null);
  const slideshowRef = useRef(null);

  const decrementSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(images.length - 1);
    }
  };
  const incrementSlide = () => {
    if (currentSlideIndex < images.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };
  const changeSlide = (index) => {
    setCurrentSlideIndex(index);
  };
  const enterFullScreen = () => {
    setFullScreenMode(true);
  };
  const closeFullScreen = () => {
    setFullScreenMode(false);
  };
  const handleScreenClick = (event) => {
    if (!slideshowRef.current.contains(event.target)) {
      setFullScreenMode(false);
    }
  };

  return (
    <>
      <button
        className="btn-slideshow-fullscreen"
        onClick={enterFullScreen}
        ref={btnFullScreenRef}
        aria-label="Toggle fullscreen"
      >
        <span className="icon" aria-hidden="true"></span>
      </button>
      <div
        className={`inspiration-slideshow ${fullScreenMode ? 'fullscreen' : ''}`}
        onClick={(event) => handleScreenClick(event)}
      >
        <div className="slideshow-container" ref={slideshowRef}>
          {images.map((image, index) => {
            const imageUrl = imageURLs ? LoadedImageUrl(imageURLs, image.src) : image.src;
            return (
              <div className={`slide fade ${currentSlideIndex === index ? 'active' : ''}`} key={index}>
                <div className="numbertext">
                  {index + 1} / {images.length}
                </div>
                <img src={imageUrl} alt={image.alt} style={{ width: '100%' }} />
                <div className="text">{image.caption}</div>
              </div>
            );
          })}

          <button className="prev" onClick={() => decrementSlide()}>
            <span className="visually-hidden">Previous Slide </span>
            <span aria-hidden="true">&#10094;</span>
          </button>
          <button className="next" onClick={() => incrementSlide()}>
            <span className="visually-hidden">Next Slide </span>
            <span aria-hidden="true">&#10095;</span>
          </button>
        </div>
        <br />

        <ul className="dots">
          {images.map((image, index) => (
            <li
              className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
              key={index}
              onClick={() => changeSlide(index)}
            ></li>
          ))}
        </ul>
      </div>
    </>
  );
};

Slideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
  imageURLs: PropTypes.object,
};

export default Slideshow;
