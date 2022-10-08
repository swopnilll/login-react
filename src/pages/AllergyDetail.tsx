import React from 'react'
import { useNavigate } from 'react-router-dom'

const AllergyDetail = () => {

    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <>
            <div>AllergyDetail</div>
            <button onClick={goBack}>Back</button>
        </>
    )
}

export default AllergyDetail