import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    profileData: {},
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    apiStatus: apiStatusConstants.inProgress,
    profileStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfile,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, minimumPackage, searchInput} = this.state
    const employmentTypes =
      employmentType.length > 0 ? employmentType.join(',') : ''
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobs()
  }
  changeEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.includes(id)
          ? prevState.employmentType.filter(each => each !== id)
          : [...prevState.employmentType, id],
      }),
      this.getJobs,
    )
  }
  changeSalaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobs)
  }

  renderProfile = () => {
    const {profileData, profileStatus} = this.state
    switch (profileStatus) {
      case apiStatusConstants.success:
        return (
          <div className="profile-container">
            <img src={profileData.profileImageUrl} alt="profile" />
            <h1>{profileData.name}</h1>
            <p>{profileData.shortBio}</p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <button type="button" onClick={this.getProfile}>
            Retry
          </button>
        )
      default:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
    }
  }

  renderJobsView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <Link
            to={`/jobs/${eachJob.id}`}
            className="job-item-link"
            key={eachJob.id}
          >
            <li className="job-item-card">
              <img
                src={eachJob.companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <h1>{eachJob.title}</h1>
              <p>{eachJob.rating}</p>
              <p>{eachJob.location}</p>
              <p>{eachJob.employmentType}</p>
              <h1>Description</h1>
              <p>{eachJob.jobDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus, searchInput} = this.state

    return (
      <div className="jobs-route-container">
        <Header />
        <div className="jobs-body">
          {this.renderProfile()}
          <h1>Type of Employment</h1>
          <ul>
            <li>
              <input
                type="checkbox"
                id="FULLTIME"
                onChange={() => this.changeEmploymentType('FULLTIME')}
              />
              <label htmlFor="FULLTIME">Full Time</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="PARTTIME"
                onChange={() => this.changeEmploymentType('PARTTIME')}
              />
              <label htmlFor="PARTTIME">Part Time</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="FREELANCE"
                onChange={() => this.changeEmploymentType('FREELANCE')}
              />
              <label htmlFor="FREELANCE">Freelance</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="INTERNSHIP"
                onChange={() => this.changeEmploymentType('INTERNSHIP')}
              />
              <label htmlFor="INTERNSHIP">Internship</label>
            </li>
          </ul>
          <h1>Salary Range</h1>
          <ul>
            <li>
              <input
                type="radio"
                id="10LPA"
                name="salary"
                onChange={() => this.changeSalaryRange('1000000')}
              />
              <label htmlFor="10LPA">10 LPA and above</label>
            </li>
            <li>
              <input
                type="radio"
                id="20LPA"
                name="salary"
                onChange={() => this.changeSalaryRange('2000000')}
              />
              <label htmlFor="20LPA">20 LPA and above</label>
            </li>
            <li>
              <input
                type="radio"
                id="30LPA"
                name="salary"
                onChange={() => this.changeSalaryRange('3000000')}
              />
              <label htmlFor="30LPA">30 LPA and above</label>
            </li>
            <li>
              <input
                type="radio"
                id="40LPA"
                name="salary"
                onChange={() => this.changeSalaryRange('4000000')}
              />
              <label htmlFor="40LPA">40 LPA and above</label>
            </li>
          </ul>
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.onSearch}
          >
            Search
          </button>

          {apiStatus === apiStatusConstants.success ? (
            this.renderJobsView()
          ) : apiStatus === apiStatusConstants.failure ? (
            this.renderFailureView()
          ) : (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default JobsRoute

