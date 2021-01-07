import React, { Fragment, useState } from "react";

const Register = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = 
    inputs;
    
    //need onchange function otherwise the user wont be able to delete the placehodler
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    }

    const onSubmitForm = async e => {
        //by default it would refresh
        e.preventDefault()

        try{
            const response = await fetch("http:")

        }catch(err) {
            console.error(err.message)
        }
    }

return (
    <Fragment>
        <h1>Register</h1>

        <form onSubmit={onSubmitForm}>
            <input 
            type="email" 
            name="email" 
            placeholder="email" 
            value={email} 
            onChange= {e => onChange(e)}
            />
            
            <input 
            type="password" 
            name="password" 
            placeholder="password"
            value={password} 
            onChange= {e => onChange(e)}
            />
            <input 
            type="text" 
            name="text" 
            placeholder="name"
            value={name} 
            onChange= {e => onChange(e)}
            />
            <button>Submit</button>
        </form>
    </Fragment>
);

};

export default Register;