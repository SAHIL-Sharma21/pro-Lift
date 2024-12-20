'use client'

import React, {Component, ErrorInfo, ReactNode} from "react";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State>{
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(): State {
        return {hasError: true};
    }


    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("UnCaught Error:", error, errorInfo);
    }

    public render(): ReactNode {
        if(this.state.hasError){
            return this.props.fallback || <h1>Sorry... there was an error</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;