import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitsData: [],
      userData: []
    }
  }

  componentDidMount = async () => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/getData`;
    await axios.get(url).then(res => {
      this.setState({
        fruitsData: res.data
      });
    });

    let createUserUrl = `${process.env.REACT_APP_HEROKU_SERVER}/creatUser/${this.props.auth0.user.email}`;
    await axios.post(createUserUrl);
  }

  handleAddToFav = async (id) => {
    let url = `${process.env.REACT_APP_HEROKU_SERVER}/addToFav/${this.props.auth0.user.email}/${id}`
    await axios.put(url).then(res => {
      this.setState({
        userData: res.data
      });
    });
  }

  render() {
    return (
      <Container>
        <h1>API Fruits</h1>
        <Row xs={1} md={4} className="g-3">
          {this.state.fruitsData.map((elem, index) => {
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
                    <Button variant="primary" onClick={() => this.handleAddToFav(elem._id)} >Add To FAV</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
          }
        </Row>
      </Container>
    )
  }
}

export default withAuth0(Home);
