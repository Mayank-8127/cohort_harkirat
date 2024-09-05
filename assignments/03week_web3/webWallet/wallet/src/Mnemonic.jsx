import Mnemonic from "./createMnemonic";
import React, {useState} from 'react';

const mnemonic = Mnemonic();
function GetMnemonic(){
    let mnem = mnemonic;
    const [ele, setEle] = useState();
    const func = () => {
        setEle(
        <>
            <p>Mnemonic: {mnem}</p>
            <script>
                {document.getElementById("button").setAttribute("style", "display: none")}
                {document.getElementById("solbutton").setAttribute("style", "display: block")}
                {document.getElementById("ethbutton").setAttribute("style", "display: block")}
            </script>
        </>);
    }
    return(
        <div>
            <button onClick={func} id="button">Generate Mnemonic</button>
            {ele}
            <br></br>
        </div>
    )
}

export default GetMnemonic