

function List(props){
    const itemList = props.list;
    const listItems = itemList.map(
        item => <li key={item.id}>
            <p>Public Key = {item.PublicKey}</p>
            <p>Private Key = {item.PrivateKey}</p>
            <p>Balance = {item.Balance}</p>
            </li>
    )
    return(
        <div>
            <ol>{listItems}</ol>
        </div>
    );
}

export default List;    