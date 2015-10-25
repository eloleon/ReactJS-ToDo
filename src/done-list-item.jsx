var React = require('react');
var Moment = require('moment');

module.exports = React.createClass({
  render: function () {
    var moment = Moment(this.props.item.doneTime);
    return <span className='list-group-item'>
      <h5 className='list-group-item-heading'>{this.props.item.text}</h5>
      <small>{moment.fromNow()}</small>
    </span>
  }
})
