import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';


const Loader = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
      wrapperClass={css.loader}
    />
  );
};
export default Loader;