// This component manages the Employment Type and Salary Range filters.

const FiltersGroup = props => {
  const renderSalaryRangesList = () => {
    const {salaryRangesList, changeSalaryRange} = props

    return (
      <ul className="filters-list">
        {salaryRangesList.map(range => (
          <li
            className="filters-list-item"
            key={range.salaryRangeId}
            onChange={() => changeSalaryRange(range.salaryRangeId)}
          >
            <input
              type="radio"
              id={range.salaryRangeId}
              name="salaryRange"
              className="checkbox-input"
            />
            <label className="checkbox-label" htmlFor={range.salaryRangeId}>
              {range.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderEmploymentTypesList = () => {
    const {employmentTypesList, changeEmploymentType} = props

    return (
      <ul className="filters-list">
        {employmentTypesList.map(type => (
          <li
            className="filters-list-item"
            key={type.employmentTypeId}
            onChange={() => changeEmploymentType(type.employmentTypeId)}
          >
            <input
              type="checkbox"
              id={type.employmentTypeId}
              className="checkbox-input"
            />
            <label className="checkbox-label" htmlFor={type.employmentTypeId}>
              {type.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="filters-group-container">
      {/* Employment Type Filter */}
      <h1 className="filters-heading">Type of Employment</h1>
      {renderEmploymentTypesList()}
      <hr className="separator" />

      {/* Salary Range Filter */}
      <h1 className="filters-heading">Salary Range</h1>
      {renderSalaryRangesList()}
    </div>
  )
}

export default FiltersGroup
