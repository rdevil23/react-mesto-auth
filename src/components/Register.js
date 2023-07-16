import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <section className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          className="auth__input"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          className="auth__input"
          type="password"
          placeholder="Пароль"
        />
        <button className="auth__button">Зарегистрироваться</button>
      </form>
      <p className="auth__nav-text">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
