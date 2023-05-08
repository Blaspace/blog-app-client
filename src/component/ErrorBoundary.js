import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-ui">
          <h1>something went wrong please refresh the page</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
