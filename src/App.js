import React from "react";
import './App.css'
import Toast from "sweetalert2";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // tasks: [{title: "task1", isChecked: false}, {title: "task2", isChecked: true}]
      tasks: this.getStoredTasks(),
      taskValue: ''
    }

  }

  //this function to get stored tasks from localStorage
  getStoredTasks = () => {
    return (
      //this condition to check if there are sotored tasks in localStorage or if there is no stored value (null);  it will return [] to avoid an error case 
      !!localStorage.getItem('tasks') ?
      //that's to transform stored tasks value from A JSON string to its original value //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?retiredLocale=ar
      JSON.parse(localStorage.getItem('tasks'))
      :[]
    );
  }

  handleChange = (event) => {
    this.setState({ taskValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.tasks;

    const newTask = {title:this.state.taskValue, isChecked: false};
    let arrTitle = [];

    if(newTask.title) {
      if (arr.length > 0) {
        arrTitle = this.state.tasks.map((element) => {
          return element.title;
        })
        if (!arrTitle.includes(newTask.title)) {
          arr.push(newTask)
          this.setState({tasks: arr, taskValue: ""});
          Toast.fire({
            icon: 'success',
            title: 'Task created successfully'
          })
        }else {

          Toast.fire({
            icon: 'error',
            title: 'The task is already found'
          })
        }

      } else {
        arr.push(newTask)
        this.setState({tasks: arr, taskValue: ""});
        Toast.fire({
          icon: 'success',
          title: 'Task created successfully'
        })
      }
    }else {
      Toast.fire({
        icon: 'error',
        title: 'The task input is empty'
      })
    }

    //store new tasks value in the localStorage by convert the array to a JSON string to enable get a transformable value in the next time 
    //(1) "store array in localStorage": https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
    //(2) "JSON.stringify": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  deleteItem = (i) => {
    const filterArr = this.state.tasks.filter((element, index) => index !== i);
    this.setState({ tasks: filterArr });

    //store new tasks value in the localStorage by convert the array to a JSON string to enable get a transformable value in the next time 
    //(1) "store array in localStorage": https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
    //(2) "JSON.stringify": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  toggleChange =(event,index) =>{
    let tasks = this.state.tasks;
    tasks[index].isChecked = event.target.checked;
    this.setState({
      tasks: tasks
    });

    //store new tasks value in the localStorage by convert the array to a JSON string to enable get a transformable value in the next time 
    //(1) "store array in localStorage": https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
    //(2) "JSON.stringify": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  render() {
    return (
        <section className="container">
          <form className="head" onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.taskValue} placeholder="enter you task" className="inpHead" onChange={this.handleChange} />
            <button className="btnHead" > add </button>
          </form>

        <div className="lists" >
          {this.state.tasks.map((element, index) =>
            <div className="listItem" key={index}>
              <input key={index} type="checkbox" defaultChecked={element.isChecked} onChange={(event) => this.toggleChange(event, index)}/>
              <p id={'para-'+index} className={element.isChecked ? "checked" : ""}> {element.title}</p>
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