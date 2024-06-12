import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import FeturedTest from "./FeturedTest/FeturedTest";
import PersonalizedRecommendations from "./PersonalizedRecommendations/PersonalizedRecommendations";
import Promotion from "./Promotion/Promotion";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Helmet>
        <title>Diagno Care</title>
      </Helmet>
      <FeturedTest></FeturedTest>
      <Promotion></Promotion>
      <PersonalizedRecommendations></PersonalizedRecommendations>
    </div>
  );
};

export default Home;
