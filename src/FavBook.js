import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap/';
import AddBookModal from './components/AddBookModal';

import axios from 'axios'

import Jumbotron from 'react-bootstrap/Jumbotron';
import './FavBook.css';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      userBooks: [],
      showBooks: false,
      userEmail: '',
      showForm: false
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
    // console.log('Email : ' + this.state.userEmail);
    // console.log('show state : ' + this.state.showBooks);
    // console.log(this.state.userBooks);
  }


  showFormHandler = async () => {
    await this.setState({
      showForm: true
    })
  }
  handleClose = async () => {
    await this.setState({
      showForm: false
    })
  }

  handleForm = async (e) => {
    e.preventDefault();
    
    await this.setState({
      showForm: false
    })

    let addedBookObj = {
      email:this.state.userEmail,
      name : e.target.name.value,
      description : e.target.description.value,
      status : e.target.status.value,
      img : e.target.img.value,
    }
    // http://localhost:3002/addbook
    let url =`${process.env.REACT_APP_LOCALHOST}/addbook`;

    let addedBookResponse = await axios.post( url ,addedBookObj);

    await this.setState({
      userBooks : addedBookResponse.data
    })

  }

  deleteBook = async (index)=>{

   let paramsObj ={
     email : this.state.userEmail
   }
  
    let url = `${process.env.REACT_APP_LOCALHOST}/deletebook/${index}`;

    let deletedBookResponse = await axios.delete(url,{params : paramsObj});

    await this.setState({
      userBooks : deletedBookResponse.data
    })


  }


  render() {


    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <Button onClick={this.showFormHandler} variant="primary">Add Book</Button>

        {
          <AddBookModal handleForm={this.handleForm} show={this.state.showForm} handleClose={this.handleClose} />
        }
        <div className="bookcont">

          {
            this.state.showBooks &&
            this.state.userBooks.map((book,index) => {


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
                  <Button variant="danger" onClick ={()=> this.deleteBook(index)}>Delete</Button>
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