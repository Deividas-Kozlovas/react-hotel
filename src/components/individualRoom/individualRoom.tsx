import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import { GET_ROOM } from "../../actions/roomActions";
import { Card, Badge, Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import ReservationFormComponent from "../forms/reservationFormComponent/reservationFormComponent";

const IndividualRoomComponent = () => {
  const { id } = useParams();
  const { state, dispatch, getRooms } = useRoomContext();

  useEffect(() => {
    const fetchRoomData = async () => {
      if (state.rooms.length === 0) {
        await getRooms(); // Fetch rooms if not already in state
      }
    };

    fetchRoomData();
  }, [state.rooms.length]);

  useEffect(() => {
    if (id && state.rooms.length > 0) {
      const room = state.rooms.find((room) => room.id === id);
      if (room) {
        dispatch({ type: GET_ROOM, payload: id });
      } else {
        console.error("Room not found with id:", id);
      }
    }
  }, [state.rooms, id, dispatch]);

  if (state.loading) {
    return <ClipLoader size={50} color="#007bff" />;
  }

  if (!state.currentRoom) {
    return (
      <Container
        className="mt-4 d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Row>
          <Col className="text-center">
            <div className="fw-bold fs-4">Room not found</div>
          </Col>
        </Row>
      </Container>
    );
  }

  const room = state.currentRoom;

  return (
    <div className="container mt-4">
      <Container>
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
          </Card.Body>
        </Card>
        <ReservationFormComponent room_id={id ?? ""} />
      </Container>
    </div>
  );
};

export default IndividualRoomComponent;
