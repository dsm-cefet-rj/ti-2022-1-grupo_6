import './styles.css'

export const Carousel = () => {
    return <div id="carouselCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselCaptions"
        data-bs-slide-to="0"
        class="active"
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
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src={`${window.location.origin}/ryzen2.jpg`}
          class="w-100 h-100 d-block"
          alt="..."
        />
        <div class="carousel-caption h-100">
          <h2 class="text-light">First slide label</h2>
          <p class="text-light">
            Some representative placeholder content for the first slide.
          </p>
        </div>
      </div>
      <div class="carousel-item">        
        <img
          src={`${window.location.origin}/ryzen2.jpg`}
          class="w-100 h-100 d-block"
          alt="..."
        />
        <div class="carousel-caption h-100">
          <h2 class="text-light">Second slide label</h2>
          <p class="text-light">
            Some representative placeholder content for the second slide.
          </p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
}