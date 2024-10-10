import './App.css';
import SignUp from "./pages/auth/SignUp";

function App() {
	return (
		<div className="min-h-screen min-w-screen p-8 bg-amber-50">
			<p className={"font-satisfy text-8xl pl-16 pt-16 text-slate-700 mb-24"}>
				Welcome to the boutique store
			</p>

			<SignUp />
		</div>
	);
}

export default App;
