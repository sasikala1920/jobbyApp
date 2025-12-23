import { AiFillStar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { BsBriefcaseFill } from 'react-icons/bs';

import './index.css';

const SimilarJobItem = (props) => {
  const { jobDetails } = props;
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails;

  return (
    <li className="similar-job-item">
      <div className="logo-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-type-container">
        <div className="icon-text-container">
          <MdLocationOn className="icon" />
          <p className="icon-text">{location}</p>
        </div>
        <div className="icon-text-container">
          <BsBriefcaseFill className="icon" />
          <p className="icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  );
};

export default SimilarJobItem;