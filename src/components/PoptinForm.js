import Script from "next/script";

const PoptinForm = ({ userId, dataId }) => (
  <>
    <Script src={`https://cdn.popt.in/pixel.js?id=${userId}`} />
    <div className='poptin-embedded' data-id={dataId} />
  </>
);

export default PoptinForm;