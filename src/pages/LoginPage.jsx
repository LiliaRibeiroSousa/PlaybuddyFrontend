
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
 