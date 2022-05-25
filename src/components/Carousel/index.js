import './styles.css';

export const Carousel = () => {
  return (
    <div
      id="carouselCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={`${window.location.origin}/ryzen2.jpg`}
            className="w-100 h-100 d-block"
            alt="..."
          />
          <div className="carousel-caption h-100">
            <h2 className="text-light">First slide label</h2>
            <p className="text-light">
              Some representative placeholder content for the first slide.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={`${window.location.origin}/ryzen2.jpg`}
            className="w-100 h-100 d-block"
            alt="..."
          />
          <div className="carousel-caption h-100">
            <h2 className="text-light">Second slide label</h2>
            <p className="text-light">
              Some representative placeholder content for the second slide.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
