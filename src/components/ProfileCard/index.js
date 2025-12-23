// This is a simple functional component for the profile.
const ProfileCard = ({ profileDetails }) => {
  const { name, profileImageUrl, shortBio } = profileDetails;

  return (
    <div className="profile-card-container">
      <img src={profileImageUrl} alt="profile" className="profile-img" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  );
};

export default ProfileCard;