/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import axiosRetry from 'axios-retry';

const axios = require('axios');

axiosRetry(axios, { retries: 3 });

const ROOT_URL = 'http://nerdom-server.herokuapp.com/api';

class Rankings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rankings: [],
      isColorEnabled: false,
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.fetchRankings();
  }

  fetchRankings = () => {
    axios.get(`${ROOT_URL}/rankings`)
      .then((result) => {
        const lastScore = Math.abs(result.data[result.data.length - 1].score);
        const normalized = result.data.map((e) => { return { ...e, score: (Math.round((e.score + lastScore) * 10) / 10) }; });
        this.setState({ rankings: normalized, isLoaded: true });
      })
      .catch((error) => console.log(error));
  }

  rankingsTable = () => {
    return (
      <Col md="9" className={this.state.isLoaded ? 'rankings-table show' : 'rankings-table'}>
        {this.state.rankings ? this.state.rankings.map((character) => {
          return (
            <div key={character._id} className={`rankings-table-row row-${this.state.isColorEnabled ? character.fandom.split(' ')[0] : 'hidden'}`}>
              <div className="row-name">{`${character.ranking}. ${character.name}`}</div>
              <div className="row-score">{character.score}</div>
            </div>
          );
        }) : ''}
      </Col>
    );
  }

  handleCheck = (e) => {
    this.setState({ isColorEnabled: e.target.checked });
  }

  colorBox = () => {
    return (
      <Col md="3">
        <Form.Check
          type="checkbox"
          label="Click to color-code"
          onChange={this.handleCheck}
          className={this.state.isLoaded ? 'rankings-check show' : 'rankings-check'}
          style={{ opacity: 0 }}
        />
      </Col>
    );
  }

  render() {
    return (
      <Container>
        <Row sm="1" className="rankings">
          {this.rankingsTable()}
          {this.colorBox()}
        </Row>
      </Container>
    );
  }
}

export default Rankings;
