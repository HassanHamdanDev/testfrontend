import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';


class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favData: [],
    }
  }

  componentDidMount = async () => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/getUser/${this.props.auth0.user.email}`;
    await axios.get(url).then(res => {
      this.setState({
        favData: res.data.favFruits,
      });
    });
    this.forceUpdate();
  }

  handleDeleteFav = async (id) => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/deleteFav/${this.props.auth0.user.email}/${id}`;
    let userUpdate = await axios.delete(url);
    console.log(userUpdate);
    console.log(url);
    this.setState({
      favData: userUpdate.data.favFruits
    });
    this.forceUpdate();
  }

  render() {
    return (
      <>
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
                      <Button variant="info">Update</Button>
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
