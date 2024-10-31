import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material";

const Slick = styled(Slider)(({ theme }) => ({
  ".slick-slide": {
    "> div": {
      display: "flex",
    },
  },
}));

export default Slick;
