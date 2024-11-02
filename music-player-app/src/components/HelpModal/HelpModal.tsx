import { Fragment } from "react";
import { X, Keyboard } from "lucide-react";
import Button from "../Button/Button";
import { CONFIG } from "@/constants";
import "./HelpModal.css";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      <div className="modal-overlay" onClick={onClose} />
      <div
        className="modal-container"
        role="dialog"
        aria-labelledby="help-modal-title"
        aria-describedby="help-modal-description"
      >
        <div className="modal-header">
          <h2 id="help-modal-title" className="modal-title">
            <Keyboard className="modal-icon" />
            How to Use TuneCloud
          </h2>
          <Button
            variant="secondary"
            onClick={onClose}
            className="close-button"
            aria-label="Close help"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div id="help-modal-description" className="modal-content">
          <section className="help-section">
            <h3>Keyboard Shortcuts</h3>
            <div className="shortcuts-grid">
              <div className="shortcut">
                <kbd>Space</kbd>
                <span>Play/Pause</span>
              </div>
              <div className="shortcut">
                <kbd>←</kbd>
                <span>Previous Song</span>
              </div>
              <div className="shortcut">
                <kbd>→</kbd>
                <span>Next Song</span>
              </div>
              <div className="shortcut">
                <kbd>Shift</kbd> + <kbd>←</kbd>
                <span>Rewind {CONFIG.SKIP_SECONDS} seconds</span>
              </div>
              <div className="shortcut">
                <kbd>Shift</kbd> + <kbd>→</kbd>
                <span>Forward {CONFIG.SKIP_SECONDS} seconds</span>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h3>Features</h3>
            <ul className="features-list">
              <li>Search songs and artists using the search bar</li>
              <li>Add songs to favorites by clicking the heart icon</li>
              <li>Control volume using the volume slider</li>
              <li>Track progress with the progress bar</li>
              <li>Click anywhere on the progress bar to seek</li>
            </ul>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default HelpModal;
