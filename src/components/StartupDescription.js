import React from 'react';
import { Typography } from '@material-ui/core';
import colors from '../constants/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	typo: { margin: theme.spacing(5), fontSize: theme.spacing(3) }
}));
export default function Description() {
	const classes = useStyles();
	return (
		<Typography align="center" color={colors.cinnabar} className={classes.typo}>
			Please type in City and Cuisine
		</Typography>
	);
}
