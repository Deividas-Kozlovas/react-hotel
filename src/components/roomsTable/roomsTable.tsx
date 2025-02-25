import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const RoomCardComponent = () => {
  const { state } = useRoomContext();
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="g-4 pt-5">
        {state.loading ? (
          <Col
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px", height: "300px" }}
          >
            <ClipLoader size={50} color="#007bff" loading={state.loading} />
          </Col>
        ) : (
          state.rooms.map((room) => (
            <Col key={room.id} md={6} lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/${room.room_image}`}
                  alt={`Room ${room.number}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Room {room.number}
                  </Card.Title>
                  <Card.Text className="mb-2">
                    <span className="fw-semibold">Capacity:</span>{" "}
                    {room.capacity} guests <br />
                    <span className="fw-semibold">Floor:</span> {room.floor}{" "}
                    <br />
                    <span className="fw-semibold">Price:</span> ${room.pricing}{" "}
                    per night
                  </Card.Text>
                  <Card.Text>
                    <span className="fw-semibold">Amenities:</span> <br />
                    <Badge
                      bg={room.wifi ? "success" : "danger"}
                      className="me-2"
                    >
                      WiFi {room.wifi ? "Yes" : "No"}
                    </Badge>
                    <Badge
                      bg={room.parking ? "success" : "danger"}
                      className="me-2"
                    >
                      Parking {room.parking ? "Yes" : "No"}
                    </Badge>
                    <Badge bg={room.breakfast ? "success" : "danger"}>
                      Breakfast {room.breakfast ? "Yes" : "No"}
                    </Badge>
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => navigate(`/room/${room.id}`)}
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default RoomCardComponent;
