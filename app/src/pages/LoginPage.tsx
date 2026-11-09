import axios from 'axios';
import { useState, type SubmitEvent } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAppDispatch, useAppSelector } from '../store';
import { signedIn } from '../store/authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.auth.status === 'authenticated');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (authenticated) return <Navigate to="/" replace />;

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    setError(null);
    setPending(true);

    try {
      const { data } = await axios.post<{ id: number; username: string }>('/api/auth/login', {
        username: form.get('username'),
        password: form.get('password'),
      });
      dispatch(signedIn(data));
    } catch (cause) {
      setError(axios.isAxiosError(cause) && cause.response?.status === 401
        ? 'Неверный логин или пароль.'
        : 'Не удалось войти. Попробуйте позже.');
    } finally {
      setPending(false);
    }
  }

  return (
    <Layout>
      <article className="adding-block">
        <div className="container">
          <h2 className="page-title">ВХОД В АККАУНТ</h2>
          <form className="fields-sections" onSubmit={handleSubmit} aria-busy={pending}>
            <div className="field-section">
              <h3>Данные для входа</h3>
              <label className="field">
                <span>Логин</span>
                <input name="username" autoComplete="username" maxLength={50} required disabled={pending} />
              </label>
              <label className="field">
                <span>Пароль</span>
                <input name="password" type="password" autoComplete="current-password" maxLength={255} required disabled={pending} />
              </label>
            </div>
            {error && <p role="alert">{error}</p>}
            <button type="submit" className="action-btn" disabled={pending}>
              {pending && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}
              {pending ? 'Вход…' : 'Войти'}
            </button>
          </form>
        </div>
      </article>
    </Layout>
  );
}
