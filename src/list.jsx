var React = require('react');
var ListItem = require('./list-item')

module.exports = React.createClass({
    render: function () {
        return <div>
            {this.renderList()}
        </div>
    },
    renderList: function () {
        if (!this.props.items){
            return <div className='alert alert-info text-center'>
                Add ToDo to get started!
              </div>
        } else {
            var children = [];

            for(var key in this.props.items) {
                var item = this.props.items[key];
                item.key = key;
                if (!item.done){
                  children.push(
                      <ListItem  item={item} key={key} />
                  )
                }
            }
            return children;
        }
    }
})
