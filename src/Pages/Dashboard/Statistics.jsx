import useAdmin from "../../hooks/useAdmin";
import useUser from "../../hooks/useUser";

const Statistics = () => {
    const [isBlock] = useUser()
    const [isAdmin] = useAdmin()

    return (
        <div>
            {isAdmin? (<><h1>hello1</h1></>): (<>{isBlock?(<><h1>youre blocked</h1></>):(<><><h1>hello2</h1></></>)} </>)}
        </div>
        
    );
};

export default Statistics;