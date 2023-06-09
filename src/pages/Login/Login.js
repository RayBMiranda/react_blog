import style from './Login.module.css';
import { useEffect, useState } from 'react';
import { useAutentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login, error: authError, loading} = useAutentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password
    }

    const res = await login(user);

    console.log(user);
  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={style.login}>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='E-mail do usuário'/>
          </label>
          <label> 
            <span>Senha:</span>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}required placeholder='Senha do usuário'/>
          </label>
          {!loading && <button className='btn'>Entrar</button>}
          {loading && <button className='btn' disabled={true}>Aguarde...</button>}
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login