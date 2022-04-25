import * as React from "react";
import { DataStore } from "aws-amplify";
import Card from "@mui/material/Card";
import { IconButton, Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Grow from "@mui/material/Grow";
import { useRouter } from "next/router";
import { MarvelCharacters } from "../../models";

const CharacterCard = (props) => {
  const [favorite, setFavorite] = React.useState(false);
  const { character, page, favoritesList, user } = props;
  const router = useRouter();
  let cardTitle = "";
  let width = "200";

  React.useEffect(() => {
    if (favoritesList && favoritesList.some((fav) => fav.id === character.id)) {
      setFavorite(!favorite);
    }
  }, []);

  if (page === "characters") {
    cardTitle = character.name;
  } else if (page === "comics") {
    cardTitle = character.title;
  }

  const handleSetFavorite = async () => {
    setFavorite(!favorite);

    const newCharacterToSave = {
      comics: JSON.stringify(character.comics),
      description: character.description,
      events: JSON.stringify(character.events),
      charID: parseInt(character.id),
      modified: character.modified,
      name: character.name,
      resourceURI: character.resourceURI,
      series: JSON.stringify(character.series),
      stories: JSON.stringify(character.stories),
      thumbnail: JSON.stringify(character.thumbnail),
      urls: JSON.stringify(character.urls),
    };

    try {
      let favorites = await DataStore.query(MarvelCharacters);
      // save or delete character
      let exists = favorites.some((fav) => fav.id === character.id);
      if (exists) {
        await DataStore.delete(MarvelCharacters, character.id);
        console.log("removed character from favorites");
      } else {
        await DataStore.save(new MarvelCharacters(newCharacterToSave));
        console.log("created new favorite character");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleInfoClick = () => {
    let id = character.charID;
    if (!id) id = character.id;
    router.push(`/${page}/${id}`);
  };

  // React.useEffect(() => {
  //     favorites.indexOf(cardInfo.id) !== -1 ? setFavorite(true) : setFavorite(false)
  //   }, [cardInfo.id, favorites])

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: 1,
        border: 2,
        width: width,
        maxWidth: 200,
        backgroundColor: "#222",
        color: "white",
        borderColor: "black",
      }}
    >
      <CardMedia
        component="img"
        alt="Marvel Character"
        height="200"
        image={
          character.thumbnail.path +
          "/standard_xlarge." +
          character.thumbnail.extension
        }
      />
      <CardContent>
        <Typography>{cardTitle}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {user?.username === character.owner &&
          <IconButton sx={{ p: 0, m: 0 }} onClick={handleSetFavorite}>
            <Grow
              in={favorite}
              mountOnEnter
              unmountOnExit
              {...(favorite ? { timeout: 1500 } : {})}
              style={{ position: "absolute", marginLeft: "1.5rem" }}
            >
              <FavoriteIcon sx={{ color: "#F0131E" }} />
            </Grow>
            <Grow
              in={!favorite}
              mountOnEnter
              unmountOnExit
              {...(!favorite ? { timeout: 1500 } : {})}
              style={{ position: "absolute", marginLeft: "1.5rem" }}
            >
              <FavoriteIcon sx={{ color: "#555" }} />
            </Grow>
          </IconButton>
        }
        <IconButton sx={{ p: 0, color: "#F0131E" }} onClick={handleInfoClick}>
          {character.name && <PermIdentityIcon />}
          {character.title && <MenuBookIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
