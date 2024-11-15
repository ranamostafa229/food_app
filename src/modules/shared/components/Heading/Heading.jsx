/* eslint-disable react/prop-types */
const Heading = ({ title, handleShowAdd }) => {
  return (
    <div className="d-flex justify-content-between p-3  ">
      <div className="d-flex flex-column  ">
        <h3 className="fw-bold m-0 ">{title} Table Details</h3>
        <span>You can check all details</span>
      </div>
      <button
        className="btn btn-success d-flex align-items-center 
        gap-1 btn-lg h-50 fs-6 fw-bold px-lg-5  rounded"
        onClick={handleShowAdd}
      >
        <span className="d-lg-inline d-none d-sm-inline"> Add New </span>
        <span className="d-sm-none d-xs-inline ">
          <i className="fa fa-plus-circle"></i>
        </span>
        Item
      </button>
    </div>
  );
};

export default Heading;
