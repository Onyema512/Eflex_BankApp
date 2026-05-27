import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useSelector } from 'react-redux';
import { BaseURL } from '../Lib/HighFunction';
import axios from 'axios';

const DashboardRight = () => {
  const {fromAccount, user} = useContext(AuthContext);
  const users = useSelector(state => state.users);
  const [theAccountInfo, setTheAccountInfo] = useState(null);
  const [theTransactions, setTheTransactions] = useState([]);

  useEffect(() =>{
    const accountInfo = users.find(e => e.id === user?.id) || null;
    const transactions = accountInfo?.transactions || [];
    const account = accountInfo?.accounts?.find(account => account.id === fromAccount?.id);
    console.log("dashboard right",user);
    setTheAccountInfo(account);
    setTheTransactions(transactions);
  }, [fromAccount, users, user]);

    const token = localStorage.getItem("Token");
    const [accountBalance, setAccountBalance] = useState({});
  
    const getAvailableBalance = async() => {
      const BalanceRes = await axios.get(`${BaseURL}/totalBalance`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      console.log("BalanceRes", BalanceRes);
      setAccountBalance(BalanceRes?.data);
    }
    useEffect(() => {
      getAvailableBalance();
    }, []);
    // console.log("accountBalance", accountBalance);


  return (
    <div className='Bank_Form_Wrapper_Right'>
            <div className="Bank_Form_Wrapper_Right_Top">
        <article className="Bank_Content_Wrapper_Right_Top">
          <p>Total Available Balance</p>
          <h2 contentEditable="true">&#8358; {accountBalance?.totalFunds}</h2>
          <span>Across 2 Accounts</span>
        </article>
      </div>
      <div className="Bank_Form_Wrapper_Right_Bottom">
        <p>Transactions History</p>
        
        {
         theTransactions?.map((transaction, index) => (
    <div className="Bank_Content_Wrapper_Right_Bottom_Transaction" key={index}>
      <div className="Transaction_Left">
        <h4>
          {transaction.type === "debit"
            ? "Debit Transaction"
            : "Credit Transaction"}
        </h4>

        <p>
          {transaction.type === "debit"
            ? `Sent to ${transaction.name}`
            : `Received from ${transaction.name}`}
        </p>

        <small>{transaction.accountName}</small>
        <small>{transaction.memo}</small>
        <small>{transaction.date}</small>
      </div>
      <div className="Transaction_Right">
        <h3 className={transaction.type === "debit" ? "Debit_Color" : "Credit_Color"}>               
          {transaction.type === "debit" ? "-" : "+"}
          &#8358; {transaction.amount}
        </h3>
      </div>

    </div>
  ))
}
        {/* {
          theTransactions?.map((transaction, index) => (
            <div className="Bank_Content_Wrapper_Right_Bottom_Transaction" key={index}>
              <span>{transaction.type === "debit" ? "Debit:" : "Credit:"}</span>
              <span>{transaction.type === "debit" ? "-" : "+"} &#8358; {transaction.amount}</span>
            </div>
          ))
        } */}
      </div>
    </div>
  )
}

export default DashboardRight
