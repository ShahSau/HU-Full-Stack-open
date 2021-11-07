import PropTypes from 'prop-types'
const Success = ({message})=>{
    if (message === null){
        return null
    }

    return (
        <div className="success">
            {message}
        </div>
    )
}
Success.prototype={
    message:PropTypes.string.isRequired
}
export default Success