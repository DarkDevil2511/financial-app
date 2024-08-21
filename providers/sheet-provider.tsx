"use client"

import { useMountedState } from "react-use"
import { NewAccountsSheet } from "@/features/accounts/components/new-accounts-sheet"
import { EditAccountsSheet } from "@/features/accounts/components/edit-accounts-sheet"
import { NewCategorySheet } from "@/features/categories/components/new-categories-sheet"
import { EditCategoriesSheet } from "@/features/categories/components/edit-categories-sheet"
import { NewTransactionsSheet } from "@/features/transactions/components/new-transaction-sheet"
import { EditTransactionsSheet } from "@/features/transactions/components/edit-transactions-sheet"

export const SheetProvider = () => {
    const isMounted = useMountedState()

    // const [isMounted, setIsMounted] = useState(false)

    // useEffect(() => {
    //     setIsMounted(true)
    // }, [])

    if (!isMounted) return null;

    return (
        <>
            <NewAccountsSheet />
            <EditAccountsSheet />

            <NewCategorySheet />
            <EditCategoriesSheet />

            <NewTransactionsSheet />
            <EditTransactionsSheet />
        </>
    )
}