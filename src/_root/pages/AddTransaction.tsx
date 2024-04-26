import {useRef} from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useBudget } from "@/context/GlobalContext"
import toast from "react-hot-toast"

const AddTransaction = () => {
  const totalList = useBudget()
  const ExpenseRecipentRef = useRef<HTMLInputElement>(document.createElement('input'))
  const ExpenseAmountRef = useRef<HTMLInputElement>(document.createElement('input'))
  const ExpenseBudgetClassRef = useRef<HTMLSelectElement>(document.createElement('select'))
  const ExpenseNoteRef = useRef<HTMLTextAreaElement | null>(null)

  const IncomeRecipentRef = useRef<HTMLInputElement>(document.createElement('input'))
  const IncomeAmountRef = useRef<HTMLInputElement>(document.createElement('input'))
  const IncomeNoteRef = useRef<HTMLTextAreaElement | null>(null)
  
  const budgetList = totalList.budgetList

  const handleTransactionSubmission = () => {
    if (ExpenseRecipentRef.current.value === '' || ExpenseAmountRef.current.value === '' || ExpenseBudgetClassRef.current.value === '') {
      toast.error(() => (
        <div>
          <p><b>Transaction Failed</b></p>
          <p className="text-xs">Please fill out the fields and try again.</p>
        </div>
      ), {
        style: {
          borderRadius: '10px',
          fontWeight: 600,
          background: '#7F1D1D',
          border: '1px solid #fff',
          color: '#fff',
        },
      })
      return
    }
    totalList.addTransaction(ExpenseRecipentRef.current.value, parseInt(ExpenseAmountRef.current.value), 'expense', ExpenseBudgetClassRef.current.value, ExpenseNoteRef.current?.value)
    ExpenseAmountRef.current.value = ''
    ExpenseRecipentRef.current.value = ''
    ExpenseNoteRef.current!.value = ''
    toast.success(() => (
      <div>
        <p><b>Transaction Successful</b></p>
        <p className="text-xs">Your transaction has been recorded.</p>
      </div>
    ),{
      style: {
        borderRadius: '10px',
        background: 'green',
        border: '1px solid #fff',
        color: '#fff',
      },
    })
  }

  const handleIncomeSubmission = () => {
    if (IncomeRecipentRef.current.value === '' || IncomeAmountRef.current.value === '') {
      toast.error(() => (
        <div>
          <p><b>Transaction Failed</b></p>
          <p className="text-xs">Please fill out the fields and try again.</p>
        </div>
      ), {
        style: {
          borderRadius: '10px',
          fontWeight: 600,
          background: '#7F1D1D',
          border: '1px solid #fff',
          color: '#fff',
        },
      })
      return
    }
    totalList.addTransaction(IncomeRecipentRef.current.value, parseInt(IncomeAmountRef.current.value), 'income', 'income', IncomeNoteRef.current?.value)
    IncomeAmountRef.current.value = ''
    IncomeRecipentRef.current.value = ''
    IncomeNoteRef.current!.value = ''
    toast.success(() => (
      <div>
        <p><b>Transaction Successful</b></p>
        <p className="text-xs">Your transaction has been recorded.</p>
      </div>
    ),{
      style: {
        borderRadius: '10px',
        background: 'green',
        border: '1px solid #fff',
        color: '#fff',
      },
    })
  }
  
  return (
    <div className="flex-1 flex justify-center items-center min-h-350">
      <Tabs defaultValue="expenses" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2 bg-dark-6 rounded-2xl">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Incomes</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <Card className="bg-dark-6">
            <CardHeader>
              <CardTitle className="pb-2">Enter Expenditure Details</CardTitle>
              <CardDescription className="text-xs">
                How much did you spent this time?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-around gap-3 px-5">
              <Label htmlFor="recipent" className="py-2">Recipent</Label>
              <Input id="recipent" ref={ExpenseRecipentRef} placeholder="Enter Recipent Name" />
              <div className="flex justify-around space-y-2 gap-3">
                <div className="space-y-1 w-full flex flex-col justify-around">
                  <Label htmlFor="amount" className="py-2">Enter Amount</Label>
                  <Input id="amount" ref={ExpenseAmountRef} placeholder='0' />
                </div>
                <div className="space-y-1 w-full flex flex-col justify-around gap-2">
                  <Label htmlFor="tag">Add Tag</Label>
                  <select id="tag" ref={ExpenseBudgetClassRef} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-dark-6">
                    {
                      budgetList.map((budget) => (
                      budget.id!=='income' &&
                        <option key={budget.id} value={budget.id}>{budget.title}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </CardContent>
            <div className="space-y-1 w-full flex flex-col justify-around gap-2 px-5 pb-5">
              <Label htmlFor="description">Add a Note (optional)</Label>
              <Textarea id="description" ref={ExpenseNoteRef} placeholder="Enter your note here." />
            </div>
            <CardFooter className="flex justify-center">
              <Button type="submit" className="bg-light-1 text-dark-6"
                onClick={() => handleTransactionSubmission()}
                >
                Confirm Transaction</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="income">
          <Card className="bg-dark-6">
            <CardHeader>
              <CardTitle className="pb-2">Enter Income Details</CardTitle>
              <CardDescription className="text-xs">
                Don't forget to save your money!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-around gap-3 px-5">
              <Label htmlFor="recipent" className="py-2">Recipent</Label>
              <Input id="recipent" ref={IncomeRecipentRef} placeholder="Enter Recipent Name" />
              <div className="flex justify-around space-y-2 gap-3">
                <div className="space-y-1 w-full flex flex-col justify-around">
                  <Label htmlFor="amount" className="py-2">Enter Amount</Label>
                  <Input id="amount" ref={IncomeAmountRef} placeholder='0' />
                </div>
                <div className="space-y-1 w-full flex flex-col justify-around gap-2">
                  <Label htmlFor="tag">Add Tag</Label>
                  <Input value="Income" disabled />
                </div>
              </div>
            </CardContent>
            <div className="space-y-1 w-full flex flex-col justify-around gap-2 px-5 pb-5">
              <Label htmlFor="description2">Add a Note (optional)</Label>
              <Textarea id="description2" ref={IncomeNoteRef} placeholder="Enter your note here." />
            </div>
            <CardFooter className="flex justify-center">
              <Button type="submit" className="bg-light-1 text-dark-6"
                onClick={() => handleIncomeSubmission()}
                >
                Confirm Transaction</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AddTransaction