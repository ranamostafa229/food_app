import NotFoundImg from "../../../../assets/404.png";
import BackGdImg from "../../../../assets/backgd-404.png";
import logo from "../../../../assets/logo.png";
const NotFound = () => {
  return (
    <div className="d-flex flex-column  vh-100 ">
      <div className="not-found-img-container d-flex  justify-content-end ">
        <img src={BackGdImg} alt="" className="backgd-404" />
        <img src={NotFoundImg} alt="not found" className="img-404" />
      </div>
      <div className="not-found-container">
        <img src={logo} alt="logo" className="w-75 px-5" />
        <div className=" not-found-caption">
          <h1 className="fw-bold">Oops.... </h1>
          <h2 className="text-success">Page not found </h2>
          <span>
            This Page doesn’t exist or was removed! We suggest you back to home.
          </span>
          <button className="btn btn-success d-flex align-items-center justify-content-center gap-2 fw-bold">
            <i className="fa-solid fa-arrow-left"></i>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
