import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewSession from "./components/NewSession";
import Session from "./components/Session";
import Stats from "./components/Stats";
import { initData } from "./redux/slicer/sessionSlice";

function App() {
    const { sessions } = useSelector((state) => state.sessions);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [localData, setLocalData] = useState(
        JSON.parse(localStorage.getItem("sessions")) || []
    );

    useEffect(() => {
        // localStorage.removeItem("sessions");
        if (localData !== null || localData.length != 0) {
            dispatch(initData(localData));
            setLoading(false);
        }
    }, [localData]);

    // console.log("App", sessions);

    return (
        <>
            {!loading && <Stats />}
            <NewSession />
            {!loading &&
                sessions.map((session) => (
                    <Session session={session} key={session.id} />
                ))}
        </>
    );
}

export default App;
