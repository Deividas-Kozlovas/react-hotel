import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";

const RoomCardComponent = () => {
  const { state } = useRoomContext();
  const navigate = useNavigate();

  if (!state.rooms || state.rooms.length === 0) {
    return (
      <div>
        <p>No rooms available</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {state.rooms.map((room) => (
        <div key={room.id} className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <img
              src={room.room_image}
              className="card-img-top"
              alt={`Room ${room.number}`}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title fw-bold">Room {room.number}</h5>
              <p className="card-text mb-2">
                <span className="fw-semibold">Capacity:</span> {room.capacity}{" "}
                guests <br />
                <span className="fw-semibold">Floor:</span> {room.floor} <br />
                <span className="fw-semibold">Price:</span> ${room.pricing} per
                night
              </p>
              <p className="card-text">
                <span className="fw-semibold">Amenities:</span> <br />
                <span
                  className={`badge ${room.wifi ? "bg-success" : "bg-danger"}`}
                >
                  WiFi {room.wifi ? "Yes" : "No"}
                </span>{" "}
                <span
                  className={`badge ${
                    room.parking ? "bg-success" : "bg-danger"
                  }`}
                >
                  Parking {room.parking ? "Yes" : "No"}
                </span>{" "}
                <span
                  className={`badge ${
                    room.breakfast ? "bg-success" : "bg-danger"
                  }`}
                >
                  Breakfast {room.breakfast ? "Yes" : "No"}
                </span>
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate(`/room/${room.id}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomCardComponent;
