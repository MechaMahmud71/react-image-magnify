import './App.css';
import { useState } from "react";
import { ImageZoomModal } from './imageModal';

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Click to open Modal</button>
      {openModal && <ImageZoomModal setOpenModal={setOpenModal} />}
    </div>

  );
}

export default App;
