import { useContext, createContext, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

export interface Budget {
  id: string;
  title: string;
  budgetAmount: number;
  spentAmount: number;
}


interface Transaction {
  id: string;
  title: string;
  amount: number;
  dateTime: string;
  type: 'expense' | 'income';
  budgetId: string;
  note?: string;
}

interface GlobalContextType {
  budgetList: Budget[];
  transactionList: Transaction[],
  totalExpense: number;
  totalIncome: number;
  addBudget: (title: string, budgetAmount: number) => void; // done
  editBudget: (id: string, type: string) => void; // done
  deleteBudget: (id: string, spentAmount:number) => void;
  addTransaction: (title: string, amount: number, type: 'expense' | 'income', budgetId: string, note?: string) => void; // done
  deleteTransaction: (id: string, budgetId:string, amount: number) => void;
}

const initialValue: GlobalContextType = {
  budgetList: [],
  transactionList: [],
  totalExpense: 0,
  totalIncome: 0,
  addBudget: () => {},
  editBudget: () => {},
  deleteBudget: () => {},
  addTransaction: () => {},
  deleteTransaction: () => {},
}

const initialIncomeList: Budget = {
  id: "income",
  title: "Income",
  budgetAmount: 0,
  spentAmount: 0,
}

const miscallenousBudget: Budget = {
  id: "misc",
  title: "Miscellaneous",
  budgetAmount: 0,
  spentAmount: 0,
}

const GlobalContext = createContext<GlobalContextType>(initialValue);

export const useBudget = (): GlobalContextType => {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children } : {children: ReactNode}) => {
  const [budgetList, setBudgetList]=useLocalStorage<Budget[]>("budgets", [initialIncomeList, miscallenousBudget])
  const [transactionList, setTransactionList]=useLocalStorage<Transaction[]>("expenses", [])
  const [totalExpense, setTotalExpense] = useLocalStorage<number>("totalExpense", 0)
  const [totalIncome, setTotalIncome] = useLocalStorage<number>("totalIncome", 0)
  
  const addBudget = (title: string, budgetAmount: number) => {
    if(!title) return (
      toast.error((t) => (
        <div>
          <p><b>Invalid Input Field</b></p>
          <p className="text-xs">Title of the budget cannot be empty.</p>
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
    )
    if(budgetAmount < 0) return (
      toast.error((t) => (
        <div>
          <p><b>Invalid Input Field</b></p>
          <p className="text-xs">Budget amount cannot be negative.</p>
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
    )
    if(budgetList.find((budget) => budget.title === title)) return (
      toast.error((t) => (
        <div>
          <p><b>Budget with the same title already exists.</b></p>
          <p className="text-xs">Please choose a different title.</p>
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
    )
    const newBudget: Budget = {
      id: uuidv4(),
      title,
      budgetAmount,
      spentAmount: 0
    }
    setBudgetList([...budgetList, newBudget])
  }

  const editBudget = (id: string, type: string) => {
    const updatedBudget = budgetList.map((budget) => {
      if(budget.id === id) {
        if(type === "increase") {
          return {
            ...budget,
            budgetAmount: budget.budgetAmount + 100
          }
        } else if (type === "decrease") {
          return {
            ...budget,
            budgetAmount: budget.budgetAmount - 100
          }
        } else {
          return budget;
        }
      }
      return budget;
    })
    setBudgetList(updatedBudget)
  }

  const deleteBudget = (id: string, spentAmount:number) => {
    budgetList.map((budget) => {
      if(budget.id === 'misc') {
        budget.spentAmount = budget.spentAmount + spentAmount
        budget.budgetAmount = budget.budgetAmount + spentAmount
      }
    })
    transactionList.map((transaction) => {
      if(transaction.budgetId === id) {
        transaction.budgetId = "misc"
      }
    })
    setBudgetList(budgetList.filter((budget) => budget.id !== id))
  }

  const addTransaction = (title:string, amount:number, type: 'expense' | 'income', budgetId: string, note?: string) => {
    if(!note) note = "";
    if(amount < 0) return (
      toast.error((t) => (
        <div>
          <p><b>Invalid Input Field</b></p>
          <p className="text-xs">Amount cannot be negative.</p>
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
    )
    if(type === "expense") {
      setTotalExpense(totalExpense + amount)
    }
    if(type === "income") {
      setTotalIncome(totalIncome + amount)
    }
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
      dateTime: new Date().toLocaleString(),
      budgetId,
      note
    }
    setTransactionList([...transactionList, newTransaction])
    handleBudgetAmount(budgetId, amount)
  }

  const handleBudgetAmount = (budgetId: string, amount: number) => {
    const updatedBudget = budgetList.map((budget) => {
      if(budget.id === budgetId) {
        if(amount > 0) {
          return {
            ...budget,
            spentAmount: budget.spentAmount + amount
          }
        } else {
          return {
            ...budget,
            spentAmount: budget.spentAmount - amount
          }
        }
      }
      return budget;
    })
    setBudgetList(updatedBudget)
  }

  const deleteTransaction = (id: string, budgetId: string, amount:number) => {
    setTransactionList(transactionList.filter((transaction) => transaction.id !== id))
    if(transactionList.find((transaction) => transaction.id === id)?.type === "expense") {
      setTotalExpense(totalExpense - amount)
    }
    if(transactionList.find((transaction) => transaction.id === id)?.type === "income") {
      setTotalIncome(totalIncome - amount)
    }
    handleBudgetDelete(budgetId,amount)
  }

  const handleBudgetDelete = (id: string, amount: number) => {
    const updatedBudget = budgetList.map((budget) => {
      if(budget.id === id) {
        return {
          ...budget,
          spentAmount: budget.spentAmount - amount
        }
      }
      return budget;
    })
    setBudgetList(updatedBudget)
  }
  
  return (
    <GlobalContext.Provider
        value={{
          budgetList,
          transactionList,
          totalExpense,
          totalIncome,
          addBudget,
          editBudget,
          deleteBudget,
          addTransaction,
          deleteTransaction,
        }}
      >{children}
    </GlobalContext.Provider>
  );
}