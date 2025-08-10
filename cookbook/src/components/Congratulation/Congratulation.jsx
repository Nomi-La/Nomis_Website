import './Congratulation.scss';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Congratulations() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or use fallback
  const email = location.state?.email || 'newUser@email.com';

  return (
    <div className="congratulations-wrapper">
      <div className="congratulations-box">
        <p>
          Congratulations,<br />
          we sent an email to<br />
          <strong>{email}</strong><br />
          with the validation code
        </p>
        <button className="arrow-btn" onClick={() => navigate('/auth/account')}>
          →
        </button>
      </div>
    </div>
  );
}
