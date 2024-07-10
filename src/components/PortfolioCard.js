import React from 'react';

const PortfolioCard = ({ title, description, imgSrc, link, liveLink, type }) => {
  return (
    <div className="item">
      <img src={imgSrc} alt={title} />
      <div className="info">
        <h4>{title}</h4>
        <p>{description}</p>
        <p><strong>Type:</strong> {type}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">View on GitHub <i className='bx bx-link-external'></i></a>
        {liveLink && (
          <a href={liveLink} target="_blank" rel="noopener noreferrer">Visit Site <i className='bx bx-link-external'></i></a>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
