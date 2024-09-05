import { Mnemonic, NewMnemonic } from './createMnemonic';
import React, {useState} from 'react';

function GetMnemonic(){
    const [ele, setEle] = useState();
    const func2 = () => {
        let mnemonic = NewMnemonic();
        let mnem = mnemonic;
        setEle(
        <>
            {/* <button onClick={func2} id="buttonnew">Generate New Mnemonic</button> */}
            <h3>Mnemonic: {mnem}</h3>
        </>);
    }
    const func = () => {
        let mnemonic = Mnemonic();
        let mnem = mnemonic;
        setEle(
        <>
            {/* <button onClick={func2} id="buttonnew">Generate New Mnemonic</button> */}
            <h3>Mnemonic: {mnem}</h3>
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