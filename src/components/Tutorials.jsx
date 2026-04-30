import { useState } from 'react';

import Tutorial from "./Tutorial";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ModalTutorial from "./ModalTutorial";


function Tutorials({ tutorialsP })
{
    console.log("TUTORIALS()");

    const [selectedTutorial, setSelectedTutorial] = useState(null);

    function handleShow(tutorial)
    {
        console.log("TUTORIALS -> HANDLESHOW()");

        setSelectedTutorial(tutorial);
    };

    function handleClose()
    {
        console.log("TUTORIALS -> HANDLECLOSE()");

        setSelectedTutorial(null);
    }

    return (
        <section>
            <Row>
                <Col><h2>Tutorial e Articoli</h2></Col>
            </Row>
            <Row xs={2} md={4} lg={6}>
                {
                    tutorialsP.map((tutorial, index) => (
                        <Col key={index}>
                            <Tutorial
                                tutorialP={tutorial}
                                onHandleShow={handleShow} />
                        </Col>
                    ))
                }
            </Row>

            { selectedTutorial ? <ModalTutorial tutorialP={selectedTutorial} onHandleClick={handleClose} /> : undefined }
        </section>
    )
}

export default Tutorials;