import React, { Component } from 'react';
import {
  Container, Row, Modal, Button,
} from 'react-bootstrap';
import axiosRetry from 'axios-retry';
import Character from './character';

const axios = require('axios');

axiosRetry(axios, { retries: 3 });

const ROOT_URL = 'http://nerdom-server.herokuapp.com/api';

class Duel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starWars: '',
      harryPotter: '',
      lotr: '',
      starLoaded: false,
      hpLoaded: false,
      lotrLoaded: false,
      isError: false,
      error: '',
    };
  }

  componentDidMount() {
    this.loadAll();
  }

  loadAll = () => {
    this.loadStarWars();
    this.loadHP();
    this.loadLOTR();
  }

  loadStarWars = () => {
    this.setState({ starLoaded: false }, () => {
      axios.get(`${ROOT_URL}/character/starwars`)
        .then((response) => {
          if (this.state.starWars.info && response.data.info.name === this.state.starWars.info.name) {
            this.loadStarWars();
          } else {
            this.setState({
              starWars: response.data,
              starLoaded: true,
            });
          }
        })
        .catch((error) => {
          this.handleError(error);
        });
    });
  }

  loadHP = () => {
    this.setState({ hpLoaded: false }, () => {
      axios.get(`${ROOT_URL}/character/hp`)
        .then((response) => {
          if (this.state.harryPotter.info && response.data.info.name === this.state.harryPotter.info.name) {
            this.loadHP();
          } else {
            setTimeout(() => {
              this.setState({
                harryPotter: response.data,
                hpLoaded: true,
              });
            }, 250); // HP API is super fast
          }
        })
        .catch((error) => {
          this.handleError(error);
        });
    });
  }

  loadLOTR = () => {
    this.setState({ lotrLoaded: false }, () => {
      axios.get(`${ROOT_URL}/character/lotr`)
        .then((response) => {
          if (this.state.lotr.info && response.data.info.name === this.state.lotr.info.name) {
            this.loadLOTR();
          } else {
            this.setState({
              lotr: response.data,
              lotrLoaded: true,
            });
          }
        })
        .catch((error) => {
          this.handleError(error);
        });
    });
  }

  updateRankings = (winningFandom) => {
    const returnObj = {};
    this.setState({
      hpLoaded: false,
      lotrLoaded: false,
      starLoaded: false,
    }, () => { this.loadAll(); });

    switch (winningFandom) {
    case 'Star Wars':
      returnObj.winner = this.state.starWars.info.name;
      returnObj.loser1 = this.state.harryPotter.info.name;
      returnObj.loser2 = this.state.lotr.info.name;
      axios.post(`${ROOT_URL}/update`, returnObj).catch((error) => this.handleError(error));
      break;
    case 'LOTR':
      returnObj.winner = this.state.lotr.info.name;
      returnObj.loser1 = this.state.starWars.info.name;
      returnObj.loser2 = this.state.harryPotter.info.name;
      axios.post(`${ROOT_URL}/update`, returnObj).catch((error) => this.handleError(error));
      break;
    case 'Harry Potter':
      returnObj.winner = this.state.harryPotter.info.name;
      returnObj.loser1 = this.state.starWars.info.name;
      returnObj.loser2 = this.state.lotr.info.name;
      axios.post(`${ROOT_URL}/update`, returnObj).catch((error) => this.handleError(error));
      break;
    default:
      break;
    }
  }

  handleError = (error) => {
    this.setState({
      isError: true,
      error: error.message,
    });
  }

  closeModal = () => {
    this.setState({
      isError: false,
      error: '',
    });
  }

  render() {
    return (
      <Container>
        <div className="duel-title">Who would win in a fight?</div>
        <Row xs={1} sm={1} md={3}>
          <Character key="star-wars"
            character={this.state.starWars}
            onClick={this.updateRankings}
            isLoaded={this.state.starLoaded}
            reload={this.loadStarWars}
            rightBorder
          />
          <Character key="harry-potter"
            character={this.state.harryPotter}
            onClick={this.updateRankings}
            isLoaded={this.state.hpLoaded}
            reload={this.loadHP}
            rightBorder
          />
          <Character key="lotr"
            character={this.state.lotr}
            onClick={this.updateRankings}
            isLoaded={this.state.lotrLoaded}
            reload={this.loadLOTR}
          />
        </Row>

        <Modal show={this.state.isError} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Duel;
