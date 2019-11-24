import React from 'react';
import AppBar from './components/AppBar';
import SearchBar from './components/SearchBar';
import RestaurantCard from './components/RestaurantCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import axios from 'axios';
import keys from './constants/keys';
import Description from './components/StartupDescription';
import Loading from './components/Loading';
import colors from './constants/colors';

const zomatoAPIKey = keys.zomatoAPIKey;

const useStyles = makeStyles((theme) => ({
	searchElements: {
		display: 'flex',
		margin: theme.spacing(7, 0, 0, 0)
	},
	card: {
		flexGrow: 1,
		marginTop: theme.spacing(5)
	},
	button: {
		color: colors.cinnabar
	}
}));

const getCuisine = async (id) => {
	return await axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id=' + id, {
		headers: { 'user-key': zomatoAPIKey }
	});
};

const getRestaurantQuery = async (cityId, cuisineId) => {
	return await axios.get(
		'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityId + '&entity_type=city&cuisines=' + cuisineId,
		{ headers: { 'user-key': zomatoAPIKey } }
	);
};

const getRestaurants = async (city, cuisineName, setRestaurants, setLoading) => {
	console.log('getRestaurants', city, cuisineName);
	setLoading(true);
	const cityData = await axios.get('https://developers.zomato.com/api/v2.1/cities?q=' + city, {
		headers: { 'user-key': zomatoAPIKey }
	});
	console.log('cityData', cityData);
	var cityIds = [];
	cityData.data.location_suggestions.forEach((data) => {
		cityIds.push(data['id']);
	});

	var cuisineId = undefined;

	cityIds.forEach(async (id) => {
		const cuisine = await getCuisine(id);
		cuisine.data.cuisines.forEach((type) => {
			if (type.cuisine.cuisine_name === cuisineName) {
				cuisineId = type.cuisine.cuisine_id;
			}
		});
		var restaurants = [];
		if (cuisineId) {
			cityIds.forEach(async (cityId) => {
				const restaurant = await getRestaurantQuery(cityId, cuisineId);
				console.log('restaurants', restaurant);
				var res = restaurant.data.restaurants.map((restaurant) => {
					return {
						name: restaurant.restaurant.name,
						address: restaurant.restaurant.location.address,
						area: restaurant.restaurant.location.locality,
						city: restaurant.restaurant.location.city,
						cuisines: restaurant.restaurant.cuisines,
						rating: restaurant.restaurant.user_rating.aggregate_rating,
						photos: restaurant.restaurant.photos
							? restaurant.restaurant.photos.map((photo) => photo.photo.url)
							: undefined
					};
				});
				restaurants.push(...res);
				setRestaurants(restaurants);
				setLoading(false);
			});
		}
	});
};

export default function App() {
	const classes = useStyles();
	const [ restaurants, setRestaurants ] = React.useState(null);
	const [ city, setCity ] = React.useState('');
	const [ cuisine, setCuisine ] = React.useState('');
	const [ loading, setLoading ] = React.useState(false);
	console.log('restaurants', restaurants);

	return (
		<React.Fragment>
			<AppBar />
			<div className={classes.searchElements}>
				<SearchBar text="City" setState={setCity} />
				<SearchBar text="Cuisine" setState={setCuisine} />
				<div>
					<Button
						className={classes.button}
						onClick={() => getRestaurants(city, cuisine, setRestaurants, setLoading)}
					>
						<SearchIcon />
					</Button>
				</div>
			</div>
			{loading ? (
				<Loading />
			) : !restaurants ? (
				<Description />
			) : (
				<div className={classes.card}>
					<Grid container spacing={2}>
						{restaurants.map((restaurant, key) => {
							return (
								<Grid item xs={6} key={key}>
									<RestaurantCard {...restaurant} />
								</Grid>
							);
						})}
					</Grid>
				</div>
			)}
		</React.Fragment>
	);
}
