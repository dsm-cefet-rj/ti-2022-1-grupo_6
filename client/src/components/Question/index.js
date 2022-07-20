import { useState } from 'react';
import { usePostQuestionAnswerMutation } from '../../redux/features/productsApiSlice';

export const Question = ({
  question,
  owner,
  productUser,
  productId,
  authUser,
}) => {
  const [answer, setAnswer] = useState('');

  const [postQuestionAnswer, { isLoading, isSuccess, isUninitialized }] =
    usePostQuestionAnswerMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await postQuestionAnswer({
        productId,
        questionId: question._id,
        data: { answer },
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>
        {question.user.name} -{' '}
        <span className="fw-bold">{question.question}</span>
      </p>
      {question.answer ? (
        <p>
          {owner} - {question.answer}
        </p>
      ) : (
        authUser &&
        productUser === authUser._id && (
          <form onSubmit={handleSubmit}>
            <div className="form-group w-50">
              <label htmlFor="textarea">
                Responda a pergunta do {question.user.name}
              </label>
              <textarea
                className="form-control"
                id="textarea"
                rows="3"
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-primary my-2" type="submit">
              Enviar
            </button>
          </form>
        )
      )}
    </div>
  );
};
