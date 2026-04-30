import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormTutorials({ tutorialsP, onAddComment })
{
    const [choice, setChoice] = useState(0);
    const [test, setTest] = useState("");

    function handleSubmit(e)
    {
        e.preventDefault();

        console.log(e);

        const comment = {
            id: Date.now(),
            tutorialTitle: tutorialsP[choice].title,
            tutorialText: test
        }

        onAddComment(comment);

        setChoice(0);
        setTest("");
    }

    function handleChangeChoice(e) {
        console.log(e.target.value);

        setChoice(+e.target.value);
        //console.log(e.target.textContent);
    }

    function handleChangeTest(e) {
        console.log(e.target.value);

        setTest(e.target.value);
    }

    return (
        <Form className="row border rounded" onSubmit={handleSubmit}>
            <Form.Group className="col-xs-12 col-sm-6 col-md-4 mb-3" controlId="tutorialSelect">
                <Form.Label>Secegli il tutorial</Form.Label>
                <Form.Select value={choice} onChange={handleChangeChoice}>
                    {
                        tutorialsP.map((tutorial, index) => (
                            <option key={index} value={index}>{tutorial.title}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-xs-12 col-sm-6 col-md-4 mb-3" controlId="tutorialText">
                <Form.Label>Scrivi il commento</Form.Label>
                <Form.Control type="text" value={test} placeholder="" onChange={handleChangeTest} />
            </Form.Group>
            <Form.Group className="col-xs-12 mb-3">
                <Button type="submit">Invia</Button>
            </Form.Group>
        </Form>
    )
}

export default FormTutorials;