import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import { GET_ROOM } from "../../actions/roomActions";

const IndividualRoomComponent = () => {
  const { id } = useParams();
  const { state, dispatch } = useRoomContext();

  useEffect(() => {
    if (id) {
      dispatch({ type: GET_ROOM, payload: id });
    }
  }, [id, dispatch]);

  if (!state.currentRoom) {
    return <div>Room not found</div>;
  }

  const room = state.currentRoom;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <img
          src={room.room_image}
          className="card-img-top"
          alt={`Room ${room.number}`}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h2 className="card-title fw-bold">Room {room.number}</h2>
          <p className="card-text">
            <span className="fw-semibold">Capacity:</span> {room.capacity}{" "}
            guests <br />
            <span className="fw-semibold">Floor:</span> {room.floor} <br />
            <span className="fw-semibold">Price:</span> ${room.pricing} per
            night
          </p>
          <p className="card-text">
            <span className="fw-semibold">Amenities:</span> <br />
            <span className={`badge ${room.wifi ? "bg-success" : "bg-danger"}`}>
              WiFi {room.wifi ? "Yes" : "No"}
            </span>{" "}
            <span
              className={`badge ${room.parking ? "bg-success" : "bg-danger"}`}
            >
              Parking {room.parking ? "Yes" : "No"}
            </span>{" "}
            <span
              className={`badge ${room.breakfast ? "bg-success" : "bg-danger"}`}
            >
              Breakfast {room.breakfast ? "Yes" : "No"}
            </span>
          </p>
          <button className="btn btn-success w-100">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualRoomComponent;
