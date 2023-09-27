import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import { Test } from "./Test.jsx";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />,
		},
		{
			path: "/test",
			element: <Test />,
		},
	],
	{ basename: "/ahlcg-tokens" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
