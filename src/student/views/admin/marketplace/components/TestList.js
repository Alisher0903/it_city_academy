import React, {useEffect, useState} from 'react';
import {AccordionBody} from "reactstrap";
import {getCategoryByTest} from "../../../../../api/routers";

function TestList({categoryId, index}) {

    const [test, setTest] = useState([]);

    useEffect(() => {
        getCategoryByTest(setTest, categoryId);
    }, []);

    console.log(test)

    return (
        <>
            {test.length ? test.map((item, i) =>
                <AccordionBody accordionId={index} key={i}>
                    {item.question}
                    <hr/>
                </AccordionBody>
            ) : <AccordionBody accordionId={index}>
                Test not found
            </AccordionBody>}
        </>

    );
}

export default TestList;