import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Swipeable from './Swipable';
import colors from '../constants/colors';

const useStyles = makeStyles((theme) => ({
	card: {
		padding: theme.spacing(0.5),
		width: 550,
		height: 'auto',
		alignContent: 'center'
	},
	media: {
		margin: theme.spacing(0.5)
	},
	chip: {
		margin: theme.spacing(2, 2, 0, 0)
	},
	header: {
		color: colors.cinnabar
	}
}));

export default function RestaurantCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardHeader title={props.name} subheader={props.city} className={classes.header} />
			<CardMedia className={classes.media}>
				<Swipeable url={props.photos} />
			</CardMedia>
			<CardContent>
				<Typography variant="body2" color="textPrimary" component="p">
					<b>Address:</b> {props.address}
				</Typography>
				{props.cuisines.split(', ').map((cuisine, index) => {
					return <Chip className={classes.chip} key={index} label={cuisine} />;
				})}
			</CardContent>
		</Card>
	);
}
