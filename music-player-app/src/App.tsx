import { Toaster } from "sonner";
import AudioPlayer from "./components/player/AudioPlayer/AudioPlayer";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <AudioPlayer />
    </div>
  );
};

export default App;
