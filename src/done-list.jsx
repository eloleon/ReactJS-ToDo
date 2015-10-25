var React = require('react');
var DoneListItem = require('./done-list-item');

module.exports = React.createClass({
  render: function () {
    return <div className='list-group done-list'>
      {this.renderList()}
    </div>
  },
  renderList: function () {
    if(!this.props.items){
      return <p>
        No tasks completed today
      </p>
    } else {
      var children = [];

      for(var key in this.props.items) {
        var item = this.props.items[key];
        item.key = key;

        if(item.done){
          children.push(
            <DoneListItem item={item} key={key} />
          )
        }
      }
      return children;
    }
  }
})
