import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { route } from "../../../Routes";
import api from "../../../Config/Api";
import ImageGallery from "react-image-gallery";
import { Container } from "react-bootstrap";
import "./Homepage.scss";

export default function Homepage() {
  const images = [
    {
      original:
        "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_3.jpg?v=6655",
      thumbnail:
        "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_3.jpg?v=6655",
    },
    {
      original:
        "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_2.jpg?v=6655",
      thumbnail:
        "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_2.jpg?v=6655",
    },
    {
      original:
        "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=6655",
      thumbnail:
        "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=6655",
    },
  ];
  return (
    <>
      <ImageGallery
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={true}
        showNav={false}
      />
      <Link to={route.about}>About</Link>
    </>
  );
}
