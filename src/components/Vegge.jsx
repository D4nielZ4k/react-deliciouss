import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Vegge() {
  const [vegge, setVegge] = useState([]);

  useEffect(() => {
    getVegge();
  }, []);

  const getVegge = async () => {
    const check = localStorage.getItem("vegge");
    if (check) {
      setVegge(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("vegge", JSON.stringify(data.recipes));
      setVegge(data.recipes);

      console.log(data.recipes.title);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our veggetarian Picks</h3>

        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {vegge.map((recipes) => {
            return (
              <SplideSlide key={recipes.id}>
                <Card>
                  <Link to={"recipe/" + recipes.id}>
                    <p>{recipes.title}</p>
                    <img src={recipes.image} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0));
`;
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
export default Vegge;
