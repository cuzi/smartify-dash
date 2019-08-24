import React, {useState, useLayoutEffect, useCallback} from 'react';

function AddDomainModal({closeFn, addDomainFn, isOpen}) {
    const [domainUrl, setDomainUrl ] = useState('');
    const onInputChange = useCallback(
        ({target}) => {
            setDomainUrl(target.value);
        },
        [setDomainUrl],
    );
    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        addDomainFn(domainUrl);
        closeFn();
    }, [addDomainFn, closeFn]);

    useLayoutEffect(() => {
        if (isOpen) {
            setDomainUrl('');
        }
    }, [isOpen]);


    return <form className={`add-domain-modal ${isOpen ? 'add-domain-modal--open' : ''}`} onSubmit={handleSubmit}>
        <h1>Add new domain</h1>
        <input
            required
            placeholder="Enter Domain"
            value={domainUrl}
            onChange={onInputChange}
            pattern="[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
        />
        <br />
        <span onClick={closeFn} className="add-domain-modal__btn">Cancel</span>
        <button className="add-domain-modal__btn" type="submit">ADD</button>
    </form>
}

export default AddDomainModal;