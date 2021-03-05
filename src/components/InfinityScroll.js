import React, { useState, useEffect, useRef, useCallback } from 'react';
import faker from 'faker';
import debounce from "lodash.debounce";

const loadData = (numberOfRow) => {
    return new Array(numberOfRow).fill().map((value, id) => (({
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.middleName(),
        findName: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        gender: faker.name.gender(),
        prefix: faker.name.prefix(),
        suffix: faker.name.suffix(),
        title: faker.name.title(),
        jobDescriptor: faker.name.jobDescriptor(),
        jobArea: faker.name.jobArea(),
        jobType: faker.name.jobType(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email()
    })));
}

function InfinityScroll () {
    const currentScroll = useRef(200);
    const data = useRef(loadData(20));//load 20 items when init, when loads 1.000.000 item, app crashed => not best practice
    const [loading, setLoading] = useState(false);

    const handleLoadData = useCallback(debounce((e) => {
        if (e.target.scrollTop >= currentScroll.current) {
            setLoading(true);
            const extendData = loadData(10);
            data.current = [...data.current, ...extendData];
            setLoading(false);
            currentScroll.current += 400;
        }
    }, 0), []);//to smoothly scroll, set timer = 0, if in real world, have a second to integrated API, at this time, handle loading when load new data
    
    useEffect(() => {
        const el = document.getElementsByClassName("table-scrollable")[0];
        el.addEventListener('scroll', handleLoadData);
    }, []);

    return (
        <div>
            <div className="table-scrollable">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Prefix</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Find Name</th>
                            <th>Suffix</th>
                            <th>Gender</th>
                            <th>Title</th>
                            <th>Job Title</th>
                            <th>Job Type</th>
                            <th>Job Description</th>
                            <th>Job Area</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.current.map((item,idx) => (
                                <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td>{item.prefix}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.middleName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.findName}</td>
                                    <td>{item.suffix}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.title}</td>
                                    <td>{item.jobTitle}</td>
                                    <td>{item.jobType}</td>
                                    <td>{item.jobDescriptor}</td>
                                    <td>{item.jobArea}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {loading}
        </div>
        
    )
}

export default InfinityScroll;