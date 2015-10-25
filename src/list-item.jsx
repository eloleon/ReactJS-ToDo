var React = require('react');
var Firebase = require('firebase');
var rootUrl = '[LINK TO FIREBASE]';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'todos/' + this.props.item.key);
    console.log(this.props.item)
  },
  render: function () {
    return <div className='input-group'>
      <span className='input-group-addon'>
        <input
          type='checkbox'
          checked={this.state.done}
          onChange={this.handleDoneChange}/>
      </span>
      <input
        type='text'
        className='form-control'
        disabled={this.state.done}
        value={this.state.text}
        onChange={this.handleTextChange}
        />
      <span className='input-group-btn'>
        {this.changesButtons()}
        <button
          className='btn btn-danger'
          onClick={this.handleDeleteClick}>Delete <span className='glyphicon glyphicon-trash'></span></button>
      </span>
    </div>
  },
  changesButtons: function () {
    if(!this.state.textChanged){
      return null;
    } else {
      return <span>
        <button
          className='btn btn-default'
          onClick={this.handleSaveClick}>Save</button>
        <button
          className='btn btn-default'
          onClick={this.handleUndoClick}>Undo</button>
      </span>
    }
  },
  handleDoneChange: function (event) {
    var update = {done: event.target.checked, doneTime: new Date()};
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function () {
    this.fb.remove();
  },
  handleTextChange: function () {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleUndoClick: function () {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleSaveClick: function () {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  }
})
