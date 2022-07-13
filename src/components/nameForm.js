import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {useNavigate} from "react-router-dom";
import i18n from '../i18n'

const validate = values => {
    const errors = {}
    if (!values.firstName) {
        errors.firstName = i18n.t('warnings.required')
    } else if (values.firstName.match(/\d/)) {
        errors.firstName = i18n.t('warnings.withNumbers')
    }
    if (!values.lastName) {
        errors.lastName = i18n.t('warnings.required')
    } else if (values.lastName.match(/\d/)) {
        errors.lastName = i18n.t('warnings.withNumbers')
    }
    if (!values.secondLastName) {

    } else if (values.secondLastName.match(/\d/)) {
        errors.secondLastName = i18n.t('warnings.withNumbers')
    }

    return errors
}

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label
            className="control-label">{label} {input.name === 'firstName' || input.name === 'lastName' ? ' *' : ''}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    </div>
)

let NameForm = props => {
    const {valid} = props;
    const navigate = useNavigate()

    const Test = oEvent => {
        oEvent.preventDefault()
        navigate('/set-password')
    }

    return (
        <div>
            <h3>{i18n.t('titleForm')}</h3>
            <p>{i18n.t('subTitleForm')}</p>
            <form onSubmit={Test}>
                <div className="form-group">
                    <Field name="firstName" component={renderField} label={i18n.t('labels.firstName')}/>
                </div>
                <div className="form-group">
                    <Field name="lastName" component={renderField} label={i18n.t('labels.lastName')}/>
                </div>
                <div className="form-group">
                    <Field name="secondLastName" component={renderField} label={i18n.t('labels.secondLastName')}/>
                </div>
                <div className="form-group float-right">
                    <button type="submit" disabled={!valid} className="btn btn-link">{i18n.t('buttons.next')}</button>
                </div>
            </form>
        </div>
    )
}
NameForm = reduxForm({
    form: 'nameForm',
    validate,
    destroyOnUnmount: false
})(NameForm);

export default NameForm;