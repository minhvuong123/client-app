
import './form-input.scss';

function FormInput({ value, onChange, label, errorMessage, ...inputProps }: any) {
	return (
		<div className={`form-input ${inputProps.classWrap}`}>
		 	{ label && <label className="input-label">{label}</label> }
			<input className={inputProps.classInput} {...inputProps} defaultValue={value} onChange={(event) => onChange(event)} />
			{ errorMessage && <span className="input-error">{errorMessage}</span> } 
		</div>
	);
}

export default FormInput;
