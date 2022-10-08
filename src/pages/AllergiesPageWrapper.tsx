import { useNavigate } from 'react-router-dom'
import Users from '../component/Users';

export const AllergiesPageWrapper = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <>
            <h1>Allergy Page Wrapper</h1>
            <button onClick={goBack}>Back</button>

            <Users />
        </>
    )
}