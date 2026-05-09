import React from 'react'
import Header from '../../../Components/HEader'
import DashboardLeft from '../../../Components/DashboardLeft'
import DashboardRight from '../../../Components/DashboardRight'
import '../../../Css/DashboardAll.css'

const Dashboard = () => {
  return (
    <div className='Container'>
      <Header/>
      <section className='Bank_Form_Container'>
        <article className='Bank_Form_Wrapper'>
            <DashboardLeft/>
            <DashboardRight/>
        </article>
      </section>
    </div>
  )
}

export default Dashboard
