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
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
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
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          removeItem={this.removeItem}
          moveItemUp={this.moveItemUp}
          moveItemDown={this.moveItemDown}
          ownerChange={this.ownerChange}
          nameChange={this.nameChange}
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;