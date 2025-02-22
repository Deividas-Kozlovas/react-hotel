import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useRoomContext } from "../../context/RoomContext";

const HomePage = () => {
  const { state: userState } = useUserContext(); // Renaming state to userState
  const { state: roomState } = useRoomContext(); // Renaming state to roomState

  console.log(roomState.rooms);

  return userState.token ? (
    <div>
      <div>Homepage</div>
      <div>
        {roomState.rooms && roomState.rooms.length > 0 ? (
          <div>{roomState.rooms.length} rooms available.</div>
        ) : (
          <div>No rooms available.</div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default HomePage;
