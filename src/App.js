import React from "react";
import axios from "axios";
import {Accordion, Container, Card} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: []
    }
  }

  getProductInfo = async () => {
    let productsData = await axios.get('http://localhost:3001/products');

    this.setState({
      productsData: productsData.data
    })

    console.log(productsData.data);
  }

  componentDidMount() {
    this.getProductInfo();
  }
  render() {
    let productsToRender = this.state.productsData.map((prod, idx) =>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{prod.brand}</Accordion.Header>
          <Accordion.Body>
          {prod.name}-${prod.price}-MADE IN:{prod.origin}-QTY:{prod.qty}
          </Accordion.Body>
        </Accordion.Item>);
     
    return (
      <>
        <h1>Quick Store</h1>
        <h2>Built with MongoDB and AWS</h2>
        <h3>Snowboards</h3>

        {
          this.state.productsData.length > 0 &&
          <>
          <Container>
            <Card className="cardClass">
              <Card.Body>
                <Accordion className="accord">
                  {productsToRender}
                </Accordion>
              </Card.Body>
            </Card>
          </Container>
            
          </>
        }
      </>
    );
  }
}
export default App;
