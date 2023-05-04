import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = () => {
    return (
        <div className="app">
            <h1>Hello React TypeScript App!</h1>
            <div>
                <img src="https://media.giphy.com/media/tPjlmJzj9Z99vwF5dV/giphy.gif" width="50%" alt="гивка" />
            </div>
        </div>

    )
};

ReactDOM.render(<App />, document.getElementById('root'));
