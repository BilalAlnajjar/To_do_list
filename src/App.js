import React from "react";
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskValue: ''
    }
  }

  handleChange = (event) => {
    this.setState({ taskValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.tasks;
    arr.push(this.state.taskValue);
    this.setState({ tasks: arr });
  }

  deleteItem = (i) => {
    const filterArr = this.state.tasks.filter((element, index) => index != i);
    this.setState({ tasks: filterArr });
  }

  render() {
    return (
      <section className="container">
        <form className="head" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="enter you task" className="inpHead" onChange={this.handleChange} />
          <button className="btnHead" > add </button>
        </form>

        <div className="lists" >
          {this.state.tasks.map((element, index) =>
            <div className="listItem">
              <p> {element}</p>
              <div>
                <button className="btnEdit" >edit</button>
                <button className="btnDelete" onClick={() => this.deleteItem(index)} >delete</button>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default App;