"use client";

import React, { Suspense } from "react";

import Loader from "@/components/Loader";

// You can customize fallback as needed
const withSuspense = (Component, fallback = <div>Loading...</div>) => {
  return function SuspenseWrapper(props) {
    return (
      <Suspense fallback={<Loader size="screen" />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export { withSuspense };
