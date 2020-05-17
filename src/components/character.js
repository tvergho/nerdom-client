/* eslint-disable guard-for-in */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import {
  Col, Button, Modal,
} from 'react-bootstrap';
import Iframe from 'react-iframe';

const axios = require('axios');

const ROOT_URL = 'http://nerdom-server.herokuapp.com/api';

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      // Star Wars
      homeworld: '',
      movies: [],
      species: [],
      vehicles: [],
      starships: [],
      image: '',
      wikiaURL: '',
      imageLoaded: false,
      isModalVisible: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoaded && this.props !== prevProps) {
      this.getWikiaInfo();
      if (prevProps.character.info && this.props.character.info.name !== prevProps.character.info.name) {
        this.setState({ imageLoaded: false });
      }

      const { fandom, name } = this.props.character.info;
      const { detail } = this.props.character;
      this.setState({ name });

      switch (fandom) {
      case 'Star Wars': {
        const movies = [];
        const species = [];
        const vehicles = [];
        const starships = [];

        axios.get(detail.homeworld).then((result) => { this.setState({ homeworld: result.data.name }); });
        detail.films.forEach((film) => {
          axios.get(film).then((result) => {
            movies.push(result.data.title);
          }).then(() => { this.setState({ movies }); });
        });
        detail.species.forEach((spec) => {
          axios.get(spec).then((result) => {
            species.push(result.data.name);
          }).then(() => { this.setState({ species }); });
        });
        detail.vehicles.forEach((vehicle) => {
          axios.get(vehicle).then((result) => {
            species.push(result.data.name);
          }).then(() => { this.setState({ vehicles }); });
        });
        detail.starships.forEach((ship) => {
          axios.get(ship).then((result) => {
            starships.push(result.data.name);
          }).then(() => { this.setState({ starships }); });
        });

        break;
      }
      default:
        break;
      }
    }
  }

  getWikiaInfo() {
    const { fandom, name } = this.props.character.info;
    switch (fandom) {
    case 'Star Wars': {
      const wikiaURL = `https://starwars.fandom.com/wiki/${name.replace(' ', '_')}`;
      this.setState({ wikiaURL });
      axios.get(`${ROOT_URL}/getimage?url=${wikiaURL}`)
        .then((response) => {
          console.log(response);
          this.setState({ image: response.data.src });
        });
      break;
    }
    case 'Harry Potter': {
      const wikiaURL = `https://harrypotter.fandom.com//wiki/${name.replace(' ', '_')}`;
      this.setState({ wikiaURL });
      axios.get(`${ROOT_URL}/getimage?url=${wikiaURL}`)
        .then((response) => {
          console.log(response);
          this.setState({ image: response.data.src });
        });
      break;
    }
    case 'LOTR': {
      const wikiaURL = `https://lotr.fandom.com/wiki/${name.replace(' ', '_')}`;
      this.setState({ wikiaURL });
      axios.get(`${ROOT_URL}/getimage?url=${wikiaURL}`)
        .then((response) => {
          console.log(response);
          this.setState({ image: response.data.src });
        });
      break;
    }
    default:
      break;
    }
  }

  didLoad = () => {
    if (this.state.image !== '') {
      this.setState({ imageLoaded: true });
    }
  }

  toggleModal = () => {
    this.setState((prevState) => { return { isModalVisible: !prevState.isModalVisible }; });
  }

  starWarsTable() {
    const { detail } = this.props.character;
    return (
      <div className="api-table">
        <div className="api-row"><b>Height:</b> {detail.height} m</div>
        <div className="api-row"><b>Mass:</b> {detail.mass} kg</div>
        <div className="api-row"><b>Hair color:</b> {detail.hair_color}</div>
        <div className="api-row"><b>Skin color:</b> {detail.skin_color}</div>
        <div className="api-row"><b>Eye color:</b> {detail.eye_color}</div>
        <div className="api-row"><b>Birth year:</b> {detail.birth_year}</div>
        <div className="api-row"><b>Gender:</b> {detail.gender}</div>
        <div className="api-row"><b>Homeworld:</b> {this.state.homeworld}</div>
        <div className="api-row"><b>Films:</b> {this.state.movies.join(', ')}</div>
        <div className="api-row"><b>Species:</b> {this.state.species.join(', ')}</div>
        <div className="api-row"><b>Vehicles:</b> {this.state.vehicles.join(', ')}</div>
        <div className="api-row"><b>Starships:</b> {this.state.starships.join(', ')}</div>
      </div>
    );
  }

  hpTable() {
    const { detail } = this.props.character;
    return (
      <div className="api-table">
        <div className="api-row"><b>Role:</b> {detail.role}</div>
        <div className="api-row"><b>House:</b> {detail.house}</div>
        <div className="api-row"><b>School:</b> {detail.school}</div>
        <div className="api-row"><b>Boggart:</b> {detail.boggart}</div>
        <div className="api-row"><b>Ministry of Magic:</b> {detail.ministryOfMagic ? 'Yes' : 'No'}</div>
        <div className="api-row"><b>Order of the Phoenix:</b> {detail.orderOfThePhoenix ? 'Yes' : 'No'}</div>
        <div className="api-row"><b>Dumbledore{'\''}s Army:</b> {detail.dumbledoresArmy ? 'Yes' : 'No'}</div>
        <div className="api-row"><b>Death Eater:</b> {detail.deathEater ? 'Yes' : 'No'}</div>
        <div className="api-row"><b>Blood Status:</b> {detail.bloodStatus}</div>
        <div className="api-row"><b>Species:</b> {detail.species}</div>
      </div>
    );
  }

  lotrTable() {
    const { detail } = this.props.character;
    return (
      <div className="api-table">
        <div className="api-row"><b>Height:</b> {detail.height}</div>
        <div className="api-row"><b>Birth:</b> {detail.birth ? detail.birth.replace(/,/g, '') : ''}</div>
        <div className="api-row"><b>Death:</b> {detail.death ? detail.death.replace(/,/g, '') : ''}</div>
        <div className="api-row"><b>Hair:</b> {detail.hair}</div>
        <div className="api-row"><b>Realm:</b> {detail.realm}</div>
        <div className="api-row"><b>Gender:</b> {detail.gender}</div>
        <div className="api-row"><b>Race:</b> {detail.race}</div>
        <div className="api-row"><b>Spouse:</b> {detail.spouse ? detail.spouse : ''}</div>
      </div>
    );
  }

  renderImage() {
    if (this.state.image !== '') {
      return (
        <img
          src={this.state.image}
          alt="Character"
          onLoad={this.didLoad}
          className="character-image"
          style={{ visibility: this.state.imageLoaded ? 'visible' : 'hidden' }}
          onClick={this.toggleModal}
        />
      );
    } else {
      return null;
    }
  }

  renderBody() {
    return (
      <div className={this.props.isLoaded && this.state.imageLoaded ? 'character show' : 'character hide'}>
        <div className="character-title">{this.state.isLoaded ? this.props.character.info.name : this.state.name}</div>
        <Button
          variant="primary"
          className="winner-button"
          onClick={() => { this.props.onClick(this.props.character.info.fandom); }}
          style={{ visibility: this.state.imageLoaded ? 'visible' : 'hidden' }}
        >Winner
        </Button>

        <div className="link-buttons">
          <Button
            variant="link"
            className="refresh-button"
            onClick={this.toggleModal}
            style={{ visibility: this.state.imageLoaded ? 'visible' : 'hidden' }}
          >I don{'\''}t know who this is!
          </Button>
          <Button
            variant="link"
            className="refresh-button"
            onClick={this.props.reload}
            style={{ visibility: this.state.imageLoaded ? 'visible' : 'hidden' }}
          >Reset
          </Button>
        </div>

        {this.renderImage()}
        {this.props.isLoaded && this.props.character.info.fandom === 'Star Wars' ? this.starWarsTable() : ''}
        {this.props.isLoaded && this.props.character.info.fandom === 'Harry Potter' ? this.hpTable() : ''}
        {this.props.isLoaded && this.props.character.info.fandom === 'LOTR' ? this.lotrTable() : ''}
      </div>
    );
  }

  render() {
    return (
      <Col className={`${this.props.rightBorder ? 'duel-divider' : ''}`}>
        {this.renderBody()}

        <Modal show={this.state.isModalVisible} onHide={this.toggleModal} size="lg" dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
          <Iframe url={this.state.wikiaURL}
            width="100%"
            height="100%"
            className="wikia-page"
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

export default Character;
