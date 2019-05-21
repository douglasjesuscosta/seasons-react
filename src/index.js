import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {
    
    /*Particular to Javascript, not related to React
      We'll use it to initialize the state. 
      This is a good place to do one time setup.
    */
    constructor(props) {
        /* Reference to parents constructor */
        super(props);

        //THIS IS THE ONLY TIME WE DO THIS ASSIGMENT THIS WAY
        /* Definition of state object. This object will store some important 
        information to this component. */
        this.state = { lat: null, errorMessage: '' }; //We don't know what is the value of lat in this moment. So, it'll be initialized with the value 'null'.

        
    };

    /* Component visible on screen 
       This methos is a good place to load data to component*/
    componentDidMount() {
        console.log("My component was rendered to screen");

        //CALL TO GEALOCATION METHOD - load geolocation data.
        window.navigator.geolocation.getCurrentPosition (
            /*When we use this method, we have to pass two functions as 
              callback. The first function passed as argument will be called
              in case of success and the second function will be called in case
              of failure.*/
            (position) => this.setLatitude(position),
            (err) => this.alertError(err)
        );
    }

    /* Method called when component is updated 
       This is a good place to do some data loading
       when state/props change.
    */
    componentDidUpdate() {
        console.log("My component was just updated");
    }

    /* Method called when the component is no longer shown 
       This method is used when yo're going to remove component
       from screen and want to do some cleanup. (Especially
       fom non-React stuff;)
    */
    componentWillUnmount () {
        this.setState({ lat: null, errorMessage: '' });
    }


    /* This function modify the state of this componet with the 
       recovered latitude */
    setLatitude = (position) => {

        /* We always have to use the function 'setState' to MODIFY the state of component
           We must not use 'this.state.lat = position.coords.latitude' to modify the state.
           This kind of initialization must be used just on the inicialization of the state.*/
        this.setState({ lat: position.coords.latitude });
    }

    /* Function to alert error */
    alertError = (err) => {
        this.setState({ errorMessage: err.message })
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return <div> Error: { this.state.errorMessage } </div>;

        } else if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        } 
        return <Spinner message="Please accept location request"/>
    }

    /* React says we have to define render!! 
       This method have as main function return jsx.*/
    render() {
        return (
            <div class="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render (
    <App />,
    document.querySelector('#root')
)