import { useEffect, useState } from 'react';
import { useAutentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css';

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAutentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password
    }

    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return
    }

    const res = await createUser(user);

    console.log(user);
  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" name="diplayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required placeholder='Nome do usuário'/>
          </label>
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='E-mail do usuário'/>
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}required placeholder='Senha do usuário'/>
          </label>
          <label>
            <span>Confirmação de Senha:</span>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='Confirme a sua senha'/>
          </label>
          {!loading && <button className='btn'>Cadastrar</button>}
          {loading && <button className='btn' disabled={true}>Aguarde...</button>}
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register