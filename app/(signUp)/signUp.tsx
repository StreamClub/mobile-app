import { SignUpScreen } from '../../screens/SignUpScreen';
const config = require('../../config.json');

export default function Page() {
    const handleSingUpSubmit = (email: string, password: string) => {
        const body = {
            "email": email,
            "password": password,
            "validationCode": "123"
        }
        console.log(body);
        fetch(config.backend + "/users/register", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.log(error);   
        })
    }
    return (
        <SignUpScreen onNext={handleSingUpSubmit}/>
    );
}