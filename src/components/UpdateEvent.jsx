
import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
// import { setErrors, updateEventReducer } from "../redux/slices/eventsSlice";
import { useDispatch } from "react-redux";
import { editEvent, getallEvents } from "../service/api";

export default function UpdateEvent() {
  const navigate = useNavigate();
  const param = useParams();
 

  const [event, setEvent] = useState({
    // id: param.id ,
    // name: "",
    // price: 0,
    // img: "",
    // like: 0,
    // quantity: 0,
    // description: "",
    id: param.id,
    name: "",
    description: "",
    img: "",
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false
  });
  const { id, name, description, img, price, nbTickets, nbParticipants,like } = event;
  
  useEffect(() => {
    getEvent();
  }, []);
  const dispatch = useDispatch();

  const getEvent = async () => {
    const response = await getallEvents(param.id);
    setEvent(response.data);
  };
  const onValueChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const onFileHandle = (e) => {
    console.log(e.target.files);
    setEvent({ ...event, [e.target.name]: e.target.files[0].name });
  };
  
  const UpdateEv = async () => {
    try {
      const response = await editEvent(param.id, event);
      dispatch(updateEventReducer(eventResult.data));
    } catch (error) {
      navigate("/events");

    }
  };
  // const UpdateEv = async () => {
  //   try {
  //     const response = await editEvent(param.id, event);
  //     navigate("/events");
  //   } catch (error) {
  //     console.error("Une erreur est survenue lors de la mise à jour de l'événement :", error);
  //     // Vous pouvez également dispatcher une action pour gérer l'erreur si nécessaire
  //   }
  // };
  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <h2>Modify Your {name} Event</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
                onChange={(e) => onValueChange(e)}
              name="name"
              value={name}
              type="text"
              placeholder="Enter a Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description "
                onChange={(e) => onValueChange(e)}
              name="description"
              value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
                onChange={(e) => onValueChange(e)}
              name="price"
              value={price}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Control
              type="number"
                onChange={(e) => onValueChange(e)}
              name="nbTickets"
              value={nbTickets}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
                onChange={(e) => onFileHandle(e)}
              name="img"
            />
          </Form.Group>
          <Button variant="primary" onClick={()=>UpdateEv()}>Update Event</Button>
          <Button onClick={() => navigate("/events")} variant="secondary">
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
}