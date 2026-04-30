import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Tutorial({ tutorialP, onHandleShow })
{
    console.log("TUTORIAL()");

    function handleShow()
    {
        console.log("TUTORIAL -> HANDLESHOW()");

        onHandleShow(tutorialP);
    }

    return (
        <Card className='w-100'>
            <Card.Header as="h5">{tutorialP.title}</Card.Header>
            <Card.Img variant="top" src={tutorialP.pic} className='w-100 my-3'/>
            <Card.Body>
            <Card.Text>
                {tutorialP.topic + " " + tutorialP.language}
            </Card.Text>
            <Card.Text>
                
            </Card.Text>
            <ListGroup variant="flush" className='my-3'>
                <ListGroup.Item>{tutorialP.isDifficult ? "Per esperti" : "Per tutti"}</ListGroup.Item>
                <ListGroup.Item><i>Il tempo di lettura è di {tutorialP.readingTime} minuti</i></ListGroup.Item>
            </ListGroup>
            <Button onClick={handleShow} variant="primary">Vai al tutorial</Button>
            </Card.Body>
            <Card.Body>
                <Card.Link href={tutorialP.website.link} target="_blank">{tutorialP.website.title}</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default Tutorial;