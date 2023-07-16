import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <section className="auth">
      <h3 className="auth__title">Вход</h3>
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
        <button className="auth__button">Войти</button>
      </form>
      <p className="auth__nav-text"></p>
    </section>
  );
}

export default Login;
