export function ProductDetailSkeleton() {
  return (
    <div className="container p-5 h-150 vh-100">
      <div className="card border-0 mb-3">
        <div className="row g-4 center">
          <div className="col-md-4">
            <div className="w-100 h-100">
              <span className="placeholder col-12 h-100"></span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-header placeholder-glow h-100">
                {/* <span className="placeholder col-6"></span> */}
                <div
                  className="spinner-border text-secondary"
                  style={{ borderWidth: '0.2rem' }}
                  role="status"
                ></div>
              </h2>
              <form className="mt-3">
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-2"></span>
                </p>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-3"></span>
                </p>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-3"></span>
                </p>
                <button className="btn btn-primary disabled placeholder col-2 d-block mb-3"></button>
                <button className="btn btn-outline-primary disabled placeholder col-3"></button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <h3 className="placeholder-glow">
          <span className="placeholder col-3"></span>
        </h3>
        <p className="description-text placeholder-glow">
          <span className="placeholder col-8"></span>
          <span className="placeholder w-50"></span>
        </p>
      </div>
    </div>
  );
}
