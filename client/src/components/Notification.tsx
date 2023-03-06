interface PropTypes {
    message: string;
    error: boolean;
}

const Notification = ({message, error}: PropTypes) => {
    
    return message 
    ? (
        <div className={`notification ${error ? 'error': ''}`}>
            { message }
        </div>
    )
    : null
}

export default Notification;