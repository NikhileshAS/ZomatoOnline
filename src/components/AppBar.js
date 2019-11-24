import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import colors from '../constants/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	appBar: { background: colors.cinnabar }
}));

export default function Bar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit">
						Restaurant Search
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
