import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useDispatch, useSelector } from 'react-redux';
import { transferFunds } from '../Redux/userSlice';
import '../Css/DashboardAll.css'

const DashboardLeft = () => {
  const { user, fromAccount, setFromAccount } = useContext(AuthContext);
  const users = useSelector(state => state.users);
  const [recipientInfo, setRecipientInfo] = useState({
    id: 0,
    fullName: "",
    account: ""
  })
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState("");
  const [accountID, setAccountID] = useState("");
  const dispatch =  useDispatch();

  const findUserbyAccountNumber = (accountNumber) => {
    // console.log(accountNumber);
  const foundUser = users.find(user =>
    user.accounts.some(
    account => account.accountNumber === accountNumber
    )
  );

  if (!foundUser) {
    setRecipientInfo({
      id: 0,
      fullName: "",
      account: ""
    });
    return;
  }

  const accountInfo = foundUser.accounts.find(
    account => account.accountNumber === accountNumber
  );

  setRecipientInfo({
    id: foundUser.id,
    fullName: foundUser.fullName,
    account: accountInfo.name
  });
}

  const handleSendFunds = (e) => {
    e.preventDefault();
    dispatch(transferFunds({
      userID: user.id,
      senderAccountID: fromAccount?.id,
      recipientAccountNumber: recipientAccountNumber,
      recipientID: recipientInfo.id,
      amount: Number(amount),
      memo: memo,
    }));
  }

    const getAccountInfo = () => {
    const account = user?.accounts?.find(account => account.id == accountID);
    console.log("dashboard left",account);
    setFromAccount(account);
  }

  useEffect(() =>{
    getAccountInfo();
  }, [accountID, user])

    useEffect(() => {
    console.log(recipientAccountNumber.length);
    if(recipientAccountNumber.length === 10) {
      findUserbyAccountNumber(recipientAccountNumber);
    }else if(recipientAccountNumber.length < 10) {
      setRecipientInfo({
        id: 0,
        fullName: "",
        account: ""
      });
    }
  }, [recipientAccountNumber]);

  
  return (
    <div className='Bank_Form_Wrapper_Left'>
        <header>
        <h4>Send Funds</h4>
      </header>
      <form onSubmit={handleSendFunds}>
       
      <div className={"SelectOption_ClassName_Container"}>
      <label>From Account</label>
      <select onChange={(e) => setAccountID(e.target.value)}>
        <option value="">Select Account</option>
        {user?.accounts?.map((item, index) => (
          <option value={item.id} key={index}>
            {item.name}
          </option>
        ))}
      </select>
     </div>

         
        <div className={"Inputs_className_Container"}>
      <label>Recipient Account Number</label>
      <input
        type={"text"}
        placeholder={"Enter Account Number"}
        value={recipientAccountNumber}
        onChange={(e) => setRecipientAccountNumber(e.target.value)}
      />
      </div>
        <div className="Inputs_className_Container">
      <label>Full Name</label>
      <input
        type={"text"}
        placeholder={"Full Name"}
        value={recipientInfo?.fullName}
      />
    </div>

    <div className="Inputs_className_Container">
      <label>Bank Name</label>
      <input
        type={"text"}
        placeholder={"Bank Name"}
        value={recipientInfo?.account}
      />
      </div>
       
      <div className="Inputs_className_Container">
      <label>Amount</label>
      <input
        type={"text"}
        placeholder={"Amount"}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      </div>
      <div className="TextArea_ClassName_Container">
      <label>Memo</label>
      <textarea
        placeholder={"Rent, dinner, etc."}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      </div>

        <button type="submit" className="Btn Form_Btn">Send Fund</button>
      </form>
    </div>
  )
}

export default DashboardLeft
