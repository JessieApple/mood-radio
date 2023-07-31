import React from 'react';

const Dropdown = (props) => {
    const changeDropDown = (e) => {
        props.change(e.target.value); 
    }

    return (
        <div>
            <label>{props.label}</label>
            <select value={props.selectedValue} onChange={changeDropDown}>
                <option>Select...</option>
                {props.options.map((option, index) => <option key={index+1} value={option.id}>{option.name}</option>)}
            </select>
        </div>
    );
}

export default Dropdown; 