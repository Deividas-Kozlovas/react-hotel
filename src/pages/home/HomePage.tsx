import RoomCardComponent from "../../components/roomsTable/roomsTable";
import { useUserContext } from "../../context/UserContext";

const HomePage = () => {
  const { state } = useUserContext();

  console.log(state.user);
  return (
    <div>
      <RoomCardComponent />
    </div>
  );
};

export default HomePage;
