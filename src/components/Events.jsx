import  Container  from "react-bootstrap/Container"
import Event from "./Event"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"

import { useEffect, useState } from "react"
import { deleteEvent,getallEvents } from "../service/api"
import { useDispatch, useSelector } from "react-redux";
import {deleteEventReducer, fetchEvents } from "../redux/slices/eventsSlice"

function Events() {

    

  const  [eventsData, setEvents] = useState([])
    const [isShowAlert , setIsShowAlert] = useState(false)
    const [isWelcome, setIsWelcome] = useState(true);
    const dispatch = useDispatch() ; 
 const  events= useSelector((d)=>d.events.events) ; 
    const fetchEvents = async ()=>{

      const eventResult = await getallEvents();

      setEvents(eventResult.data)
    }

    // useEffect(()=>{
    //   fetchEvents()
    // })

    useEffect(() => {
      dispatch(fetchEvents());
    } ,[dispatch]);
  
     
     
  
    const deleteEv = async (eventId) => {
      await deleteEv(eventId);
      dispatch(deleteEventReducer(eventId));
    };
    
    useEffect(() => {
      const isWelcomeTimeout = setTimeout(() => {
        setIsWelcome(false);
      }, 3000);
  
      return () => {
        clearTimeout(isWelcomeTimeout);
      };
    }, []);
    const showAlert = ()=>{

        setIsShowAlert(true)

        setTimeout(()=>
        setIsShowAlert(false)
        , 2000 )
    }
    // const deleteEv2 = async (id) => {
    //   const result = window.confirm("Are you sure you want to delete?");
      
    //   if (result) {
    //     deleteEvent(id)
    //     .then(()=>{
    //       console.log("Événement supprimé avec succès");
    //     })
    //     .catch((error)=>{
    //       console.error("Erreur lors de la suppression de l'événement :", error);
    //     })
    //   }
    // };
      
    
  return (


    <>
 {isWelcome && (
        <Alert style={{ width: "70%", marginBottom: 40 }} variant="success">
          Hey welcome to Esprit Events
        </Alert>
      )}
<Container>

    <Row>
   {eventsData.map((event,index)=>(

      <Event  key={index} event={event} showAlert={showAlert} deleteEv={deleteEv} />
           
   ))}

</Row>




{isShowAlert &&(<Alert variant="success">
      <Alert.Heading>You are booked an event</Alert.Heading>
      
    </Alert>) }

</Container>
    
    </>
  );
}

export default Events