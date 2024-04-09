import {useState} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Caroussel from "./Caroussel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

/* eslint-disable react/react-in-jsx-scope */
const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const results = useQuery(["details", id], fetchPet);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Caroussel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={()=>setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {pet.name} ?</h1>
                  <div className="buttons">
                    <button>Yes</button>
                    <button onClick={()=>setShowModal(false)}>No</button>
                    </div>
                    </div>
              </Modal>
            ) :
              null
          }
        </h2>
      </div>
    </div>
  );
};
function ErrorBoundaryDetails(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default ErrorBoundaryDetails;
