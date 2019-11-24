import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(1),
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const { text } = props;
  return (
    <div className={classes.search}>
      <InputBase
        placeholder={text}
        classes={{
          input: classes.inputInput,
        }}
        onChange={event => props.setState(event.target.value)}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
