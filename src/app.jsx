var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require("./header");
var List = require('./list');
var DoneList = require('./done-list');
var rootUrl = '[LINK TO FIREBASE]';

var App = React.createClass({
  mixins: [ ReactFire  ],
  getInitialState: function () {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'todos/');
    this.bindAsObject(this.fb, 'items');
    this.fb.orderByChild("text").on('child_added', this.handleDataLoaded);
  },
  render: function() {
    return <div className='row panel panel-default'>
      <div className='col-md-8 col-md-offset-2'>
        <h2 className='text-center'>
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
        <hr />
        <div className={'content ' + (this.state.loaded ? 'loaded' : '') }>
          <div className='col-md-8'>
            <List items={this.state.items} />
          </div>
          <div className='col-md-4 completed'>
            <DoneList items={this.state.items} />
            {this.deleteButton()}
          </div>
        </div>
      </div>
    </div>
  },
  deleteButton: function () {
    if(!this.state.loaded){
      return
    } else {
      return <div className='text-center'>
        <button
          type='button'
          onClick={this.onDeleteDoneClick}
          className='btn btn-success btn-block'>
          Clear Completed <span className="glyphicon glyphicon-ok"></span>
        </button>
      </div>
    }
  },
  onDeleteDoneClick: function () {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true){
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function () {
    this.setState({loaded: true})
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
