import React,{useRef} from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useBudget } from '@/context/GlobalContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const [value, setValue] = useState<number>(1000)
  const [title, setTitle] = useState<string>("")
  const totalList = useBudget()
  const budgetList = totalList.budgetList
  const transactionList = totalList.transactionList
  const nameRef = useRef<HTMLInputElement>(document.createElement("input"))
  const amountRef = useRef<HTMLInputElement>(document.createElement("input"))
  const navigate = useNavigate()
  
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    totalList.addBudget(nameRef.current.value, parseInt(amountRef.current.value))
  }

  const handleDeletion = (id: string, budgetId:string, amount:number) => {
    navigate('/transactions');
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
        totalList.deleteTransaction(id, budgetId, amount)
      }
    })
  }

  const handleBudgetDeletion = (id: string, spentAmount:number) => {
    if(id == 'income' || id == 'misc') return Swal.fire({
      title: 'Cannot Delete',
      text: "It is a default budget and cannot be deleted.",
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })

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
        totalList.deleteBudget(id, spentAmount)
      }
    })
  }

  return (
    <div className="flex flex-col w-[1000px]">
      <div className="flex pl-[250px] pr-[80px] justify-between">
        <div className="flex flex-col py-2">
          <h1 className="w-full text-3xl text-center font-bold p-5 pb-2 text-blue-2">Budget List</h1>
          <span className="border-b-[4px] border-blue-2 mr-[60px] w-20 self-center"></span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className="w-[200px] h-[50px] text-xl text-sans bg-orange-500 text-white border-[1.5px] border-dark-2 self-center mt-5">
              Add Budget
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[400px] bg-bg-left">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-emerald-400 text-center">Add Your Budget Details</AlertDialogTitle>
            </AlertDialogHeader>
            <form onSubmit={handleSubmission}>
              <AlertDialogDescription>
                <div className="flex flex-col gap-5">
                  <label className="text-lg font-semibold">Title</label>
                  <Input ref={nameRef} value={title} placeholder="Add a Budget Title" className="bg-bg-left border-[2px] border-light-1 p-2 rounded-md text-light-1" onChange={(e) => setTitle(e.target.value)} />
                  <label className="text-lg font-semibold" htmlFor="budget">Budget</label>
                  <Input type="number" ref={amountRef} step="100" value={value} className="bg-bg-left border-[2px] border-light-1 p-2 rounded-md text-light-1" onChange={(e) => setValue(parseInt(e.target.value))} />
                </div>
              </AlertDialogDescription>
              <AlertDialogFooter className='mt-5 mx-2'>
                <AlertDialogAction className="w-[80px] h-[40px] text-md font-bold border-[1px] border-light-1 text-sans bg-green-500 text-dark-6">
                  <button type="submit">ADD</button>
                </AlertDialogAction>
                <AlertDialogCancel className="w-[80px] h-[40px] text-md font-bold border-[1px] border-light-1 text-sans bg-red text-dark-6">
                  CANCEL
                </AlertDialogCancel>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ScrollArea className="flex justify-center px-20 pt-5 w-full">
      <div className="flex flex-col gap-10">
        {
          budgetList[0] === undefined &&
          <div className="flex justify-center items-center w-full h-[500px]">
            <h1 className="text-4xl font-bold text-gray-400">No Budgets Added Yet</h1>
          </div>
        }
      </div>
        <div className="flex flex-col gap-10">
          {
            budgetList.map(budget => (
              <Card key={budget.id} className={
                budget.spentAmount >= budget.budgetAmount ? "bg-light-1 text-dark-6 border-l-8 border-b-[1.5px]  border-gray-400 rounded-xl" :
                "bg-light-1 text-dark-6 border-l-8 border-b-[1.5px]  border-blue-3 rounded-xl"
                }>
                <CardHeader>
                  <div className="flex justify-between px-3">
                    <CardTitle className="text-2xl font-bold font-sans">{budget.title}</CardTitle>
                    <CardDescription className="flex items-center text-xl font-sans">
                      <div className={
                        budget.spentAmount > budget.budgetAmount && budget.id !== 'income' ? "font-bold text-red" : "font-bold"
                      }>Rs. {budget.spentAmount}&nbsp;</div>
                      {budget.id !== 'income' && budget.id !== 'misc' &&
                      <div className="text-sm text-gray-600"> / Rs. {budget.budgetAmount}</div>}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={
                    budget.spentAmount > budget.budgetAmount ? 100 : (budget.spentAmount / budget.budgetAmount) * 100
                  } />
                </CardContent>
                <CardFooter className="flex justify-between">
                  {budget.id !== 'income' && budget.id !== 'misc' &&
                  <div className="flex">
                    <CardDescription className="text-md font-bold font-sans">Remaining -&nbsp;</CardDescription>
                    <CardDescription className={
                      budget.budgetAmount - budget.spentAmount > 0 ? "text-dark-6" : "text-red font-bold"
                    }>
                      {budget.budgetAmount - budget.spentAmount >= 0 ? `Rs. ${budget.budgetAmount - budget.spentAmount}` : "Over Budget"}
                    </CardDescription>
                  </div>}
                  <div className="flex gap-2 w-[200px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button id="edit" className="text-dark-6 hover:bg-blue-3 hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                          </svg>
                        </Button>
                      </DialogTrigger>
                        <DialogContent className='flex flex-col w-[600px]'>
                          <DialogHeader>
                            <DialogTitle className='text-center py-4'>Expenses for <b>{budget.title}</b></DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="flex flex-col gap-2 w-full h-72">
                            {
                              transactionList.map(expense => (
                                expense.budgetId === budget.id &&
                                <Card key={expense.id} className={"bg-light-1 text-dark-6 border-l-8 border-y-[1.5px] border-gray-7 my-4 rounded-xl"}>
                                  <CardHeader>
                                    <div className="flex justify-between px-3">
                                      <CardTitle className="text-2xl font-bold font-sans">{expense.title}</CardTitle>
                                      <CardDescription className="font-bold">{budgetList.find((budget) => budget.id === expense.budgetId)?.title}</CardDescription>
                                      <Button className="bg-light-1 text-red hover:bg-red hover:text-white" onClick={() => handleDeletion(expense.id, expense.budgetId, expense.amount)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                      </Button>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="flex justify-between px-10">
                                    <p className='text-xs'>On {expense.dateTime}</p>
                                    <p className={
                                      expense.type === 'expense' ? 'text-red' : 'text-green-500'
                                    }>
                                      <b>
                                        {expense.type === 'expense' ? '- Rs. ' : '+ Rs. '}
                                        {expense.amount}
                                      </b>
                                    </p>
                                  </CardContent>
                                </Card>
                              ))
                            }
                          </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button className='text-dark-6 hover:bg-secondary-500 hover:text-white'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="bg-dark-6">
                        <div className="mx-auto w-full max-w-sm ">
                          <DrawerHeader>
                            <div className="flex flex-col justify-center items-center gap-2">
                              <div className="w-24 text-center h-[8px] bg-gray-4 border-2 rounded-xl border-gray-4"></div>
                              <DrawerTitle className="pt-8">Edit Budget Emount</DrawerTitle>
                              <DrawerDescription>Set your new Budget</DrawerDescription>
                            </div>
                          </DrawerHeader>
                          <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full border-2 border-light-1"
                                disabled={budget.budgetAmount <= 0}
                                onClick={() => totalList.editBudget(budget.id, 'decrease')}
                              >
                                <MinusIcon className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                              </Button>
                              <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                  {budget.budgetAmount}
                                </div>
                              </div>
                              <Button
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full border-2 border-light-1"
                                onClick={() => totalList.editBudget(budget.id, 'increase')}
                              >
                                <PlusIcon className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                              </Button>
                            </div>
                          </div>
                          <DrawerFooter>
                          <DrawerClose asChild>
                              <Button className="bg-white text-black" onClick={() => totalList.editBudget(budget.id, 'submit')}>Submit</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    <Button className="bg-light-1 text-red hover:bg-red hover:text-white" onClick={() => handleBudgetDeletion(budget.id, budget.spentAmount)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}

export default Dashboard
