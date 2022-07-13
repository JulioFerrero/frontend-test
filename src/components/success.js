import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import i18n from '../i18n'

function Success() {
    const {firstName, lastName, secondLastName} = useSelector(state => state?.form?.nameForm?.values) || {};

    const {clue, pass} = useSelector(state => state?.form?.passForm?.values) || {};

    const navigate = useNavigate()

    useEffect(() => {
        if (!firstName && !lastName && !pass) {
            navigate("/")
        }
    }, []);

    const fullName = [firstName, lastName, secondLastName].filter(Boolean).join(' ');

    return (
        <div>
            <h3>{i18n.t('titleAccountCreated')}</h3>
            <p>{i18n.t('subTitleAccountCreated', {fullName})}</p>
            {clue &&
                <>
                    <p>{i18n.t('clueHint')}</p>
                    <b>{clue}</b>
                </>}
        </div>
    )
}

export default Success;