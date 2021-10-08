import { React, useState, useEffect } from "react";
import axios from "axios";
import "../styles/anime.css";
import { useLocation } from "react-router-dom";
import firebase from "firebase";
import Button from "@mui/material/Button";

function Anime(props) {
  const location = useLocation();
  let data = location.state.data;
  console.log(data);
  return (
    <div className="anime-style">
      <Button
        style={{ position: "fixed", top: "10px", right: "30px" }}
        variant="contained"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </Button>
      <h1 className="space">{data.titles.en}</h1>
      <img src={data.cover_image} alt="" />
      <br />
      <a className="space" href={data.trailer_url} target="_blank">
        {data.trailer_url === undefined
          ? "No trailer URL found"
          : data.trailer_url}
      </a>
      <div className="space">
        {data.genres.map((str) => {
          return <span className="genres">{str}</span>;
        })}
      </div>
      <p className="space">{data.descriptions.en}</p>
      <p className="space">
        <strong>Year:</strong> {data.season_year}
      </p>
      <p className="space">
        <strong>Total Episodes:</strong> {data.episodes_count}
      </p>
    </div>
  );
}

export default Anime;
