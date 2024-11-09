/* eslint-disable react/prop-types */
import Header from "../../shared/components/Header/Header";

const Home = ({ loginData }) => {
  return (
    <div>
      <Header
        title={`Welcome ${loginData?.userName} `}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
    </div>
  );
};

export default Home;
