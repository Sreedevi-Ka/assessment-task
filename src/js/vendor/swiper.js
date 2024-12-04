import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

class CustomSwiper extends Swiper {
  constructor(container, options) {
    const defaultOptions = {
      slidesPerView: 3, // Set the default slides per view
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      ...options, // Merge the custom options with the default options
    };

    super(container, defaultOptions);
  }

  // You can add custom methods or extend Swiper further here
}

export default CustomSwiper;
