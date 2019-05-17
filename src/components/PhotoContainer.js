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

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
`;

const ContentSmall = styled.div`max-width: 350px;`;

const FeaturedImg = styled.img`max-width: 350px;`;

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
		return (
			<Container>
				<h1>NASA Photo of the Day</h1>
				<FlexContainer>
					{this.props.photoInfo && (
						<ContentSmall>
							<h1>{this.props.photoInfo.title}</h1>
							<p>{moment(this.props.photoInfo.date).format('MMM Do YYYY')}</p>
							<FeaturedImg src={this.props.photoInfo.url} alt={this.props.photoInfo.title} />

							<p>{this.props.photoInfo.explanation}</p>
						</ContentSmall>
					)}
					{this.props.error && (
						<p>
							Error {this.props.error.status} {this.props.error.statusText}
						</p>
					)}
					<Calendar onChange={this.onChange} value={this.state.date} maxDate={new Date()} />
				</FlexContainer>
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
