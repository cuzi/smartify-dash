import React, {useState, useLayoutEffect, useCallback} from 'react';

function AddDomainModal({closeFn, addDomainFn, isOpen}) {
    const [domainUrl, setDomainUrl ] = useState('');
    const [prefixInput, setPrefix ] = useState('https://');
    const onInputChange = useCallback(
        ({target}) => {
            setDomainUrl(target.value);
        },
        [setDomainUrl],
    );
    const onPrefixChange = useCallback(
        ({target}) => {
            setPrefix(target.value);
        },
        [setPrefix],
    );
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        addDomainFn(`${prefixInput}${domainUrl}`);
        closeFn();
    }, [addDomainFn, closeFn, domainUrl, prefixInput]);

    useLayoutEffect(() => {
        if (isOpen) {
            setDomainUrl('');
            setPrefix('https://');
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
        <br />
        <input type="radio" name="prefix" id="http" value="http://" checked={prefixInput === 'http://'} onChange={onPrefixChange}  /> <label htmlFor="http">http </label>
        <input type="radio" name="prefix" id="https" value="https://" checked={prefixInput === 'https://'} onChange={onPrefixChange} /> <label htmlFor="https">https</label>
        <br />
        <span onClick={closeFn} className="add-domain-modal__btn">Cancel</span>
        <button className="add-domain-modal__btn" type="submit">ADD</button>
    </form>
}

export default AddDomainModal;