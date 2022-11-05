import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const dataDetails = await data.json();
    setDetails(dataDetails);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return <div>co do chuja {details.title}</div>;
}

const DetailsWraper = styled.div``;

export default Recipe;
