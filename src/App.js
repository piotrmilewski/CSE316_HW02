import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    sortByTaskDecreasing: false,
    sortByDateDecreasing: false,
    sortByStatusDecreasing: false,
    newItem: false,
    trashDialog: false
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  goItem = () => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  goList = () => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  nameChange = (key, e) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.name = e.target.value;
      }
      return todo;
    }) });
  }

  ownerChange = (key, e) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.owner = e.target.value;
      }
      return todo;
    }) });
  }

  moveItemDown = (ItemKey, key, e) => {
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== ItemKey){
      index++;
    }
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        this.state.todoLists[key].items.splice(
          index+1, 0, this.state.todoLists[key].items.splice(index, 1)[0]
        );
      }
      return todo;
    }) });
    e.stopPropagation();
  }

  moveItemUp = (ItemKey, key, e) => {
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== ItemKey){
      index++;
    }
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        this.state.todoLists[key].items.splice(
          index-1, 0, this.state.todoLists[key].items.splice(index, 1)[0]
        );
      }
      return todo;
    }) });
    e.stopPropagation();
  }

  removeItem = (ItemKey, key, e) => {
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== ItemKey){
      index++;
    }
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        this.state.todoLists[key].items.splice(index, 1);
      }
      return todo;
    }) });
    e.stopPropagation();
  }

  sortTasks = (key, e) => {
    if (this.state.sortByTaskDecreasing)
      this.setState({sortByTaskDecreasing: false});
    else
      this.setState({sortByTaskDecreasing: true});
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.items.sort(this.taskCompare.bind(this));
      }
      return todo;
    }) });
  }

  taskCompare(item1, item2) {
    if (this.state.sortByTaskDecreasing){
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    if (item1.description < item2.description)
      return -1;
    else if (item1.description > item2.description)
      return 1;
    else
      return 0;
  }

  sortDates = (key) => {
    if (this.state.sortByDateDecreasing)
      this.setState({sortByDateDecreasing: false});
    else
      this.setState({sortByDateDecreasing: true});
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.items.sort(this.dateCompare.bind(this));
      }
      return todo;
    }) });
  }

  dateCompare(item1, item2) {
    if (this.state.sortByDateDecreasing){
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    if (item1.due_date < item2.due_date)
      return -1;
    else if (item1.due_date > item2.due_date)
      return 1;
    else
      return 0;
  }

  sortStatuses = (key) => {
    if (this.state.sortByStatusDecreasing)
      this.setState({sortByStatusDecreasing: false});
    else
      this.setState({sortByStatusDecreasing: true});
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.items.sort(this.statusCompare.bind(this));
      }
      return todo;
    }) });
  }

  statusCompare(item1, item2) {
    if (this.state.sortByStatusDecreasing){
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    if (item1.completed < item2.completed)
      return -1;
    else if (item1.completed > item2.completed)
      return 1;
    else
      return 0;
  }

  createNewItem = (key) => {
    this.setState({currentItem: {
      assigned_to: "",
      completed: false,
      description: "",
      due_date: "",
      key: key
    }});
    this.setState({newItem: true});
    this.goItem();
  }

  submitNewItem = (item, key) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.items.push(item);
      }
      return todo;
    }) });
    this.goList();
  }

  editItem = (key, itemKey) => {
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== itemKey){
      index++;
    }
    this.setState({currentItem: this.state.currentList.items[index]});
    this.setState({newItem: false});
    this.goItem();
  }

  submitEditItem = (item, key) => {
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== item.key){
      index++;
    }
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        this.state.todoLists[key].items[index] = item;
      }
      return todo;
    }) });
    this.goList();
  }

  cancelNewEditItem = () => {
    this.setState({currentItem: null});
    this.goList();
  }

  newTodolist = () => {
    var newTodo = {
      key: new Date().getTime(),
      name: "Unknown",
      owner: "Unknown",
      items: []
    }
    this.setState({todoLists: this.state.todoLists.concat(newTodo)});
    this.setState({currentList: newTodo});
    this.goList();
  }

  confirmDialogTrash = () => {
    this.setState({trashDialog: true});
  }

  deleteTodo = () => {
    this.setState({trashDialog: false});
    setTimeout(function(){
      this.setState({todoLists: [...this.state.todoLists.filter((todo) =>
        todo.key !== this.state.currentList.key  
      )]});
      this.goHome();
    }.bind(this), 500);
  }

  dontDeleteTodo = () => {
    this.setState({trashDialog: false});
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        newTodolist={this.newTodolist}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          deleteTodo={this.deleteTodo}
          dontDeleteTodo={this.dontDeleteTodo}
          confirmDialogTrash={this.confirmDialogTrash}
          trashDialog={this.state.trashDialog}
          editItem={this.editItem}
          createNewItem={this.createNewItem}
          sortTasks={this.sortTasks}
          sortDates={this.sortDates}
          sortStatuses={this.sortStatuses}
          removeItem={this.removeItem}
          moveItemUp={this.moveItemUp}
          moveItemDown={this.moveItemDown}
          ownerChange={this.ownerChange}
          nameChange={this.nameChange}
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          newItem={this.state.newItem}
          currentScreen={this.state.currentScreen}
          todoItem={this.state.currentItem}
          todoListKey={this.state.currentList.key}
          submitNewItem={this.submitNewItem}
          submitEditItem={this.submitEditItem}
          cancelNewEditItem={this.cancelNewEditItem}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;