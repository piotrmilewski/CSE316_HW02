import React, { Component } from 'react';
//import { HotKeys } from "react-hotkeys"
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jstps/jsTPS.js';
import NameChangeTransaction from './jstps/NameChangeTransaction'
import MoveItemTransaction from './jstps/MoveItemTransaction'
import RemoveItemTransaction from './jstps/RemoveItemTransaction'
import EditItemTransaction from './jstps/EditItemTransaction'

/*const keyMap = {
  undo: "ctrl+z",
  redo: "ctrl+y"
};*/

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
};

class App extends Component {
  
  constructor(){
    super();
    this.tps = new jsTPS();
  }

  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    oldItem: null,
    sortByTaskDecreasing: false,
    sortByDateDecreasing: false,
    sortByStatusDecreasing: false,
    newItem: false,
    trashDialog: false
  }

  undo = (e) => {
    this.tps.undoTransaction();
    e.stopImmediatePropagation();
  }

  redo = (e) => {
    this.tps.doTransaction();
    e.stopImmediatePropagation();
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.tps.clearAllTransactions();
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
    this.tps.addTransaction(new NameChangeTransaction(key, this.state.currentList.name, e.target.value, this.nameChangeOp));
  }

  nameChangeOp = (key, name) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.name = name;
      }
      return todo;
    }) });
  }

  ownerChange = (key, e) => {
    this.tps.addTransaction(new NameChangeTransaction(key, this.state.currentList.owner, e.target.value, this.ownerChangeOp));
  }

  ownerChangeOp = (key, name) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.owner = name;
      }
      return todo;
    }) });
  }

  moveItemDown = (ItemKey, key, e) => {
    e.stopPropagation();
    this.tps.addTransaction(new MoveItemTransaction(ItemKey, key, this.moveItemDownOp, this.moveItemUpOp));
  }

  moveItemDownOp = (ItemKey, key) => {
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
  }

  moveItemUp = (ItemKey, key, e) => {
    e.stopPropagation();
    this.tps.addTransaction(new MoveItemTransaction(ItemKey, key, this.moveItemUpOp, this.moveItemDownOp));
  }

  moveItemUpOp = (ItemKey, key) => {
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
  }

  removeItem = (ItemKey, key, e) => {
    e.stopPropagation();
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== ItemKey){
      index++;
    }
    var item = this.state.todoLists[key].items[index];
    this.tps.addTransaction(new RemoveItemTransaction(key, index, this.removeItemOp, this.restoreItemOp, item));
  }

  removeItemOp = (key, index) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        this.state.todoLists[key].items.splice(index, 1);
      }
      return todo;
    }) });
  }

  restoreItemOp = (key, index, item) => {
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        this.state.todoLists[key].items.splice(index, 0, item);
      }
      return todo;
    }) });
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
    var placeH = this.state.currentList.items[index];
    placeH = JSON.parse(JSON.stringify(placeH));
    this.setState({oldItem: placeH});
    this.setState({newItem: false});
    this.goItem();
  }

  submitEditItem = (item, key) => {
    var oldItem = this.state.oldItem;
    this.tps.addTransaction(new EditItemTransaction(key, item, this.submitEditItemOp, oldItem));
  }

  submitEditItemOp = (key, item) => {
    var index = 0;
    while (this.state.todoLists[key].items[index].key !== item.key){
      index++;
    }
    this.setState({todoLists: this.state.todoLists.map(todo => {
      if (todo.key === key) {
        todo.items[index] = item;
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

  checkKeys = (e) => {
    console.log("fuck");
    console.log(e.target.value);
  }

  render() {
    /*const handlers = {
      undo: this.undo,
      redo: this.redo
    }*/
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return (<HomeScreen
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        newTodolist={this.newTodolist}/>);
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          undo={this.undo}
          redo={this.redo}
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