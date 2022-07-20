import { useState } from 'react';
import { usePostQuestionMutation } from '../../redux/features/productsApiSlice';

export const PostQuestion = ({ productId }) => {
  const [question, setQuestion] = useState('');

  const [postQuestion, { isLoading, isSuccess, isUninitialized }] =
    usePostQuestionMutation();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await postQuestion({
        id: productId,
        data: { question },
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="textarea">Faça uma pergunta</label>
        <textarea
          className="form-control"
          id="textarea"
          rows="3"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary my-2" type="submit">
        Enviar
      </button>
    </form>
  );
};
