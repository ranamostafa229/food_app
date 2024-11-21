/* eslint-disable react/prop-types */
import FillRecipesHeader from "../../shared/components/FillRecipesHeader/FillRecipesHeader";
import Header from "../../shared/components/Header/Header";

const Home = ({ loginData }) => {
  return (
    <div className="d-flex flex-column gap-3">
      <Header
        title={`Welcome ${loginData?.userName} `}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="mx-2">
        <FillRecipesHeader action={"Fill"} title={"Fill"} />
      </div>
    </div>
  );
};

export default Home;
