import React from "react";

// components

import MapExample from "components/Maps/MapExample.js";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
            <MapExample />
          </div>
        </div>
      </div>
    </>
  );
}
