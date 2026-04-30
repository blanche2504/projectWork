import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalTutorial({ tutorialP, onHandleClick })
{
    function handleClose()
    {
        console.log("MODALTUTORIAL -> HANDLECLOSE()");

        onHandleClick();
    }

    return (
        <Modal show={true} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{tutorialP.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{tutorialP.allText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default ModalTutorial;