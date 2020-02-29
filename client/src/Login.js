import React from 'react';
import logo from './logo.svg';
import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    /*componentWillMount() {
        const url = 'http://localhost:9000/testApi/users'
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => console.log(data));

    }*/

    handleLogin(event) {
        fetch('http://localhost:9000/testApi/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 username: this.state.username,
                  password: this.state.password 
                })
        }).then(function (response) {
            return response;
        }).then(function (data) {
            console.log('Output:', data);
        });
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <label>
                            Username:
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </label>
                        <br />
                        <input type="button" value="Submit" onClick={this.handleLogin}/>
                    </div>
                </header>
            </div>
        );
    }
}

export default Login;
