import { useEffect, useState } from 'react';
import style from './EditPost.module.css';
import {useAuthValue} from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const {id} = useParams();

  const {document:post} = useFetchDocument('posts', id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(()=>{
    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post])

  const {user} = useAuthValue();
  const {updateDocument, response} = useUpdateDocument('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //valida url da imagem
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!");
    }

    if(formError) return;

    const data =
      {
        title, 
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      };

    updateDocument(id, data);

    //redirect home page
    navigate("/dashboard");
  }

  return (
    <div className={style.edit_post}>
      {post && (
          <>
            <h2>Editando post: {post.title}</h2>
            <p>Altere os dados do post como desejar</p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>
                  Título:
                </span>
                <input 
                  type='text' 
                  name='title' 
                  required 
                  placeholder='Pense num bom título...' 
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label>
                <span>
                  URL da imagem:
                </span>
                <input 
                  type='text' 
                  name='image' 
                  required 
                  placeholder='Insira uma imagem que representa o seu post' 
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </label>
              <p className={style.previews_title}>Preview da imagem atual:</p>
              <img className={style.image_preview} src={post.image} alt={post.title}></img>
              <label>
                <span>
                  Conteúdo:
                </span>
                <textarea
                  name='body'
                  required
                  placeholder='Insira o conteúdo do post'
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                > </textarea>
              </label>
              <label>
                <span>
                  Tags:
                </span>
                <input 
                  type='text' 
                  name='tags' 
                  required 
                  placeholder='Insira as tags separadas por vírgula' 
                  onChange={(e) => setTags(e.target.value)}
                  value={tags}
                />
              </label>
              
              {!response.loading && <button className='btn'>Editar</button>}
              {response.loading && <button className='btn' disabled={true}>Aguarde...</button>}
              {response.error && <p className='error'>{response.error}</p>} 
              {formError && <p className='error'>{formError}</p>} 
            </form>
          </>
      )}
    </div>
  )
}

export default EditPost