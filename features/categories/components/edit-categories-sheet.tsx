import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { useConfirm } from '@/hooks/use-confirm'
import { insertCategorySchema } from '@/database/schema'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { CategoryForm } from '@/features/categories/components/categories-form'
import { useOpenCategory } from '@/features/categories/hooks/use-open-categories'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useGetCategory } from '../api/use-get-category'

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditCategoriesSheet = () => {
    const { isOpen, onClose, id } = useOpenCategory()

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category."
    )


    const isPending =
        editMutation.isPending || deleteMutation.isPending

    const isLoading = categoryQuery.isLoading


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

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
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
                            Edit category
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing category.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className='size-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <CategoryForm
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