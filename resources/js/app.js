import React from 'react';
import ReactDOM from 'react-dom';
import MemberSignupForm from "./pages/MemberSignupForm";

function App() {
    return (
        <MemberSignupForm/>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
