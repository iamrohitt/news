import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiTwitter } from "react-icons/tfi";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { Box } from "@mui/material";

const StyledCard = styled(Card)({
  maxWidth: 345,
  marginBottom: 16,
});

const CardBox = () => {
  const [news, setNews] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
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
    setExpanded(!expanded);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Use minHeight instead of height
      overflow="auto" // Enable vertical scrolling
    >
      <Box flexDirection="column" alignItems="center">
        {news.map((item) => (
          <StyledCard key={item.id}>
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
              <div>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button>READ MORE</button>
                </a>
              </div>
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
        ))}
      </Box>
    </Box>
  );
};

export default CardBox;
