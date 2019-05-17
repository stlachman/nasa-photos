import axios from 'axios';

export const INITIALIZE_REQUEST = 'INITIALIZE_REQUEST';
export const SUCCESSFUL_REQUEST = 'SUCCESSFUL_REQUEST';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const getPhoto = (date) => (dispatch) => {
	dispatch({ type: INITIALIZE_REQUEST });

	axios
		.get(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_SECRET_NAME}`)
		.then((res) => dispatch({ type: SUCCESSFUL_REQUEST, payload: res.data }))
		.catch((err) => dispatch({ type: FAILED_REQUEST, payload: err.response }));
};
