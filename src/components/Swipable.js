import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center'
	},
	image: {
		width: '65%',
		height: '65%'
	}
}));

export default function Swipeable(props) {
	const classes = useStyles();
	const { url } = props;
	return (
		<div className={classes.root}>
			<Slide duration={5000} transitionDuration={500} indicators={true} arrows={false}>
				{url.map((url, index) => {
					return <img key={index} className={classes.image} src={url} alt="Restaurant" />;
				})}
			</Slide>
		</div>
	);
}
