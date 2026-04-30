import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function Interview({ interview }) {
    var percent = (interview.progress / 3) * 100;
    return (
        <Card className="border-rounded">
            <Card.Body>
                <p>Posizione dell'intervista</p>
                <ProgressBar now={percent} label={`${percent}%`} />
            </Card.Body>
        </Card>
    );
}

export default Interview;
