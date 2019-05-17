import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from 'react-calendar';
import { getPhoto } from '../actions';

const Container = styled.div`
	margin: 0 auto;
	max-width: 1200px;
	text-align: center;
`;

class PhotoContainer extends React.Component {
	state = {
		date: new Date()
	};

	componentDidMount() {
		this.props.getPhoto(moment(this.state.date).format('YYYY-MM-DD'));
	}

	onChange = (date) => {
		this.setState({ date });
		this.props.getPhoto(moment(date).format('YYYY-MM-DD'));
	};

	render() {
		console.log(this.state);
		return (
			<Container>
				<h1>Photo of the Day</h1>
				{this.props.photoInfo && <img src={this.props.photoInfo.url} alt={this.props.photoInfo.title} />}
				{this.props.error && (
					<p>
						Error {this.props.error.status} {this.props.error.statusText}
					</p>
				)}
				<Calendar onChange={this.onChange} value={this.state.date} />
				<button>Get Photo</button>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		photoInfo: state.photoInfo,
		isLoading: state.isLoading,
		error: state.error
	};
};

export default connect(mapStateToProps, { getPhoto })(PhotoContainer);
