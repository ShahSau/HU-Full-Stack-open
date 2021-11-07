import PropTypes from 'prop-types'
const Success = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="success">
      {message}
    </div>
  )
}
Success.prototype={
  message:PropTypes.string.isRequired
}
export default Success