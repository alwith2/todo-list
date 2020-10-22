import React from 'react';
import TodoList from './TodoList'
import Todo from './Todo'

class App extends React.Component {
  constructor(props) {
    super(props);
    // create state
    this.state = {
      inputValue: '',
      todoArr: []
    };

    //event handlers
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    this.handleTodoComplete = this.handleTodoComplete.bind(this);
  }
  //local storage
  componentDidUpdate() {
    console.log('componentDidUpdate');
    localStorage.setItem('todos', JSON.stringify(this.state.todoArr));

  }

  componentDidMount() {
    console.log('componentDidMount');
    var json = localStorage.getItem('todos');
    if (json != null) {
      var tempArr = JSON.parse(json);
      this.setState({
        todoArr: tempArr
      });
    }

  }
  // input 
  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  // add todos
  handleAddTodo(e) {
    console.log("hello");
    const tempArr = this.state.todoArr;
    tempArr.push({
      id: Date.now(), name: this.state.inputValue, complete: false
    })
    this.setState({
      todoArr: tempArr
    });

  }
  // on todo item call parents to handle change
  handleTodoUpdate(e) {
    console.log(e.target.id);
    // set the id of the item that was checked
    var wasCheckedID = e.target.id;
    const tempArr = this.state.todoArr;
    // set the function here
    // look at each element (todo) and compare the todo's id with the item that was checked
    const isInToDoList = (element) => element.id == wasCheckedID;
    var index = tempArr.findIndex(isInToDoList);
    // set the item's complete property to be opposite of what it is now, at the index
    tempArr[index].complete = !tempArr[index].complete
    // console.log(index);
    // console.log(tempArr[index]);
    // console.log(!tempArr[index].complete);

    this.setState({
      todoArr: tempArr
    });
  }

  handleTodoComplete(e) {
    var itemCompleted = e.target.id;
    const tempArr = this.state.todoArr;
    const isComplete = (element) => element.id !== itemCompleted;
    var filteredArr = tempArr.filter(tempItem => tempItem.id !== itemCompleted);
    
    this.setState({
      todoArr: filteredArr
    });

  }

  // todoCompleted() {
  //   const itemCompleted = this.state.todoArr;
  //   if (itemCompleted === true) {
  //     // .filter(item.completed = true)
  //     this.setState({

  //     });
  //   }

  // handleSubmit(e) {
  //   this.setState({
  //  value: e.target.value
  //   });
  // }

  // items={this.state.todoArr}
  // markAsCompleted={this.MarkAsCompleted}
  // removeTask={this.removeTask}




  render() {
    return (

      <>
        <TodoList todos={this.state.todoArr} grandParentChangeHandler={this.handleTodoUpdate} />
        <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
        <button onClick={this.handleAddTodo} > Add Todo</button>
        <button onClick={this.handleTodoComplete} > Completed</button>
        <div>0 left to do</div>
      </>
    )
  }
}

export default App;
