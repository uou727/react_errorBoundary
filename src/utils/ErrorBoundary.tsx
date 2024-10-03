import React, { ErrorInfo } from "react";
import useErrorReporting from "./useErrorReporting";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export interface UrlParams {
  error: {
    message: string;
    stack: string;
  };
  data: {
    errTime: string;
  };
  browserInfo: {
    userAgent: string;
  };
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const urlParams: UrlParams = {
      error: { message: error.message, stack: error.stack as string },
      data: { errTime: new Date().toISOString() },
      browserInfo: { userAgent: navigator.userAgent },
    };

    const { reportError } = useErrorReporting();
    reportError(urlParams);
  }

  render() {
    if (this.state.hasError) {
      return <h1>发生错误，请稍后再试。</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
