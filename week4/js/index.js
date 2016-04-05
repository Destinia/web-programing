"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 計算機 App

var CalcApp = function (_React$Component) {
  _inherits(CalcApp, _React$Component);

  function CalcApp(props) {
    _classCallCheck(this, CalcApp);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      number: 0,
      answer: 0,
      operator: "none",
      storeop: "none"
      // TODO
    };
    return _this;
  }

  CalcApp.prototype.resetState = function resetState() {
    this.setState({
      number: 0,
      answer: 0,
      operator: "none",
      storeop: "none" });
    // TODO
  };

  CalcApp.prototype.showNotImplemented = function showNotImplemented() {
    console.warn('This function is not implemented yet.');
  };

  CalcApp.prototype.setNumber = function setNumber(num) {
    if (this.state.number.toString().length >= 9) {
      return;
    }
    console.log(this.state.operator);
    if (this.state.operator !== "none") {
      if (this.state.operator === "equal") {
        this.setState({ number: num, answer: 0, operator: "none", storeop: "none" });
      } else {
        var cur_num = this.state.number;
        var cur_op = this.state.operator;
        this.setState({ answer: cur_num, storeop: cur_op, number: num, operator: "none" });
      }
    } else {
      this.setState({ number: this.state.number * 10 + num });
    }
    console.log(this.state.number);
  };

  CalcApp.prototype.handleOperator = function handleOperator(op) {

    if (op === "add" || op === "min" || op === "mul" || op === "div") {
      this.setState({ operator: op });
      if (this.state.storeop === "add") {
        this.setState({ number: this.state.answer + this.state.number, storeop: "" });
      } else if (this.state.storeop === "min") {
        this.setState({ number: this.state.answer - this.state.number, storeop: "" });
      } else if (this.state.storeop === "mul") {
        this.setState({ number: this.state.answer * this.state.number, storeop: "" });
      } else if (this.state.storeop === "div") {
        this.setState({ number: this.state.answer / this.state.number, storeop: "" });
      }
    } else if (op === "equal" && this.state.operator !== "equal") {
      console.log(this.state.storeop);
      var output;
      if (this.state.storeop === "add") {
        output = this.state.answer + this.state.number;
      } else if (this.state.storeop === "min") {
        output = this.state.answer - this.state.number;
      } else if (this.state.storeop === "mul") {
        output = this.state.answer * this.state.number;
      } else if (this.state.storeop === "div") {
        output = this.state.answer / this.state.number;
      }
      this.setState({ number: output, operator: "equal" });
    }
  };

  CalcApp.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "calc-app" },
      React.createElement(
        "div",
        { className: "calc-container" },
        React.createElement(
          "div",
          { className: "calc-output" },
          React.createElement(
            "div",
            { className: "calc-display" },
            this.state.number.toString().substr(0, 8)
          )
        ),
        React.createElement(
          "div",
          { className: "calc-row" },
          React.createElement(
            CalcButton,
            { op: this.resetState.bind(this) },
            "AC"
          ),
          React.createElement(
            CalcButton,
            { op: this.showNotImplemented.bind(this) },
            "+/-"
          ),
          React.createElement(
            CalcButton,
            { op: this.showNotImplemented.bind(this) },
            "%"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-operator", op: this.handleOperator.bind(this, "div") },
            "÷"
          )
        ),
        React.createElement(
          "div",
          { className: "calc-row" },
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 7) },
            "7"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 8) },
            "8"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 9) },
            "9"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-operator", op: this.handleOperator.bind(this, "mul") },
            "x"
          )
        ),
        React.createElement(
          "div",
          { className: "calc-row" },
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 4) },
            "4"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 5) },
            "5"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 6) },
            "6"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-operator", op: this.handleOperator.bind(this, "min") },
            "-"
          )
        ),
        React.createElement(
          "div",
          { className: "calc-row" },
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 1) },
            "1"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 2) },
            "2"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 3) },
            "3"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-operator", op: this.handleOperator.bind(this, "add") },
            "+"
          )
        ),
        React.createElement(
          "div",
          { className: "calc-row" },
          React.createElement(
            CalcButton,
            { className: "calc-number", op: this.setNumber.bind(this, 0) },
            "0"
          ),
          React.createElement(
            CalcButton,
            { className: "calc-number" },
            "."
          ),
          React.createElement(
            CalcButton,
            { className: "calc-operator", op: this.handleOperator.bind(this, "equal") },
            "="
          )
        )
      )
    );
  };

  return CalcApp;
}(React.Component);

var CalcButton = function (_React$Component2) {
  _inherits(CalcButton, _React$Component2);

  function CalcButton() {
    _classCallCheck(this, CalcButton);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  CalcButton.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var onClick = _props.onClick;

    return React.createElement(
      "div",
      {
        className: children == 0 ? 'calc-0' : 'calc-btn ' + (className ? className : ''),
        onClick: this.props.op
      },
      children
    );
  };

  return CalcButton;
}(React.Component);

CalcButton.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

CalcButton.defaultProps = {
  onClick: function onClick() {}
};

ReactDOM.render(React.createElement(CalcApp, null), document.getElementById('root'));