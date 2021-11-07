import PropTypes from 'prop-types'
const ErrorMessage = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className='error'>
      {message}
    </div>
  )
}
ErrorMessage.prototype={
  message:PropTypes.string.isRequired
}
export default ErrorMessage