const LoadingCard = () => {
  return (
    <>
      <div className="mt-5 mb-3 bg-white border border-dark d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-grow m-5 rounded-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <h5>Loading...</h5>
    </>
  );
};

export default LoadingCard;
