import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col, } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import UpdateModel from './UpdateModel';


class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favData: [],
      fruitId: '',
      name: '',
      price: '',
      image: '',
      isOpen: false,
    }
  }

  handleClose = () => this.setState({ isOpen: false });
  handleShow = () => this.setState({ isOpen: true });

  componentDidMount = async () => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/getUser/${this.props.auth0.user.email}`;
    await axios.get(url).then(res => {
      this.setState({
        favData: res.data.favFruits,
      });
    });
    this.forceUpdate();
  }
  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  handleImage = (event) => {
    this.setState({
      image: event.target.value
    })
  }
  handlePrice = (event) => {
    this.setState({
      price: event.target.value
    })
  }
  handleDeleteFav = async (id) => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/deleteFav/${this.props.auth0.user.email}/${id}`;
    let userUpdate = await axios.delete(url);
    this.setState({
      favData: userUpdate.data.favFruits
    });
    this.forceUpdate();
  }
  handleUpadate = (fruitId, name, price, image) => {
    this.setState({
      fruitId: fruitId,
      name: name,
      price: price,
      image: image,
      isOpen: true,
    })
  }
  handleUpdateSubmit = async (fruitId) => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/updateFav/${this.props.auth0.user.email}/${fruitId}`;
    let UpdateData = {
      name: this.state.name,
      image: this.state.image,
      price: this.state.price,
    }
    let userUpdate = await axios.put(url, UpdateData);
    this.setState({
      favData: userUpdate.data.favFruits,
      isOpen: false,
    })
    this.forceUpdate();
  }
  render() {
    return (
      <>
        <UpdateModel
          isOpen={this.state.isOpen}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          handleUpdateSubmit={this.handleUpdateSubmit}
          handleName={this.handleName}
          handleEmail={this.handleEmail}
          handlePrice={this.handlePrice}
          fruitId={this.state.fruitId}
          name={this.state.name}
          price={this.state.price}
          image={this.state.image}
        />
        <Container>
          <h1>My Favorite Fruits</h1>
          <Row xs={1} md={4} className="g-3">
            {this.state.favData.map((elem, index) => {
              return (
                <Col key={index}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img
                      variant="top"
                      src={elem.image}
                      style={{ width: '18rem', height: '18rem' }}
                    />
                    <Card.Body>
                      <Card.Title>{elem.name}</Card.Title>
                      <Card.Subtitle>{elem.price}</Card.Subtitle>
                      <Button variant="danger" onClick={() => { this.handleDeleteFav(elem._id); console.log(elem._id) }}>Delete</Button>
                      <Button variant="info" onClick={() => this.handleUpadate(elem._id, elem.name, elem.price, elem.image)}>Update</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
            }
          </Row>
        </Container>
      </>
    )
  }
}

export default withAuth0(FavFruit);
