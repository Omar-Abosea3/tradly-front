import { Card, Placeholder } from "react-bootstrap";
import productPlaceholder from '../../../assets/productPlaceholder.png';

export default function ProductCardLoading() {

    const productsLoadings = () => {
      let productLoadingsArr = [];
      for (let i = 0; i < 20; i++) {
        productLoadingsArr.push(
          <div
            id="homeTop"
            key={i}
            className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3"
          >
            <Card className="h-100">
              <Card.Img variant="top" src={productPlaceholder} />
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={3} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={5} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <div className="mb-2">
                  <Placeholder.Button variant="secondary" xs={12} />
                </div>
                <div>
                  <Placeholder.Button variant="secondary" xs={12} />
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      }
      return productLoadingsArr;
    };
  return <>
      {productsLoadings()}
    </>
}
