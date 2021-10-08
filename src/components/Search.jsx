import axios from "axios";
import "../styles/search.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import firebase from "firebase";

function Search() {
  const [selectedOption, setSelectedOption] = useState("genres");
  const [inputValue, setInputValue] = useState("");
  const [dataFetched, setDataFetched] = useState([]);

  let getAnimes = function () {
    let splitInput = inputValue.split(" ");
    let correctInput =
      splitInput.length > 1
        ? splitInput.reduce((total, str) => (total += "%20" + str))
        : splitInput;
    let url =
      "https://api.aniapi.com/v1/anime" +
      "?" +
      selectedOption +
      "=" +
      correctInput +
      "&nsfw=false";
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        let data = res.data.data.documents;
        if (selectedOption === "descriptions") {
          data = data.filter((anime) => {
            return anime.descriptions.en.includes(inputValue);
          });
          setDataFetched(data);
        } else if (data !== undefined) {
          setDataFetched(data);
          console.log(data);
        } else {
          setDataFetched([]);
        }
      })
      .catch((err) => console.log(err));
  };

  function AnimesFound(props) {
    let { dataFetched } = props;
    console.log(dataFetched);

    let animesDiv =
      dataFetched !== undefined ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {dataFetched.map((anime) => {
            return (
              <div
                style={{
                  border: "2px solid #4267B2",
                  margin: "10px",
                  padding: "0 0 20px 0",
                  textAlign: "center",
                }}
              >
                <h3 style={{ color: "#4267B2" }}>{anime.titles.en}</h3>
                <Link
                  to={{
                    pathname: "/anime/" + anime.id,
                    state: { data: anime },
                  }}
                >
                  <img src={anime.cover_image} alt="anime" />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Sorry! We were unable to find anything. Search Again!</div>
      );

    return animesDiv;
  }

  return (
    <div className="search-window">
      <Button
        style={{ position: "fixed", top: "10px", right: "30px" }}
        variant="contained"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </Button>
      {/* <select
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
      >
        <option value="genres">Genre</option>
        <option value="title">Title</option>
        <option value="descriptions">Description</option>
      </select> */}

      {/* <input
        id="text-input"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        required="true"
      /> */}

      <FormControl style={{ display: "inline-block", margin: "10px 20px" }}>
        <InputLabel id="demo-simple-select-label">By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          label="Age"
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <MenuItem value="genres">Genres</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="descriptions">Description</MenuItem>
        </Select>
      </FormControl>

      <TextField
        style={{ margin: "10px 20px" }}
        label="Search..."
        variant="standard"
        id="text-input"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        style={{ margin: "10px 20px" }}
        className="space"
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          getAnimes(e.target.value);
        }}
      >
        Search
      </Button>

      <div id="searchedData">
        <AnimesFound dataFetched={dataFetched} />
      </div>
    </div>
  );
}

export default Search;
