import { Placeholder } from "rsuite";


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
            <Placeholder.Graph active height={400} className="rounded-4" width={'100%'} >
              <Placeholder.Graph className="rounded-4" active height={'40%'} width={'100%'} />
              <div className="p-1">
                <Placeholder.Paragraph active color="black"/>
                <Placeholder.Paragraph active color="black"/>
                <Placeholder.Paragraph active color="black"/>
                <Placeholder.Paragraph active color="black"/>
              </div>
            </Placeholder.Graph>
          </div>
        );
      }
      return productLoadingsArr;
    };
  return <>
      {productsLoadings()}
    </>
}
