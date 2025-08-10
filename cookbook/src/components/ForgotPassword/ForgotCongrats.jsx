import './ForgotCongrats.scss';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Congratulations() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read email from state, fallback to default if missing
  const email = location.state?.email || "newUser@email.com";

  return (
    <div className="congratulations-wrapper">
      <div className="congratulations-box">
        <p>
          Congratulations,<br />
          we sent an email to<br />
          <strong>{email}</strong><br />
          with the validation code
        </p>
        <button className="arrow-btn" onClick={() => navigate('/auth/resetpass')}>
          →
        </button>
      </div>
    </div>
  );
}
