import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap/'

import axios from 'axios'

import Jumbotron from 'react-bootstrap/Jumbotron';
import './FavBook.css';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      userBooks: [],
      showBooks: false,
      userEmail: ''
    }
  }


  componentDidMount = async () => {
    const { user } = this.props.auth0;

    await this.setState({
      userEmail: `${user.email}`
    })


    let url = `${process.env.REACT_APP_LOCALHOST}/book?userEmail=${this.state.userEmail}`;

    let responseData = await axios.get(url);

    await this.setState({
      userBooks: responseData.data,
      showBooks: true,
    })
    console.log('Email : ' + this.state.userEmail);
    console.log('show state : ' + this.state.showBooks);
    console.log(this.state.userBooks);
  }





  render() {


    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div className="bookcont">
        {
          this.state.showBooks &&
          this.state.userBooks.map(book => {


            return (
              <Card className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' }} >

                <Card.Body>
                  <Card.Title>{book.name}</Card.Title>
                  <Card.Img style={{ boxShadow: '2px 2px 2px #ccc' }} variant="top" src={book.img} alt={book.name} />

                  <Card.Text>
                    {book.description}
                  </Card.Text>
                  <Card.Text>
                    {book.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            )

          })

        }
        </div>



      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);