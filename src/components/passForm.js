import React, {useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import i18n from '../i18n'

const validate = values => {
    const errors = {}
    if (!values.pass) {
        errors.pass = i18n.t('warnings.required')
    } else if (values.pass.length < 6) {
        errors.pass = i18n.t('warnings.notEnoughCharacters')
    } else if (!values.pass.match(/[A-Z]+[0-9]*/)) {
        errors.pass = i18n.t('warnings.needUpCharacterAndNumber')
    }

    if (!values.repeatPass) {
        errors.repeatPass = i18n.t('warnings.required')
    } else if (values.repeatPass !== values.pass) {
        errors.repeatPass = i18n.t('warnings.notSamePassword')
    }

    if (!values.clue) {

    } else if (values.clue.includes(values.pass)) {
        errors.clue = i18n.t('warnings.clueSameAsPassword')
    } else if (values.clue.length < 6) {
        errors.clue = i18n.t('warnings.notEnoughCharactersClue')
    } else if (values.clue.length > 20) {
        errors.clue = i18n.t('warnings.clueToLarge')
    }

    return errors
}

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label
            className="control-label">{label} {input.name === 'pass' || input.name === 'repeatPass' ? ' *' : ''}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    </div>
)

let PassForm = props => {
    const firstName = useSelector(state => state?.form?.nameForm?.values?.firstName)
    const lastName = useSelector(state => state?.form?.nameForm?.values?.lastName)
    const navigate = useNavigate()

    useEffect(() => {
        if (!firstName && !lastName) {
            navigate("/")
        }
    }, []);

    const Test = oEvent => {
        oEvent.preventDefault()
        navigate('/success')
    }

    const goBack = oEvent => {
        oEvent.preventDefault()
        navigate('/')
    }
    const {valid} = props;
    return (
        <div>
            <h3>{i18n.t('titleForm')}</h3>
            <p>{i18n.t('subTitleForm')}</p>
            <form onSubmit={Test}>
                <div className="form-group">
                    <Field name="pass" type="password" component={renderField} label={i18n.t('labels.password')}/>
                </div>
                <div className="form-group">
                    <Field name="repeatPass" type="password" component={renderField}
                           label={i18n.t('labels.repeatPassword')}/>
                </div>
                <div className="form-group">
                    <Field name="clue" component={renderField} label={i18n.t('labels.clue')}/>
                </div>
                <div className="form-group float-left">
                    <button onClick={goBack} className="btn btn-link">{i18n.t('buttons.back')}</button>
                </div>
                <div className="form-group float-right">
                    <button type="submit" disabled={!valid} className="btn btn-link">{i18n.t('buttons.next')}</button>
                </div>

            </form>
        </div>
    )
}
PassForm = reduxForm({
    form: 'passForm',
    validate,
    destroyOnUnmount: false
})(PassForm);

export default PassForm;