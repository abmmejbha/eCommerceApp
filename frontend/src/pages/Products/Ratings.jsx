const Ratings = ({ value, text }) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5;

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <span key={i}>⭐</span>;
        if (i === fullStars && halfStar) return <span key={i}>✨</span>;
        return <span key={i}>☆</span>;
      })}
      <span> {text && text}</span>
    </div>
  );
};

export default Ratings;