import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { useConfirm } from '@/hooks/use-confirm'
import { insertAccountsSchema } from '@/database/schema'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import { AccountForm } from '@/features/accounts/components/accounts-form'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'
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

export const EditAccountsSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount()

    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction."
    )


    const isPending =
        editMutation.isPending || deleteMutation.isPending

    const isLoading = accountQuery.isLoading


    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : {
        name: ""
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>
                            Edit Account
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing account.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className='size-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            disable={isPending}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />
                    )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}