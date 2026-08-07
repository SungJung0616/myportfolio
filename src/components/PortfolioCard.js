import React from 'react';

const PortfolioCard = ({ title, description, imgSrc, link, liveLink, type }) => (
  <article className="archive-card">
    <img src={imgSrc} alt={`${title} project preview`} />
    <div className="archive-copy">
      <p className="project-type">{type}</p><h3>{title}</h3><p>{description}</p>
      <div className="project-links"><a href={link} target="_blank" rel="noreferrer">Code ↗</a>{liveLink && <a href={liveLink} target="_blank" rel="noreferrer">Live ↗</a>}</div>
    </div>
  </article>
);

export default PortfolioCard;
