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
import Button from "@mui/material/Button";
import { FaShare } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import ShareButton from "./ShareButtonComponent";
import "../css/CardBox.css";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)({
  marginBottom: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(5px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "10px",
  width: "375px",
});

const CustomCardContent = styled(CardContent)({
  height: "200px",
  overflow: "hidden",
});

const CustomCardContent2 = styled(CardContent)(({ textLength }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "35px",
  overflow: "hidden",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: textLength ? `${(textLength / 35) * 100}%` : "0%",
    height: "100%",
    backgroundColor: "green",
    opacity: 0.3,
    zIndex: -1,
  },
}));

const CardBoxProfile = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReadMore, setShowReadMore] = useState(true);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
  const decoded = parseJwt(token);
  const userId = decoded.id;
  const [filterClassName, setFilterClassName] = useState("All"); // Set "All" as the default option

  const handleFilterChange = (event) => {
    setFilterClassName(event.target.value);
    setStart(0);
    setEnd(10);
  };

  const fetchNews = async (className) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/likedNews`,
        config
      );
      console.log(response.data["relatedNews"]);
      if (response.data["relatedNews"].length > 0) {
        const updatedNews = response.data["relatedNews"].map((item) => ({
          ...item,
          upvoted: item.upvotedBy.includes(userId),
        }));
        console.log(updatedNews);
        setNews([...updatedNews]);
        // Increment start and end values for the next page
        setStart((prevStart) => prevStart + response.data.length);
        setEnd((prevEnd) => prevEnd + response.data.length);
      } else {
        setShowReadMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpvote = async (itemId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/news/news/${itemId}/upvote`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Find the updated news item in the response
      const updatedNews = news.map((item) => {
        if (item._id === itemId) {
          // If the item was already upvoted, decrease the count and reset the upvoted flag
          if (item.upvoted) {
            return {
              ...item,
              upvotes: item.upvotes - 1,
              upvoted: false,
            };
          }
          // Otherwise, increase the count and set the upvoted flag
          return {
            ...item,
            upvotes: item.upvotes + 1,
            upvoted: true,
          };
        }
        return item;
      });

      setNews(updatedNews);
    } catch (error) {
      console.error("Error upvoting news:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchNews(filterClassName); // Fetch news after setting the default option
    }
  }, [token, navigate, filterClassName]);

  const filterDivStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };
  const [showShareButton, setShowShareButton] = useState(false);

  const handleClick = () => {
    if (showShareButton) {
      setShowShareButton(false);
    } else {
      setShowShareButton(true);
    }
  };

  return (
    <div className="bgbg">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        overflow="auto"
        paddingTop="100px"
        style={{
          background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
        }}
      >
        <div style={filterDivStyle}>
          <h2>Your Liked News Posts</h2>
        </div>
        <div className="card-container">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : news.length > 0 ? (
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
                    <Typography align="justify">{item.text}</Typography>
                  </CustomCardContent>
                  <CustomCardContent2
                    textLength={item.class ? item.class.length : 0}
                  >
                    {item.class && <Typography>{item.class}</Typography>}
                  </CustomCardContent2>
                  <CardActions
                    disableSpacing
                    sx={{ justifyContent: "space-between" }}
                  >
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
                    <div>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleUpvote(item._id)}
                        color={item.upvoted ? "error" : "inherit"}
                      >
                        {item.upvotes}
                        <FavoriteIcon />
                      </IconButton>
                      <span>
                        <IconButton aria-label="share" onClick={handleClick}>
                          <FaShare size={24} />
                        </IconButton>

                        {showShareButton && (
                          <IconButton
                            aria-label="share"
                            style={{ animation: "fade-in 0.5s" }}
                          >
                            <ShareButton url={item.url} title={item.text} />
                          </IconButton>
                        )}
                      </span>
                    </div>
                  </CardActions>
                </StyledCard>
              </div>
            ))
          ) : (
            <Typography>No news available</Typography>
          )}
        </div>
      </Box>
    </div>
  );
};

export default CardBoxProfile;
