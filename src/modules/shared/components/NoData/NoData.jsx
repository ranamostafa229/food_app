import NoDataImg from "../../../../assets/nodata.svg";

// eslint-disable-next-line react/prop-types
const NoData = ({ colspan }) => {
  return (
    <td className="pt-5 mx-auto" colSpan={colspan}>
      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 ">
        <img src={NoDataImg} alt="" className="w-25" />
        <h4 className="fw-bold">No Data !</h4>
        <span className="text-muted text-center">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </span>
      </div>
    </td>
  );
};

export default NoData;
