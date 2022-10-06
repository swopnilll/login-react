import { Outlet } from 'react-router-dom'

import registerBgImage from "../images/allergy-care.jpg"

export const LandingAuthPageWrapper = () => {
    return (
        <>
        <h1>Allergies Management Application</h1>
        <div className='landing-auth-page'>
            <div className="register-page-image">
                <img src={registerBgImage} alt="register-page-landing"></img>
            </div>
            <div className='registration-page-outlet-wrapper'><Outlet /> </div>
        </div>
        </>
    )
}