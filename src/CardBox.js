import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiTwitter } from "react-icons/tfi";
import moment from "moment";
import { Box, styled } from "@mui/system";
import { Grid } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";

// Styled component for customizing the Card
const StyledCard = styled(Card)({
  maxWidth: 345,
  marginBottom: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(5px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "10px",
});

const CardBox = () => {
  // State variables
  const [news, setNews] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    // Fetch news data when component mounts
    fetchNews();
  }, []);

  const fetchNews = () => {
    // Fetch news from the server using Axios
    axios
      .get("http://localhost:5000/api/related")
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  const handleExpandClick = () => {
    // Toggle the expanded state
    setExpanded(!expanded);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      overflow="auto"
      style={{ background: "linear-gradient(to bottom right, #74ebd5, #9face6)" }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {news.length > 0 ? (
          // Render each news item as a Card
          news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <StyledCard>
                <CardHeader
                  title={<TfiTwitter size="30px" color="yellow" />}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  subheader={moment(item.timestamp).startOf("hour").fromNow()}
                />
                <CardContent>
                  <Typography>{item.text}</Typography>
                  <Button
                    variant="contained"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      marginTop: "10px",
                      backgroundColor: "#FF4081",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
                      },
                    }}
                  >
                    READ MORE
                  </Button>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        ) : (
          // Display a message if no news is available
          <Typography>No news available</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CardBox;
