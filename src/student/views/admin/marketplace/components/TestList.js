import React, {useEffect, useState} from 'react';
import {AccordionBody, Button, Col, Row} from "reactstrap";
import {getCategoryByTest} from "../../../../../api/routers";
import '../../../../../assets/css/test.css';
import {Link} from 'react-router-dom';

function TestList({categoryId, index}) {

    const [test, setTest] = useState([]);

    useEffect(() => {
        getCategoryByTest(setTest, categoryId);
    }, []);

    const goPageStudent = () => document.getElementById("testCoding").click();

    // console.log(test)

    return (
        <AccordionBody accordionId={index} className="testb">
            {/* test coding url link */}
            <Link to='test/coding' id='testCoding'></Link>
            {test.length ? test.map((item, i) =>
                <Row className="py-4 border test-row w-100 ms-0 my-2" key={i} disabled={item.isActive}>
                    <Col className="col-1 d-flex align-items-center justify-content-center">
                        <img src="https://blob.sololearn.com/web-assets/le-lesson-icon.svg" alt="coin lesson"/>
                    </Col>
                    <Col className='col-11'>
                        {item.isActive &&
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                                 width="24"
                                 sl-test-data="lblIconLock"
                                 className="sol-icon le-widget__lock-icon float-end d-inline">
                                <g id="icon-lock">
                                    <path id="Vector" fillRule="evenodd" clipRule="evenodd"
                                          d="M15 10V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V10H15ZM7 7V10H4.5C4.22386 10 4 10.2239 4 10.5V20.5C4 20.7761 4.22386 21 4.5 21H19.5C19.7761 21 20 20.7761 20 20.5V10.5C20 10.2239 19.7761 10 19.5 10H17V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7ZM11.5 14C11.2239 14 11 14.2239 11 14.5V16.5C11 16.7761 11.2239 17 11.5 17H12.5C12.7761 17 13 16.7761 13 16.5V14.5C13 14.2239 12.7761 14 12.5 14H11.5Z"
                                          fill="currentColor"></path>
                                </g>
                            </svg>}
                        <p className='' style={{fontSize: ".8em", color: '#5b5b5b'}}>Lesson</p>
                        <p className='fs-5 fw-bold text-dark'>{item.question}</p>
                        <p style={{fontSize: '.85em', borderRadius: "18px", top: ".4em"}}
                           className='d-inline border py-1 px-2 position-relative'><span
                            className='fw-bold'>XP</span> +{item.grade}</p>
                    </Col>
                    {!item.isActive &&
                        <div className='w-100 d-flex justify-content-center mt-3'>
                            <Button onClick={() => {
                                sessionStorage.setItem("learnId", item.id)
                                goPageStudent();
                            }} style={{width: "99%", backgroundColor: '#2493DF'}}
                                    className='border-0 py-2'>Learn</Button>
                        </div>
                    }

                </Row>
            ) : <p>Test not found</p>}
        </AccordionBody>

    );
}

export default TestList;