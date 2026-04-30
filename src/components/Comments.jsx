import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Comments({ commentsP }) {
    return (
        <Row className='border rounded'>
            <Col>
                <div>
                    <ul>
                        {
                            commentsP.map((comment, index) => (
                                <li key={index}>TITOLO: {comment.tutorialTitle}, COMMENTO: {comment.tutorialText}</li>
                            ))
                        }
                    </ul>
                </div>
            </Col>
        </Row>
    )
}

export default Comments