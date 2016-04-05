'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoApp = function (_React$Component) {
  _inherits(TodoApp, _React$Component);

  function TodoApp(props, context) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.state = { items: [], input: '', count: 0 };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleAdd = _this.handleAdd.bind(_this);
    return _this;
  }

  TodoApp.prototype.updateItems = function updateItems(newItem) {
    var allItems = this.state.items.concat([newItem]);
    this.setState({ items: allItems });
    this.setState({ count: this.state.count + 1 });
  };

  TodoApp.prototype.handleChange = function handleChange(e) {
    this.setState({ input: e.target.value });
  };

  TodoApp.prototype.handleAdd = function handleAdd(e) {
    if (e.which == 13) {
      e.preventDefault();
      this.updateItems(this.state.input);
      this.setState({ input: '' });
    }
  };

  TodoApp.prototype.render = function render() {
    return React.createElement(
      'section',
      { className: 'todoapp' },
      React.createElement(TodoBanner, { handleChange: this.handleChange, handleAdd: this.handleAdd, input: this.state.input }),
      React.createElement(
        'section',
        { className: 'main' },
        React.createElement('input', { className: 'toggle-all', type: 'checkbox' }),
        React.createElement(
          'label',
          { htmlFor: 'toggle-all' },
          'Mark all as complete'
        ),
        React.createElement(TodoList, { items: this.state.items, className: 'todo-list' })
      ),
      React.createElement(
        'footer',
        { className: 'footer' },
        React.createElement(
          'span',
          { className: 'todo-count' },
          this.state.count,
          ' items left'
        ),
        React.createElement(
          'button',
          { className: 'clear-completed' },
          'Clear completed'
        )
      )
    );
  };

  return TodoApp;
}(React.Component);

var TodoList = function (_React$Component2) {
  _inherits(TodoList, _React$Component2);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  TodoList.prototype.render = function render() {
    var createItem = function createItem(itemText) {
      return React.createElement(
        TodoItem,
        null,
        itemText
      );
    };
    return React.createElement(
      'ul',
      { className: 'todo-list' },
      this.props.items.map(createItem)
    );
  };

  return TodoList;
}(React.Component);

var TodoItem = function (_React$Component3) {
  _inherits(TodoItem, _React$Component3);

  function TodoItem() {
    _classCallCheck(this, TodoItem);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  TodoItem.prototype.render = function render() {
    return React.createElement(
      'li',
      null,
      React.createElement(
        'div',
        { className: 'view' },
        React.createElement('input', { className: 'toggle', type: 'checkbox' }),
        React.createElement(
          'label',
          null,
          ' ',
          this.props.children,
          ' '
        ),
        React.createElement('button', { className: 'destroy' })
      )
    );
  };

  return TodoItem;
}(React.Component);

var TodoBanner = function (_React$Component4) {
  _inherits(TodoBanner, _React$Component4);

  function TodoBanner() {
    _classCallCheck(this, TodoBanner);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  TodoBanner.prototype.render = function render() {
    return React.createElement(
      'header',
      { className: 'header' },
      React.createElement(
        'h1',
        null,
        'todos'
      ),
      React.createElement('input', { className: 'new-todo', placeholder: 'What needs to be done?', autofocus: true,
        value: this.props.input,
        onChange: this.props.handleChange.bind(this),
        onKeyPress: this.props.handleAdd.bind(this) })
    );
  };

  return TodoBanner;
}(React.Component);

var CountDisplay = function (_React$Component5) {
  _inherits(CountDisplay, _React$Component5);

  function CountDisplay() {
    _classCallCheck(this, CountDisplay);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  return CountDisplay;
}(React.Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));