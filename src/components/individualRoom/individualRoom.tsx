import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import { GET_ROOM } from "../../actions/roomActions";
import { Card, Button, Badge } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import ReservationFormComponent from "../forms/reservationFormComponent/reservationFormComponent";

const IndividualRoomComponent = () => {
  const { id } = useParams();
  const { state, dispatch } = useRoomContext();

  useEffect(() => {
    if (id) {
      dispatch({ type: GET_ROOM, payload: id });
    }
  }, [id, dispatch]);

  if (state.loading) {
    return <ClipLoader size={50} color="#007bff" />;
  }

  if (!state.currentRoom) {
    return <div>Room not found</div>;
  }

  const room = state.currentRoom;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm border-0">
        <Card.Img
          variant="top"
          src={`http://localhost:3000/${room.room_image}`}
          alt={`Room ${room.number}`}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="fw-bold">Room {room.number}</Card.Title>
          <Card.Text>
            <span className="fw-semibold">Capacity:</span> {room.capacity}{" "}
            guests
            <br />
            <span className="fw-semibold">Floor:</span> {room.floor}
            <br />
            <span className="fw-semibold">Price:</span> ${room.pricing} per
            night
          </Card.Text>
          <Card.Text>
            <span className="fw-semibold">Amenities:</span> <br />
            <Badge bg={room.wifi ? "success" : "danger"}>
              WiFi {room.wifi ? "Yes" : "No"}
            </Badge>{" "}
            <Badge bg={room.parking ? "success" : "danger"}>
              Parking {room.parking ? "Yes" : "No"}
            </Badge>{" "}
            <Badge bg={room.breakfast ? "success" : "danger"}>
              Breakfast {room.breakfast ? "Yes" : "No"}
            </Badge>
          </Card.Text>
          <Button variant="success" className="w-100">
            Confirm Booking
          </Button>
        </Card.Body>
      </Card>
      <ReservationFormComponent room_id={id ?? ""} />
    </div>
  );
};

export default IndividualRoomComponent;
