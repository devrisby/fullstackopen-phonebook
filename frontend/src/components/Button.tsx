interface PropTypes {
    label: string;
    action?: () => void;
    type: 'submit' | 'reset' | 'button' | undefined;
}

const Button = ({label, action, type}: PropTypes) => {
    return <button type={type} onClick={action}>{ label }</button>
}

export default Button;