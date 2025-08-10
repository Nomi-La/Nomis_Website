import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../sass/main.scss'

import ProtectedRoutes from './ProtectedRoutes'
import NotFound from '../pages/NotFound'


/* authentication possible routes */
/* 
import AuthenticationLayout from '../components/AuthComp/AutenthicationLayout.jsx'
import SignInSection from '../components/AuthComp/SignInSection.jsx'
import SignUpSection from '../components/AuthComp/SignUpSection.jsx'
import CongratsSection from '../components/AuthComp/CongratsSection.jsx'
import VerificationSection from '../components/AuthComp/VerificationSection.jsx'
 */

import App from '../App.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import GeneralLayout from '../layouts/GeneralLayout.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import Signin from '../components/Auth/Signin.jsx'
import Signup from '../components/Auth/Signup.jsx'
import Congratulations from '../components/Congratulation/Congratulation.jsx'
import AccountCreation from '../components/AccountCreation/AccountCreation.jsx'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.jsx'
import ForgotCongrats from '../components/ForgotPassword/ForgotCongrats.jsx'
import ResetPassword from '../components/ResetPassword/ResetPassword.jsx'

import RecipePage from '../pages/RecipePage.jsx'
import CreateRecipePage from '../pages/CreateRecipePage'
import CreateCookbookPage from '../pages/CreateCookbookPage.jsx'
import UserPage from '../pages/UserModePage.jsx'


const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          <Route path='' element={<LandingPage/>}/>
          <Route path='user/:me' element={<UserPage/>}/>
          <Route path='recipe/:id' element={<RecipePage/>}/>
          
          <Route path="/recipes/create" element={<CreateRecipePage />} /> {/* eventually to move into protected routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/cookbooks/create" element={<CreateCookbookPage />} /> {/* eventually to move into protected routes */}

        </Route>
        <Route path='/auth' element={<AuthLayout/>}>
              <Route path='login' element={<Signin />} />
                  <Route path='forgot-password' element={<ForgotPassword />} />
                      <Route path='congrats' element={<ForgotCongrats />} />
                      <Route path='resetpass' element={<ResetPassword />} />
              <Route path='signup' element={<Signup />} />
              <Route path='congratulations' element={<Congratulations />} />
                  <Route path='account' element={<AccountCreation />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<GeneralLayout />}>
              
            </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default PageRoutes
