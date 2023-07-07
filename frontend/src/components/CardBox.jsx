import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiTwitter } from "react-icons/tfi";
import moment from "moment";
import { Box, styled } from "@mui/system";
import { BsClock } from "react-icons/bs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import "../css/CardBox.css";

// Styled component for customizing the Card
const StyledCard = styled(Card)({
  marginBottom: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(5px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "10px",
  width: "375px", // Set a constant width for the card
});
// Styled component for customizing the CardContent
const CustomCardContent = styled(CardContent)({
  height: "200px", // Set a fixed height for the card content
  overflow: "hidden", // Hide any overflow content
});

const CustomCardContent2 = styled(CardContent)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "35px",
  overflow: "hidden",
});

const CardBox = () => {
  // State variables
  const [news, setNews] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token);
  // State variables
  useEffect(() => {
    // Fetch news data when component mounts
    fetchNews();
  }, []);

  const fetchNews = () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Create the Axios request config with the token in the headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch news from the server using Axios with the token included in the headers
    axios
      .get("http://localhost:4000/api/news/related", config)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      overflow="auto"
      paddingTop="100px" // Add padding top to accommodate the navbar height
      style={{
        background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
      }}
    >
      <div className="card-container">
        {news.length > 0 ? (
          // Render each news item as a Card
          news.map((item) => (
            <div className="card-item" key={item.id}>
              <StyledCard>
                <CardHeader
                  title={<TfiTwitter size="30px" color="black" />}
                  action={
                    <Box display="flex" alignItems="center">
                      <BsClock
                        size={15}
                        color="textSecondary"
                        style={{ marginRight: "6px", marginTop: "7px" }}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginTop: "12px" }}
                      >
                        {moment(item.timestamp).startOf("hour").fromNow()}
                      </Typography>
                    </Box>
                  }
                />
                <CustomCardContent>
                  <Typography>{item.text}</Typography>
                </CustomCardContent>
                <CustomCardContent2>
                  {item.class && <Typography>{item.class}</Typography>}
                </CustomCardContent2>
                <CardActions disableSpacing>
                  <Button
                    variant="contained"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      marginTop: "5px",
                      marginBottom: "5px",
                      backgroundColor: "#FF4081",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(to bottom right, #74ebd5, #9face6)",
                      },
                    }}
                  >
                    READ MORE
                  </Button>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </div>
          ))
        ) : (
          // Display a message if no news is available
          <Typography>No news available</Typography>
        )}
      </div>
    </Box>
  );
};

export default CardBox;
