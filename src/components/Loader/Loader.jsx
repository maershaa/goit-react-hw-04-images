import { Dna } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className="loaderWrapper">
      <Dna
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
