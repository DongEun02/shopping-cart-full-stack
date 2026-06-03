import { Global } from '@emotion/react';
import { globalStyles } from './styles/global';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
    </>
  );
}

export default App;
