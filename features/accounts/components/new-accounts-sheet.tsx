import { z } from 'zod'
import { insertAccountsSchema } from '@/database/schema'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { AccountForm } from '@/features/accounts/components/accounts-form'
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

const formSchema = insertAccountsSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewAccountsSheet = () => {
    const {isOpen, onClose} = useNewAccount()

    const mutation = useCreateAccount()
    

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit}
                 disable={mutation.isPending}
                 defaultValues={{name: "",}}
                 onDelete={() => {}}
                 /> 
            </SheetContent>
        </Sheet>
    )
}