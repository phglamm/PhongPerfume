import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../Config/Api";
import { Container } from "react-bootstrap";

export default function BrandDetail() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [brandImages, setBrandImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchBrandDetail() {
      try {
        const response = await api.get(`Perfume/PerfumeWithBrandName/${id}`);
        console.log(response.data);
        setBrand(response.data);
        setBrandImages(response.data.perfume_images);
        console.log(response.data.perfume_images);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setLoading(false);
      }
    }
    fetchBrandDetail();
  }, [id]);
  return <Container>BrandDetail</Container>;
}
