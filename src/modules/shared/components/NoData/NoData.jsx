import NoDataImg from "../../../../assets/nodata.svg";

// eslint-disable-next-line react/prop-types
const NoData = ({ colspan }) => {
  return (
    <td className="pt-5 " colSpan={colspan}>
      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 ">
        <img src={NoDataImg} alt="no-data" className="img-fluid" />
        <h4 className="fw-bold">No Data !</h4>
        <span className="text-muted text-center">
          There is no data to display
        </span>
      </div>
    </td>
  );
};

export default NoData;
