"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex h-full w-full items-center justify-center bg-zinc-950 p-6 text-center">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Something went wrong</h2>
            <p className="text-sm text-zinc-500">The 3D experience couldn't be loaded.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
