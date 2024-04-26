import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBudget } from '@/context/GlobalContext'
import { Button } from '@/components/ui/button'
import Swal from 'sweetalert2'

type Transactions = {
  id: number,
  date: string,
  type: string,
  recipent: string,
  amount: number,
  tag: string
}

const Transactions = () => {
  const budgetContext = useBudget()
  const transactions = budgetContext.transactionList
  const budgetList = budgetContext.budgetList

  const handleDeletion = (id: string, budgetId:string, amount:number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        budgetContext.deleteTransaction(id, budgetId, amount)
      }
    })
  }
  return (
    <div className="flex flex-col w-[1000px]">
      <h1 className="w-full text-3xl text-center font-bold pt-10 pb-2 text-blue-2">Transaction History</h1>
      <span className="border-b-[4px] border-blue-2 w-32 mr-[150px] self-center"></span>
      <div className="flex justify-around pt-10">
        <div className="flex flex-col justify-center align-center items-end">
          <div className="text-md">BALANCE</div>
          <span className={budgetContext.totalIncome-budgetContext.totalExpense > 0 ? "text-xl font-bold text-green-500" : "text-xl font-bold text-red"}>
            {budgetContext.totalIncome-budgetContext.totalExpense > 0 ? "+ Rs. " : "- Rs. "}
            {budgetContext.totalIncome-budgetContext.totalExpense > 0 ? budgetContext.totalIncome-budgetContext.totalExpense : budgetContext.totalExpense-budgetContext.totalIncome} 
          </span>
        </div>
        <div className="flex flex-col justify-center align-center items-end">
          <div className="text-md">INCOME</div>
          <span className="text-xl font-bold text-green-500">+ Rs. {budgetContext.totalIncome}</span>
        </div>
        <div className="flex flex-col justify-center items-end">
          <div className="text-md">EXPENSE</div>
          <span className="text-xl font-bold text-red">- Rs. {budgetContext.totalExpense}</span>
        </div>
      </div>
      <ScrollArea className="flex justify-center px-20 pt-5 w-full">
        <div className="flex flex-col gap-10">
          {
            transactions.map((transaction) => (
                <Card key={transaction.id}
                  className={transaction.type === 'expense' ? "w-full bg-light-1 text-dark-6 border-l-8 border-y-[1.5px] border-gray-7 rounded-xl" : "w-full bg-light-1 text-dark-6 border-l-8 border-y-[1.5px]  border-blue-3 rounded-xl"}
                >
                  <CardHeader>
                    <div className="flex justify-between items-top pl-3">
                      <CardTitle className="text-2xl font-bold font-sans">{transaction.title}</CardTitle>
                      <CardDescription className="text-md font-bold pr-5">{budgetList.find((budget) => budget.id === transaction.budgetId)?.title}</CardDescription>
                      <Button className="flex-2 bg-light-1 text-red hover:bg-red hover:text-white" onClick={() => handleDeletion(transaction.id, transaction.budgetId, transaction.amount)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex justify-between px-10">
                      <p>Date :- {transaction.dateTime}</p>
                    <p className={
                      transaction.type === 'expense' ? 'text-red' : 'text-green-500'
                    }>
                      <b>
                        {transaction.type === 'expense' ? '- Rs. ' : '+ Rs. '}
                        {transaction.amount}
                      </b>
                    </p>
                  </CardContent>
                </Card>
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}

export default Transactions