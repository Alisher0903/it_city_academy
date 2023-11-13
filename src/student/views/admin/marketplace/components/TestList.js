import React, {useEffect, useState} from 'react';
import {AccordionBody, Button, Col, Row} from "reactstrap";
import {getCategoryByTest} from "../../../../../api/routers";
import '../../../../../assets/css/test.css'

function TestList({categoryId, index}) {

    const [test, setTest] = useState([]);

    useEffect(() => {
        getCategoryByTest(setTest, categoryId);
    }, []);

    console.log(test)

    return (
        <AccordionBody accordionId={index} className="testb">
            {test.length ? test.map((item, i) =>
                    <Row className="py-4 border test-row w-100 ms-0 my-2" key={i}>
                        <Col className="col-1 d-flex align-items-center justify-content-center">
                            <img src="https://blob.sololearn.com/web-assets/le-lesson-icon.svg" alt="coin lesson"/>
                        </Col>
                        <Col className='col-11'>
                            <p className='' style={{fontSize: ".8em", color: '#5b5b5b'}}>Lesson</p>
                            <p className='fs-5 fw-bold text-dark'>{item.question}</p>
                            <p style={{fontSize: '.85em', borderRadius: "18px", top: ".4em"}} className='d-inline border py-1 px-2 position-relative'><span className='fw-bold'>XP</span> +{item.grade}</p>
                        </Col>
                        <div className='w-100 d-flex justify-content-center mt-3'>
                            <Button style={{width: "99%", backgroundColor: '#2493DF'}} className='border-0 py-2'>Learn</Button>
                        </div>
                    </Row>
                ) :
                <p>Test not found</p>}
        </AccordionBody>

    );
}

export default TestList;