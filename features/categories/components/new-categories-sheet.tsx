import { z } from 'zod'
import { insertCategorySchema } from '@/database/schema'
import { useCreateCategory } from '@/features/categories/api/use-create-categories'
import { CategoryForm } from '@/features/categories/components/categories-form'
import { useNewCagetory } from '@/features/categories/hooks/use-new-categories'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {
    const {isOpen, onClose} = useNewCagetory()

    const mutation = useCreateCategory()
    

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
                        New Category
                    </SheetTitle>
                    <SheetDescription>
                        Create a new category to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm onSubmit={onSubmit}
                 disable={mutation.isPending}
                 defaultValues={{name: "",}}
                 onDelete={() => {}}
                 /> 
            </SheetContent>
        </Sheet>
    )
}