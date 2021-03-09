const RepoDetails = ({ details }) => {
  return (
    <div className="repo-details-container">
      <div className="details-row">
        <label className="label">Name:</label>
        <span className="value">{details.name}</span>
      </div>
      <div className="details-row">
        <label className="label">Description:</label>
        <span className="value">{details.description}</span>
      </div>
      <div className="details-row">
        <label className="label">Language:</label>
        <span className="value">{details.language}</span>
      </div>
      <div className="details-row">
        <label className="label">Stars:</label>
        <span className="value">{details.stargazers_count}</span>
      </div>
    </div>
  );
};
export default RepoDetails;
