import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';

const Work = () => {
  return (
    <div className="works" id="works">
      <div className="left">
        <h3><FontAwesomeIcon icon={faCircleSolid} /> Recent Works</h3>
        <div className="works-list">
          <div className="item">
            <div className="work-info">
              <h5 className="active">QA Engineer</h5>
              <p>2021 - Present</p>
            </div>
            <p>Studio Sai, Seattle, Washington</p>
          </div>
          <div className="item">
            <div className="work-info">
              <h5>Database Manager</h5>
              <p>2016 - 2021</p>
            </div>
            <p>Gps Logix INC., Carson, California</p>
          </div>
          <div className="item">
            <div className="work-info">
              <h5>3PL Warehouse Manager</h5>
              <p>2013 - 2015</p>
            </div>
            <p>Gps Logix INC., Portland, Oregon</p>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="item">
          <a href="#">About My Work</a>
          <p>I have delivered high-quality services that prioritize user experience across various projects. My goal is to grow as a developer who creates programs that combine technical excellence with user-friendliness. Additionally, I focus on achieving the best results through collaboration and continuous improvement.</p>
        </div>
        <div className="item">
          <a href="#">Design Solutions</a>
          <p>Ways to solve design challenges with creative approaches.</p>
        </div>
        <div className="item">
          <a href="#">Responsive Design</a>
          <p>Ensuring a seamless user experience across all devices.</p>
        </div>
        <div className="item">
          <a href="#">Research and Testing</a>
          <p>Utilizing data-driven insights to ensure user satisfaction and eliminate potential issues.</p>
        </div>
        <div className="item">
          <a href="#">Collaborative Projects</a>
          <p>Collaborating with cross-functional teams to ensure seamless project execution and successful delivery.</p>
        </div>
      </div>
    </div>
  )
}

export default Work
