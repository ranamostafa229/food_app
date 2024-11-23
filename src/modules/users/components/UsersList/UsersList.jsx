import { useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { IMAGE_URL, users_endpoints } from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import Heading from "../../../shared/components/Heading/Heading";
import noDataImg from "../../../../assets/nodata.svg";
import useUsers from "./hooks/useUsers";
import Filtration from "../../../shared/components/Filtration/Filtration";
import PaginationSection from "../../../shared/components/PaginationSection/PaginationSection";
// const [showView, setShowView] = useState(false);

// const handleShowView = (id) => {
//   setSelectedId(id);
//   setShowView(true);
// };
const UsersList = () => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const usersQuery = useUsers();
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const deleteUser = async () => {
    try {
      let response = await privateApiInstance.delete(
        users_endpoints.DELETE_USER(selectedId)
      );
      if (response.status === 200) {
        toast.success("User deleted successfully");
        // setUsers((prev) => prev.filter((item) => item.id !== selectedId));
        usersQuery?.triggerUsers();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    handleClose();
  };

  return (
    <div>
      <Header
        title="Users List"
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <Heading />
      <Filtration query={usersQuery} pageName={"users"} />
      {usersQuery?.usersIsFetching && usersQuery?.fetchCount === 0 ? (
        <div
          className="spinner-border text-success d-block mx-auto mt-5"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="p-md-3  p-0 table-responsive ">
          <table className="table  table-striped  table-borderless ">
            <thead className="table-header ">
              <tr className="table-secondary  ">
                <th scope="col">Name</th>
                <th scope="col" className="text-center">
                  Image
                </th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {usersQuery?.users?.data.length > 0 ? (
                usersQuery?.users?.data.map((user) => (
                  <tr key={user?.id}>
                    <td>{user?.userName}</td>
                    <td className="w-25 h-100 text-center ">
                      <img
                        src={
                          user?.imagePath
                            ? `${IMAGE_URL}/${user?.imagePath}`
                            : `${noDataImg}`
                        }
                        alt={`${user?.name}`}
                        className="rounded-2"
                        style={{
                          width: "60px",
                        }}
                      />
                    </td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.email}</td>
                    <td>{user?.country}</td>

                    <td
                      className="text-center cursor-pointer"
                      // onClick={() => setSelecteduser(user?.name)}
                    >
                      <DropdownMenu
                        handleShowDelete={() => handleShowDelete(user?.id)}
                        // handleShowView={() => handleShowView(user?.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <NoData colspan={6} />
                </tr>
              )}
            </tbody>
          </table>
          <PaginationSection
            arrayOfPages={usersQuery?.arrayOfPages}
            query={usersQuery}
            page="users"
          />
        </div>
      )}

      <DeleteConfirmation
        deleteItem={"User"}
        deleteFun={deleteUser}
        toggleShow={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default UsersList;
