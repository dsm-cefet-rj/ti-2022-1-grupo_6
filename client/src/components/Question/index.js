export const Question = ({ user, question, owner, answer }) => {
  return (
    <div>
      <p>
        {user.username} - <span className="fw-bold">{question}</span>
      </p>
      {answer && (
        <p>
          {owner} - {answer}
        </p>
      )}
    </div>
  );
};
